import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AuthGuard, Roles } from '@common/index';

@Controller('customer')
@UseGuards(AuthGuard)
@Roles(['Admin'])
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @Roles(['Admin'])
  getProfile(@Request() req: any) {
    return { message: 'done', success: true, data: { user: req.user } };
  }
}
