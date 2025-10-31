import { TOKEN_TYPES } from '@common/enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';


@Schema({ timestamps: true })
export class Token {
  @Prop({ type: String, required: true })
  token: string;

  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  user: Types.ObjectId;

  @Prop({ type: String, enum: TOKEN_TYPES, required: true })
  type: string;

 @Prop({
  type: Date,
  expires: 0, // TTL index auto-deletion
  required: true,
})
  expiresAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
