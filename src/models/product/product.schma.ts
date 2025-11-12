import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

export enum discountType {
  fixed_amount = 'fixed_amount',
  percentage = 'percentage',
}

@Schema({
  timestamps: true,
})
export class Product {
  readonly _id: Types.ObjectId;

  //______________________string_______________________//

  @Prop({ type: String, required: true, trim: true })
  name: string;

  @Prop({ type: String, required: true, trim: true })
  description: string;

  @Prop({ type: String, required: true, trim: true })
  slug: string;

  //______________________ids_______________________//
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Category',
    required: true,
    trim: true,
  })
  categoryId: Types.ObjectId;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Brand',
    required: true,
    trim: true,
  })
  brandId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true, trim: true })
  createdBy: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true, trim: true })
  updatedBy: Types.ObjectId;

  //______________________number_______________________//

  @Prop({ type: Number, required: true, min: 1 })
  price: number;

  @Prop({ type: Number,default: 0, min: 1 })
  discountAmount: number;

  @Prop({
    type: String,
    enum: discountType,
    default: discountType.fixed_amount,
  })
  disCountType: discountType;

  @Virtual({
    get: function (this: Product) {
      if (this.disCountType == discountType.fixed_amount)
        return this.price - this.discountAmount;
      else return this.price - (this.price * this.discountAmount) / 100;
    },
  })
  finalPrice: number; // virtual

  @Prop({ type: Number, default: 1, min: 0 })
  stock: number;

  @Prop({ type: Number, min: 0 })
  sold: number;

  //______________________specification_______________________//
  @Prop({ type: [String] })
  colors: string[];

  @Prop({ type: [String] })
  sizes: string[];
}

export const productSchema = SchemaFactory.createForClass(Product);
