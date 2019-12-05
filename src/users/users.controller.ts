import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Res,
  HttpException,
  HttpStatus,
  Catch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users-entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  index(): Promise<User[]> {
    return this.service.getUsers();
  }

  @Get(':id')
  findByNickname(@Param() params): Promise<User> {
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
  create(@Body() user: User): Promise<any> {
    return this.service.getUserByEmail(user.email).then(res => {
      console.log('USERS CONTROLLER');
      console.log(res);
      if (res === undefined) {
        return this.service.createUser(user).then(createdUser => {
          return this.service.getUserByEmail(createdUser.email);
        });
      }
      return this.service.getUserByEmail(user.email);
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id, @Body() user: User): Promise<User> {
    user.id = Number(id);
    console.log('Update #' + user.id);
    console.log({ user });

    return this.service.updateUser(user).then(() => {
      return this.service.getUser(user.id);
    });
  }

  @Delete(':id')
  deleteUser(@Param('id') params): Promise<any> {
    return this.service.deleteUser(params.id);
  }
}
