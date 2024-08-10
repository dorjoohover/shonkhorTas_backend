import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
  UserStatus,
  UserType,
} from '../utils/enum';

export type UserDocument = Document & User;
export class UserLocation {
  @Prop()
  lat: string;
  @Prop()
  lng: string;
}

export class AgentAddition {
  @Prop()
  organizationName?: string;
  @Prop()
  organizationContract?: string;
  @Prop()
  identityCardFront?: string;
  @Prop()
  identityCardBack?: string;
  @Prop()
  location?: UserLocation;
  @Prop()
  address?: string;
  @Prop()
  firstName?: string;
  @Prop()
  lastName?: string;
  @Prop()
  registerNumber?: string;
}
export class OrganizationAddition {
  @Prop()
  organizationName: string;
  @Prop()
  organizationCertificationCopy: string;
  @Prop()
  location: UserLocation;
  @Prop()
  address?: string;
  @Prop()
  organizationRegisterNumber: string;
}
@Schema({ timestamps: true, toJSON: { getters: true, minimize: false } })
export class User {
  @Prop()
  username: string;

  @Prop()
  profileImg?: string;

  @Prop()
  ads: string[];

  @Prop()
  phone: string;

  @Prop({ type: String, enum: UserType, default: UserType.default })
  userType: UserType;

  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ required: true, default: 0 })
  point: number;

  @Prop()
  birthday?: string;
  @Prop()
  bookmarks: number[];

  @Prop({ type: AgentAddition })
  agentAddition: AgentAddition;
  @Prop({ type: OrganizationAddition })
  organizationAddition: OrganizationAddition;

  @Prop()
  code: string;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.pending })
  status: UserStatus;
  @Prop()
  message: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
