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

  @Get(':id([0-9]+)')
  findById(@Param() params): Promise<User> {
    return this.service.getUser(params.id);
  }

  @Get('highscores')
  findHighscores(): Promise<User[]> {
    return this.service.getHighscores();
  }

  @Get('nickname/:nickname')
  async findByNickname(@Param() params, @Res() response) {
    const user = await this.service.getUserByNickname(params.nickname);

    if (user === undefined) {
      response.sendStatus(404);
    }

    response.json(user);
  }

  @Get('email/:email')
  async findByEmail(@Param() params, @Res() response) {
    const user = await this.service.getUserByEmail(params.email);

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


  @Put('invite/:id')
  inviteUser(@Param('id') id, @Body() data: any): void {
    console.log('InviteUser()');
    console.log("gg",data);
    this.service.getUser(Number(id)).then((user) => {
      user.invitations.push(data.nickname);
      console.log({user});
      return this.service.updateUser(user)
        .then((updatedUser) => {
          console.log({ updatedUser });
          return updatedUser;
        });
    });
  }

  @Put('addFriend/:nickname')
  addFriend(@Param('nickname') nickname, @Body() data: any): void {
    this.service.getUserByNickname(nickname).then((user) => {
      user.friends.push(data.nickname);
      user.invitations.map((friend, i) => {
        console.log('friend=>', friend);
        if (friend == data.nickname) {
          console.log('friend In invitations');
          user.invitations.splice(i, 1);
          return;
        }
      });
      console.log({user});

      return this.service.updateUser(user)
        .then((updatedUser) => {
          console.log({ updatedUser });
          return updatedUser;
        });
    });

    this.service.getUserByNickname(data.nickname)
      .then((user) => {
        user.friends.push(nickname);
        console.log('me =>', user);
      });

  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id([0-9]+)')
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
