import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { CouponFactory } from './factory';
import { UserMongoModule } from '@shared/index';
import { JwtService } from '@nestjs/jwt';
import { Coupon, CouponRepository, couponSchema } from '@models/index';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UserMongoModule,MongooseModule.forFeature([{ name: Coupon.name, schema: couponSchema }])],
  controllers: [CouponController],
  providers: [CouponService, CouponFactory,JwtService,CouponRepository],
})
export class CouponModule {}
