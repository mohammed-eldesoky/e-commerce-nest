import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/reister.dto';
import { AuthFactory } from './factory/auth.factory';
import { VerifyAccountDto } from './dto/verfiy-account.dto';
import { LoginDto } from './dto/login.dto';
import { sendOTPDto } from './dto/send-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authFactory: AuthFactory,
  ) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const customer = await this.authFactory.createCustomer(registerDto);
    const createdCustomer = await this.authService.register(customer);

    //send response
    return {
      message: 'Customer registered successfully',
      success: true,
       data: createdCustomer,
    };
  }
  //_____________________________________________________________


  @Post('/Verify-account')
  async verifyAccount(@Body() verifyAccountDto: VerifyAccountDto) {
    await this.authService.verifyAccount(verifyAccountDto);

    return {
      message: 'Account verified successfully',
      success: true,
    
    };
}

@Post('/login')
async login(@Body() loginDto: LoginDto) {

const token = await this.authService.login(loginDto);
  return {
    message: 'Login successfully',
    success: true,
    data:{
      token
    }
  };
}

@Post('/send-otp')
async sendOtp(@Body() sendOtpDto: sendOTPDto) {

this.authService.sendOtp(sendOtpDto);
  return {
    message: 'OTP sent successfully',
    success: true,
  };
}

}