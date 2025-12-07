import { PAYMENT_METHODS } from '@common/enum';
import {
  IsEmpty,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
class Address {
  @IsString()
  street: string;
  @IsString()
  city: string;
  @IsString()
  state: string;
  @IsString()
  country: string;
  @IsString()
  Code: string;
  @IsString()
  phoneNumber: string;
}

class couponDetail {
  @IsMongoId()
  couponId: Types.ObjectId;
  @IsNumber()
  discountAmount: number;
  @IsString()
  code: string;
}
export class CreateOrderDto {
  @IsObject()
  address: Address;
  @IsString()
  @IsEnum(PAYMENT_METHODS)
  @IsOptional()
  paymentMethod: PAYMENT_METHODS;

  @IsObject()
  @IsOptional()
  couponDetails: couponDetail;
//   products?: {
//     productId: string;
//     quantity: number;
//   }[];
}
