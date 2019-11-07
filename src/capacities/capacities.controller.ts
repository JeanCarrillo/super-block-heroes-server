import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { CapacitiesService } from './capacities.service';
import { Capacity } from './capacities-entity';

@Controller('Capacities')
export class CapacitiesController {
  constructor(private service: CapacitiesService) {}

  @Get(':id')
  get(@Param() params) {
    return this.service.getCapacity(params.id);
  }

  @Post()
  create(@Body() capacity: Capacity) {
    return this.service.createCapacity(capacity);
  }

  @Put()
  update(@Body() capacity: Capacity) {
    return this.service.updateCapacity(capacity);
  }

  @Delete(':id')
  deleteCapacity(@Param() params) {
    return this.service.deleteCapacity(params.id);
  }
}
