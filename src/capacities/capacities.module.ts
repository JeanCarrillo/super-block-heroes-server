
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CapacitiesService } from './capacities.service';
import { CapacitiesController } from './capacities.controller';
import { Capacity } from './capacities-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Capacity])],
  providers: [CapacitiesService],
  controllers: [CapacitiesController],
})

export class CapacityModule { }