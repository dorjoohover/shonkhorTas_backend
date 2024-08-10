import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from 'src/schema';
import { OrderDto } from './dto/order.dto';
import { ActionMessage } from 'src/utils/enum';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private model: Model<OrderDocument>) {}

  async create(dto: OrderDto) {
    const order = await this.model.create(dto);
    return {
      status: 201,
      message: ActionMessage.success,
      id: order._id,
    };
  }

  async getAll() {
    const order = await this.model.find();
    return {
      data: order,
      status: 200,
    };
  }

  async getOne(id: string) {
    const order = await this.model.findById(id);
    return {
      data: order,
      status: 200,
    };
  }
  async updateOne(id: string, dto: OrderDto) {
    const order = await this.model.updateOne(
      {
        id: id,
      },
      {
        ...dto
      }
    );
    return {
        status: 201, 
        id: id, 
        message: ActionMessage.success
    }
  }
  async deleteMany() {
    const orders = await this.model.deleteMany()
    return {
        status: 201, 
        id: orders.deletedCount, 
        message: ActionMessage.success
    }
  }

  async deleteOne(id: string) {
    const order = await this.model.deleteOne({id: id})
    return {
        status: 201, 
        id: id, 
        message: ActionMessage.success
    }
  } 
}
