import { discountType } from '@common/enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class UsedBy {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  customerId: Types.ObjectId;

  @Prop({ type: Number })
  count: number;
}
@Schema({ timestamps: true })
export class Coupon {
  readonly _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: Number, required: true })
  discountAmount: number;

  @Prop({
    type: String,
    enum: discountType,
    default: discountType.fixed_amount,
  })
  discountType: discountType;

  @Prop({ type: Date, required: true })
  fromtDate: Date;

  @Prop({ type: Date, required: true })
  toDate: Date;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  updatedBy: Types.ObjectId;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  @Prop({ type: [UsedBy] })
  usedBy: UsedBy[];

  @Prop({ type: [UsedBy] })
  assignedTo: UsedBy[];
}

export const couponSchema = SchemaFactory.createForClass(Coupon);
