import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type OrderDocument = Order & Document;

export class OrderDetail {
  @Prop()
  id: string;

  @Prop()
  value: string;

  @Prop()
  parentId?: string;

}
@Schema()
export class Order extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  index: number;

  @Prop({type: Array<OrderDetail>})
  value: OrderDetail[];
  @Prop()
  type: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'users' })
  user?: string;

  @Prop()
  other: boolean;

  @Prop({ default: false })
  isSearch: boolean;

  @Prop({ default: true })
  isUse: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order)