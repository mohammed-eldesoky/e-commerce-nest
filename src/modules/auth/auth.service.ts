import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/reister.dto';
import { Customer } from './entities/auth.entity';
import { ConfigService } from '@nestjs/config';
import { CustomerRepository } from '@models/index';
import { sendMail } from '@common/index';

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
    await sendMail({
      from:'E-Commerce App' ,
      to: customer.email,
      subject: 'Confirm Email',
      html: `<h1>Hello ${customer.userName}, Thank you for registering at our e-commerce</h1>`,
    });
    const { password, otp, otpExpiry, ...customerObject } = JSON.parse(
      JSON.stringify(createdUser),
    );

    return customerObject;
  }
}
