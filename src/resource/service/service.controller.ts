import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceDto } from './dto/service.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('service')
export class ServiceController {
  constructor(private readonly service: ServiceService) {}

  @Post()
  create(@Body() dto: ServiceDto) {
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
  updateOne(@Param('id') id: string, @Body() dto: ServiceDto) {
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
