import { IsValidToDate } from '@common/decorators/date.decorator';
import { IsValidDiscount } from '@common/decorators/discount.decorator';
import { discountType } from '@common/enum';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Length,
  MinDate,
} from 'class-validator';
import { Types } from 'mongoose';
import { Transform } from 'class-transformer';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 5)
  code: string;

  @IsValidDiscount()
  discountAmount: number;

  @IsString()
  @IsString()
  @IsEnum(discountType)
  discountType: discountType;

  @Transform(({ value }) => {
    return new Date(value);
  })
  @IsDate()
  @MinDate(new Date(Date.now() - 24 * 60 * 60 * 1000)) // current date - 1 day
  fromtDate: Date;

  @Transform(({ value }) => {
    return new Date(value);
  })
  @IsDate()
  @IsValidToDate()
  toDate: Date;

  @IsBoolean()
  active: boolean;

  @IsArray()
  @IsMongoId({ each: true })
  assignedTo: Types.ObjectId[];
}
