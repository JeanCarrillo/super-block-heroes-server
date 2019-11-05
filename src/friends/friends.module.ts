
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { FriendRelation } from './friends-entity';

@Module({
  imports: [TypeOrmModule.forFeature([FriendRelation])],
  providers: [FriendsService],
  controllers: [FriendsController],
})

export class FriendsModule { }