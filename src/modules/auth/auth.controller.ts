import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/reister.dto';
import { AuthFactory } from './factory/auth.factory';

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
}
