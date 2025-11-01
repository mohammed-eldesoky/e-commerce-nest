import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Customer } from './entities/auth.entity';
import { ConfigService } from '@nestjs/config';
import { CustomerRepository } from '@models/index';
import {
  generateOtp,
  generateOtpExpiryTime,
  sendMail,
  TOKEN_TYPES,
  USER_AGENT,
} from '@common/index';
import { VerifyAccountDto } from './dto/verfiy-account.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenRepository } from '@models/token/token.repository';
import { sendOTPDto } from './dto/send-otp.dto';
import { ForgetPassDto } from './dto/forgetpass.dto';
import { Token } from '@models/token/token.schema';
import { LoginGoogleDto } from './dto/login-google.dto';
import { GoogleAuth, OAuth2Client } from 'google-auth-library';
@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly customerRepository: CustomerRepository,
    private readonly jwtService: JwtService,
    private readonly tokenRepo: TokenRepository,
  ) {}
  async register(customer: Customer) {
    //check if customer with email already exists
    const customerExist = await this.customerRepository.exist({
      email: customer.email,
    });
    //fail case customer exists
    if (customerExist) {
      throw new NotFoundException('Customer already exists');
    }
    //create customer
    const createdUser = await this.customerRepository.create(customer);
    // send email
    await sendMail({
      from: 'E-Commerce App',
      to: customer.email,
      subject: 'Confirm Email',
      html: `<h1>Hello ${customer.userName}, Thank you for registering at our e-commerce</h1>`,
    });
    const { password, otp, otpExpiry, ...customerObject } = JSON.parse(
      JSON.stringify(createdUser),
    );

    return customerObject;
  }

  //__________________________verifyAccount___________________________________
  async verifyAccount(verifyAccountDto: VerifyAccountDto) {
    const { email, otp } = verifyAccountDto;
    //check if customer with email exists
    const customerExist = await this.customerRepository.exist({
      email: email,
    });
    //fail case customer does not exist
    if (!customerExist) {
      throw new NotFoundException('Customer does not exist');
    }
    // check if already verified
    if (customerExist.isVerified) {
      throw new BadRequestException('Customer is already verified');
    }
    //check if otp matches
    if (customerExist.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }
    // check if otp has expired
    if (
      !customerExist.otpExpiry ||
      customerExist.otpExpiry.getTime() < Date.now()
    ) {
      throw new BadRequestException('OTP has expired');
    }
    //update customer to verified
    await this.customerRepository.update(
      { email: email },
      { isVerified: true, $unset: { otp: '', otpExpiry: '' } },
    );
  }

  //__________________________login___________________________________
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    //check if customer with email exists
    const customer = await this.customerRepository.getOne({ email: email });
    //fail case customer does not exist
    if (!customer) {
      throw new UnauthorizedException('invalid credentials');
    }
    //check if password matches
    const match = await bcrypt.compare(password, customer.password);
    if (!match) {
      throw new UnauthorizedException('invalid credentials');
    }

    // generate access & refresh tokens
    const payload = {
      id: customer._id,
      email: customer.email,
      role: 'customer',
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('token').jwt_secret,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('token').jwt_secret,
      expiresIn: '7d',
    });

    // save tokens to database
    (await this.tokenRepo.create({
      token: accessToken,
      user: customer._id,
      type: TOKEN_TYPES.access,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    }),
      await this.tokenRepo.create({
        token: refreshToken,
        user: customer._id,
        type: TOKEN_TYPES.refresh,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      }));

    return {
      accessToken,
      refreshToken,
    };
  }

  //___________________________sendOtp__________________________________
  async sendOtp(sendOtpDto: sendOTPDto) {
    const { email } = sendOtpDto;
    //check if customer with email exists
    const customer = await this.customerRepository.getOne({ email: email });
    //fail case customer does not exist
    if (!customer) {
      throw new NotFoundException('Customer does not exist');
    }
    // prevent resend if user is banned
    if (customer.banUntil && customer.banUntil > new Date()) {
      const remaining = Math.ceil(
        (customer.banUntil.getTime() - Date.now()) / 1000,
      );
      throw new BadRequestException(
        `You are temporarily banned. Try again after ${remaining} seconds.`,
      );
    }

    //generate otp
    const otp = generateOtp();
    const otpExpiryAt = generateOtpExpiryTime(10); // 10 minutes from now
    //update user
    await this.customerRepository.update(
      { email: email },
      { otp: otp, otpExpiryAt: otpExpiryAt },
    );

    //send email
    await sendMail({
      from: `"E-commerce" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: ' Confirm Your Account',
      html: `<h1>Your OTP :${otp} </h1>
      <p>OTP is valid for 10 minutes</p>
      `,
    });
  }

  //_________________________forgetPassword____________________________________
  async forgetPassword(forgetPassDto: ForgetPassDto) {
    const { email, otp, newPassword } = forgetPassDto;
    //check if customer with email exists

    const customer = await this.customerRepository.getOne({ email: email });
    //fail case customer does not exist
    if (!customer) {
      throw new NotFoundException('Customer does not exist');
    }

    // check if otp matches
    if (customer.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    // check if otp has expired

    if (!customer.otpExpiry || customer.otpExpiry.getTime() < Date.now()) {
      throw new BadRequestException('OTP has expired');
    }
    //update password
    // update password + unset OTP fields
    await this.customerRepository.update(
      { _id: customer._id },
      {
        $set: { password: await bcrypt.hash(newPassword, 10) },
        $unset: { otp: '', otpExpiry: '' },
      },
    );
    // destroy tokens
    await this.tokenRepo.deleteMany({ user: customer._id });
  }

  //________________________Login With google____________________________________

  async LoginWithgoogle(loginGoogleDto: LoginGoogleDto) {
    //get idToken from dto
    const { idToken } = loginGoogleDto;
    // 2- verify the id token and get user info from google
    const client = new OAuth2Client(process.env.TOKEN_GOOGLE);
    const ticket = await client.verifyIdToken({ idToken });
    const payload = ticket.getPayload(); //{email, name, picture}
    if (!payload) {
      throw new UnauthorizedException('Invalid Google token');
    }
    // check if user with email exists in our db
    let customer = await this.customerRepository.getOne({
      email: payload.email,
    });

    //  If user does not exist, create a new user
    if (!customer) {
      // if not, create a new user
      customer = (await this.customerRepository.create({
        email: payload.email,
        userName: payload.name,
        userAgent: USER_AGENT.google,
        isVerified: true, // google verified email
      })) as any;
    }
    // generate access & refresh tokens
    // generate access & refresh tokens
    const payloadToken = {
      id: customer!._id,
      email: customer!.email,
      role: 'customer',
    };

    const accessToken = this.jwtService.sign(payloadToken, {
      secret: this.configService.get('token').jwt_secret,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payloadToken, {
      secret: this.configService.get('token').jwt_secret,
      expiresIn: '7d',
    });
    // save tokens to database
    await this.tokenRepo.create({
      token: accessToken,
      user: customer!._id,
      type: TOKEN_TYPES.access,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });

    await this.tokenRepo.create({
      token: refreshToken,
      user: customer!._id,
      type: TOKEN_TYPES.refresh,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: customer!._id,
        email: customer!.email,
        userName: customer!.userName,
      },
    };
  }
}
