import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from 'src/schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Payment.name, 
      schema: PaymentSchema
    }])
  ],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
