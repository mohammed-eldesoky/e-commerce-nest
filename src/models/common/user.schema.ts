//user schema

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  discriminatorKey:'role',
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
}) //2-options here
//1-defention of user schema
export class User {
  @Prop({ type: String, required: true })
  userName: string;
  @Prop({ type: String, required: true, unique: true })
  email: string;
  @Prop({ type: String, required: true }) //type = mongoose
  password: string; //type =typescript
}

export const userSchema = SchemaFactory.createForClass(User);