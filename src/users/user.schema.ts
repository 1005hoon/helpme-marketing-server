import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: string;

  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  avatar_url: string;

  @Prop({ default: false })
  is_deleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
