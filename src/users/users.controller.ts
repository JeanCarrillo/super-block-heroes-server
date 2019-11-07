import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users-entity';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  index(): Promise<User[]> {
    return this.service.getUsers();
  }

  @Get(':id')
  findByNickname(@Param() params): Promise<User[]> {
    return this.service.getUser(params.id);
  }

  @Get('nickname/:nickname')
  async find(@Param() params, @Res() response) {
    const user = await this.service.getUserByNickname(params.nickname);

    if (user === undefined) {
      response.sendStatus(404);
    }

    response.json(user);
  }

  @Post()
  create(@Body() user: User) {
    console.log(user);
    return this.service.createUser(user);
  }

  @Put()
  update(@Body() user: User) {
    return this.service.updateUser(user);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteUser(params.id);
  }
}
