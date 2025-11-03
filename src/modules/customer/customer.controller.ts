import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AuthGuard } from '@common/index';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @UseGuards(AuthGuard)
  getProfile(@Request() req: any) {
    return {message: 'done' ,success: true ,data:{user:req.user}};
  }


}
