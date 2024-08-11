import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() { user }, @Body() dto: OrderDto) {
    return this.service.create(user['_id'], dto);
  }

  @Get('all')
  getAll() {
    return this.service.getAll();
  }

  @Get('one/:id')
  @ApiParam({ name: 'id' })
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }

  @Put('/:id')
  @ApiParam({ name: 'id' })
  updateOne(@Param('id') id: string, @Body() dto: OrderDto) {
    return this.service.updateOne(id, dto);
  }

  @Delete()
  deleteMany() {
    return this.service.deleteMany();
  }

  @Delete('/:id')
  @ApiParam({ name: 'id' })
  deleteOne(@Param('id') id: string) {
    return this.service.deleteOne(id);
  }
}
