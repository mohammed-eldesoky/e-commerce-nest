
import { discountType } from '@common/enum';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @IsMongoId()
  @IsNotEmpty()
  categoryId: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  brandId: Types.ObjectId;

  //______________________number_______________________//
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsOptional()
  discountAmount: number;

  @IsString()
  @IsOptional()
  @IsEnum(discountType)
  disCountType: discountType;

  @IsNumber()
  @IsOptional()
  stock: number;

  //______________________specification_______________________//
  @IsArray()
  @IsString({ each: true }) // check each element is string
  colors: string[];

  @IsArray()
  @IsString({ each: true }) // check each element is string
  sizes: string[];
}
