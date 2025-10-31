import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/reister.dto';
import { Customer } from './entities/auth.entity';
import { ConfigService } from '@nestjs/config';
import { CustomerRepository } from '@models/index';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly customerRepository: CustomerRepository,
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

    const { password, otp, otpExpiry, ...customerObject } = JSON.parse(
      JSON.stringify(createdUser),
    );

    return customerObject;
  }
}
