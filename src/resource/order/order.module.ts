import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema, Service, ServiceSchema, User, UserSchema } from 'src/schema';
import { UserService } from '../user/user.service';
import { ServiceService } from '../service/service.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Service.name,
        schema: ServiceSchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, UserService, ServiceService],
})
export class OrderModule {}
