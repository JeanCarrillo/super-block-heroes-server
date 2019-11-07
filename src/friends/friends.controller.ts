import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendRelation } from './friends-entity';

@Controller('Friends')
export class FriendsController {
  constructor(private service: FriendsService) {}

  @Get(':id')
  get(@Param() params) {
    return this.service.getFriendRelation(params.id);
  }

  @Post()
  create(@Body() friendRelation: FriendRelation) {
    return this.service.createFriendRelation(friendRelation);
  }

  @Put()
  update(@Body() friendRelation: FriendRelation) {
    return this.service.updateFriendRelation(friendRelation);
  }

  @Delete(':id')
  deleteFriendRelation(@Param() params) {
    return this.service.deleteFriendRelation(params.id);
  }
}
