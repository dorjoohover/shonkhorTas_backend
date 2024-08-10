import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type PaymentDocument = Payment & Document



@Schema()
export class Payment {
    @Prop({type: mongoose.Types.ObjectId, ref:'users'})
    user?: string
  
    @Prop()
    title: string

    @Prop({required: true})
    message: string
}

export const PaymentSchema = SchemaFactory.createForClass(Payment)