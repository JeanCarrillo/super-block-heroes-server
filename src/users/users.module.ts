import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users-entity';
import { Capacity } from 'src/capacities/capacities-entity';
import { CapacitiesService } from 'src/capacities/capacities.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Capacity])],
  providers: [UsersService, CapacitiesService],
  controllers: [UsersController],
})
export class UsersModule {}
