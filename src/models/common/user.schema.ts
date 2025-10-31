//user schema

import { USER_AGENT } from '@common/enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

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
   readonly _id :Types.ObjectId;
  @Prop({ type: String, required: true })
  userName: string;
  @Prop({ type: String, required: true, unique: true })
  email: string;
  @Prop({ type: String, required: true }) //type = mongoose
  password: string; //type =typescript

   @Prop({ type: Boolean, default: false })
  isVerified: boolean; 

  @Prop({ type: String, default: null })
  otp: string; 

  @Prop({ type: Date, default: null })
  otpExpiry: Date; 
    @Prop({ type: String, required: true,})
    gender:string;
    @Prop({type:String,enum:USER_AGENT,default:USER_AGENT.local})
     userAgent: string;

     @Prop({ type: Date})
     banUntil: Date;
}

export const userSchema = SchemaFactory.createForClass(User);