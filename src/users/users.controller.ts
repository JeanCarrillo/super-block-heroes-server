import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Res,
  Request,
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
    console.log('gg', data);
    this.service.getUser(Number(id)).then(user => {
      user.invitations.push(data.nickname);
      console.log({ user });
      return this.service.updateUser(user).then(updatedUser => {
        console.log({ updatedUser });
        return updatedUser;
      });
    });
  }

  @Put('addFriend/:nickname')
  addFriend(
    @Param('nickname') nickname,
    @Body() data: any,
    @Res() response,
  ): Promise<any> {
    return this.service.getUserByNickname(nickname).then(user => {
      console.log({ nickname }); // USER => MY FRIEND
      console.log(data.nickname); // ME
      if (user.friends.findIndex(friend => user.nickname === friend) === -1) {
        user.friends.push(data.nickname);
      }
      const invitIndex = user.invitations.findIndex(
        invite => data.nickname === invite,
      );
      if (invitIndex !== -1) {
        user.invitations.splice(invitIndex, 1);
      }
      console.log({ user });

      this.service.updateUser(user);

      return this.service.getUserByNickname(data.nickname).then(myUser => {
        console.log({ myUser });
        if (myUser.friends.findIndex(friend => nickname === friend) === -1) {
          myUser.friends.push(nickname);
        }
        const index = myUser.invitations.findIndex(
          invite => nickname === invite,
        );
        if (index !== -1) {
          myUser.invitations.splice(index, 1);
        }
        return this.service.updateUser(myUser).then(() => {
          console.log('myid ' + myUser.id);
          return this.service.getUser(Number(myUser.id));
        });
      });
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id([0-9]+)')
  update(@Param('id') id, @Body() user: User, @Request() req): Promise<User> {
    console.log('JWT GUARD PUT');
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
