//seller schema

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
export class Admin {
  userName: string;
  email: string;
  password: string; //type =typescript
  
}

export const adminSchema = SchemaFactory.createForClass(Admin);
