import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


export type ServiceDocument = Service & Document;

export class ServiceItems {
  @Prop({ required: true })
  id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  value: string;

  @Prop()
  index: number;
}

@Schema({timestamps: true})
export class Service {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'categories' })
  subCategory: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'categories' })
  category: string;


  @Prop({type: Array<ServiceItems>})
  items: ServiceItems[];


  @Prop()
  file?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  user: string;

  @Prop()
  price?: number

  @Prop({ max_length: 1000 })
  returnMessage?: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
