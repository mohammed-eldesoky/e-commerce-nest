import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CouponFactory } from './factory';
import { User } from '@common/decorators/user.decorator';
import { Auth } from '@common/decorators/auth.decorator';
import { message } from '@common/index';

@Controller('coupon')
@Auth(['Admin', 'Seller'])
export class CouponController {
  constructor(
    private readonly couponService: CouponService,
    private readonly couponFactory: CouponFactory,
  ) {}

  @Post()
  async create(@Body() createCouponDto: CreateCouponDto, @User() user: any) {
    const couponData = this.couponFactory.createCoupon(createCouponDto, user);
    const createdCoupon = await this.couponService.create(couponData);
    return {
      message: message.copon.created,
      success: true,
      data: createdCoupon,
    };
  }

  @Get()
  findAll() {
    return this.couponService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update(+id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponService.remove(+id);
  }
}
