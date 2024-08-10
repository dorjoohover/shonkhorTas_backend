import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';

@Controller('payment')
@ApiTags('Payment')
export class PaymentController {
    constructor(private readonly service: PaymentService) {}

  @Post()
  create(@Body() dto: PaymentDto) {
    return this.service.create(dto);
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
  updateOne(@Param('id') id: string, @Body() dto: PaymentDto) {
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
