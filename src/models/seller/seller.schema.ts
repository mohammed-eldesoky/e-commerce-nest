//seller schema

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  discriminatorKey: 'role',
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
}) //2-options here
//1-defention of user schema
export class Seller {
   readonly _id :Types.ObjectId;
  userName: string;
  email: string;
  password: string; //type =typescript
  @Prop({ type: String, required: true })
  whatsapplink: string;
}

export const sellerSchema = SchemaFactory.createForClass(Seller);
