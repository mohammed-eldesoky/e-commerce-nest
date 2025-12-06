import { ORDER_STATUS, PAYMENT_METHODS } from '@common/enum';

import { Types } from 'mongoose';

export class Address {
  street: string;

  city: string;

  state: string;

  country: string;

  Code: string;

  phoneNumber: string;
}

export class OrderProduct {
  productId: Types.ObjectId;

  name: string;

  quantity: number;

  price: number;

  totalPrice: number;

  discount: number;
}

export class CopounDetails {
  couponId: Types.ObjectId;

  discountAmount: number;
  code: string;
}

export class Order {
  readonly _id: Types.ObjectId;

  userId: Types.ObjectId;

  address: Address;

  products: OrderProduct[];

  paymentMethod: PAYMENT_METHODS;

  status: ORDER_STATUS;

  coupon: CopounDetails;

  totalAmount: number;
}
