import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserStatus, UserType } from '../utils/enum';

export type UserDocument = Document & User;

@Schema({ timestamps: true, toJSON: { getters: true, minimize: false } })
export class User {
  @Prop()
  username: string;

  @Prop()
  profileImg?: string;

  @Prop()
  phone: string;

  @Prop({ type: String, enum: UserType, default: UserType.default })
  userType: UserType;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  birthday?: string;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.pending })
  status: UserStatus;
  @Prop()
  message: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
