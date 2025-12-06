import { ORDER_STATUS, PAYMENT_METHODS } from '@common/enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class Address {
  @Prop({ type: String, required: true })
  street: string;
  @Prop({ type: String, required: true })
  city: string;
  @Prop({ type: String, required: true })
  state: string;
  @Prop({ type: String, required: true })
  country: string;
  @Prop({ type: String, required: true })
  Code: string;
  @Prop({ type: String, required: true })
  phoneNumber: string;
}

@Schema()
export class OrderProduct {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Number, required: true })
  quantity: number;
  @Prop({ type: Number, required: true })
  price: number;
  @Prop({ type: Number, required: true })
  totalPrice: number;
  @Prop({ type: Number, required: true })
  discount: number;
}

@Schema()
export class CopounDetails {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Coupon', required: true })
  couponId: Types.ObjectId;
  @Prop({ type: Number, required: true })
  discountAmount: number;
}

@Schema({ timestamps: true })
export class Order {
  readonly _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Customer', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Address, required: true })
  address: Address;
  @Prop({ type: [OrderProduct], required: true })
  products: OrderProduct[];
  @Prop({ type: String, enum: PAYMENT_METHODS, default: PAYMENT_METHODS.COD })
  paymentMethod: PAYMENT_METHODS;
  @Prop({
    type: String,
    enum: ORDER_STATUS,
    default: function () {
      if (this.paymentMethod === PAYMENT_METHODS.COD) {
        return ORDER_STATUS.PLACED;
      }
      return ORDER_STATUS.PENDING;
    },
  })
  status: ORDER_STATUS;
  @Prop({ type: CopounDetails })
  coupon: CopounDetails;
  @Prop({ type: Number, required: true })
  totalAmount: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
