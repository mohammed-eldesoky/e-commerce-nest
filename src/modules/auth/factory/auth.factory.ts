import { GENDER_TYPES, generateOtp, USER_AGENT } from '@common/index';
import { RegisterDto } from '../dto/reister.dto';
import { Customer } from '../entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthFactory {
  async createCustomer(registerDto: RegisterDto) {
    const customer = new Customer();

    customer.userName = registerDto.userName;
    customer.email = registerDto.email;
    if (registerDto.userAgent === USER_AGENT.google) {
     
      customer.password = undefined;
    } else {
      if (!registerDto.password) {
        throw new BadRequestException('Password is required for local users');
      }
      customer.password = await bcrypt.hash(registerDto.password, 10);
    }
    customer.otp = generateOtp();
    customer.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    customer.isVerified = false;
    customer.dob = registerDto.dob;
    customer.gender = registerDto.gender || GENDER_TYPES.male;

    return customer;
  }
}
