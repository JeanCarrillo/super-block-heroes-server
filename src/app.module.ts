require('dotenv').config();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MonsterModule } from './monster/monsters.module';
import { HeroesModule } from './heroes/heroes.module';
import { ClubModule } from './clubs/clubs.module';
import { CapacityModule } from './capacities/capacities.module';
import { GameModule } from './games/games.module';
import { FriendsModule } from './friends/friends.module';
import { User } from './users/users-entity';
import { Monster } from './monster/monsters-entity';
import { Hero } from './heroes/heroes-entity';
import { Club } from './clubs/clubs-entity';
import { Capacity } from './capacities/capacities-entity';
import { Game } from './games/games-entity';
import { FriendRelation } from './friends/friends-entity';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Monster, Hero, Club, Capacity, Game, FriendRelation],
      synchronize: true,
    }),
    UsersModule,
    MonsterModule,
    HeroesModule,
    ClubModule,
    CapacityModule,
    GameModule,
    FriendsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
