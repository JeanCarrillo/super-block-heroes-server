import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroesService } from './heroes.service';
import { HeroesController } from './heroes.controller';
import { Hero } from './heroes-entity';
import { CapacitiesService } from 'src/capacities/capacities.service';
import { Capacity } from 'src/capacities/capacities-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hero, Capacity])],
  providers: [HeroesService, CapacitiesService],
  controllers: [HeroesController],
})
export class HeroesModule {}
