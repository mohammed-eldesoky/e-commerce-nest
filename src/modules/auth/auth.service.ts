import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Customer } from './entities/auth.entity';
import { ConfigService } from '@nestjs/config';
import { CustomerRepository } from '@models/index';
import { sendMail, TOKEN_TYPES } from '@common/index';
import { VerifyAccountDto } from './dto/verfiy-account.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenRepository } from '@models/token/token.repository';
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
}
