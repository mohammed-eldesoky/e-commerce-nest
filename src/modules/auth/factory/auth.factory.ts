import { generateOtp } from '@common/index';
import { RegisterDto } from '../dto/reister.dto';
import { Customer } from '../entities/auth.entity';
import * as bcrypt from 'bcrypt';

export class AuthFactory {
  async createCustomer(registerDto: RegisterDto) {
    const customer = new Customer();

    customer.userName = registerDto.userName;
    customer.email = registerDto.email;
    customer.password = await bcrypt.hash(registerDto.password, 10);
    customer.otp = generateOtp();
    customer.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    customer.isVerified = false;
    customer.dob = registerDto.dob;
    customer.gender = registerDto.gender;

    return customer;
  }
}
