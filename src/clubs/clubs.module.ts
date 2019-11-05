
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubsService } from './Clubs.service';
import { ClubsController } from './Clubs.controller';
import { Club } from './clubs-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Club])],
  providers: [ClubsService],
  controllers: [ClubsController],
})

export class ClubModule { }