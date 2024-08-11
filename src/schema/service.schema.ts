import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {
  @Prop()
  img?: string;
  @Prop()
  text: string;
  @Prop()
  count: number;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
