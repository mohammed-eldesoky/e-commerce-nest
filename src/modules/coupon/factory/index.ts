import { CreateCouponDto } from '../dto/create-coupon.dto';
import { Coupon } from '../entities/coupon.entity';

export class CouponFactory {
  createCoupon(createCouponDto: CreateCouponDto, user: any) {
    const coupon = new Coupon();
    coupon.code = createCouponDto.code;
    coupon.discountAmount = createCouponDto.discountAmount;
    coupon.discountType = createCouponDto.discountType;
    coupon.fromtDate = createCouponDto.fromtDate;
    coupon.toDate = createCouponDto.toDate;
    coupon.assignedTo = createCouponDto.assignedTo.map((id) => ({
      customerId: id,
      count: 0,
    }));
    coupon.usedBy = [];
    coupon.createdBy = user._id;
    coupon.updatedBy = user._id;
    coupon.active = createCouponDto.active;
    return coupon;
  }
}
