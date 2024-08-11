import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { OrderStatus } from 'src/utils/enum';

export type OrderDocument = Order & Document;

@Schema({
  timestamps: true,
})
export class Order extends Document {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'users' })
  user: string;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'services' })
  service: string;

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.pending })
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
