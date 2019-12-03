import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubsService } from './clubs.service';
import { ClubsController } from './clubs.controller';
import { Club } from './clubs-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Club])],
  providers: [ClubsService],
  controllers: [ClubsController],
})
export class ClubModule {}
