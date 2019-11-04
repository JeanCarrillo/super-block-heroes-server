require('dotenv').config();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MonsterModule } from './monster/monsters.module';
import { HeroesModule } from './heroes/heroes.module';

import { User } from './users/users-entity';
import { Monster } from './monster/monsters-entity';
import { Hero } from './heroes/heroes-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Monster, Hero],
      synchronize: true,
    }),
    UsersModule, MonsterModule, HeroesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
