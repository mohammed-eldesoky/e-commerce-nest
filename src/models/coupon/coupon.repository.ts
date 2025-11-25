import { Injectable } from '@nestjs/common';
import { Coupon } from './coupon.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '@models/abstract.repository';

@Injectable()
export class CouponRepository extends AbstractRepository<Coupon> {
  constructor(
    @InjectModel(Coupon.name) private readonly couponModel: Model<Coupon>,
  ) {
    super(couponModel);
  }
}
