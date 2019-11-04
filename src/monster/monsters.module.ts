
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonstersService } from './monsters.service';
import { MonstersController } from './monsters.controller';
import { Monster } from './monsters-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Monster])],
  providers: [MonstersService],
  controllers: [MonstersController],
})

export class MonsterModule { }