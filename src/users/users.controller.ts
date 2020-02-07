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
    console.log('gg', data);
    this.service.getUser(Number(id)).then(user => {
      // const invit = user.invitations.findIndex(invitation => (invitation === data.nickname));

      for (let i = 0; i < user.invitations.length; i++) {
        let alreadyIn = user.invitations[i] === data.nickname;
        alreadyIn && user.invitations.splice(i, 1);
      }
      user.invitations.push(data.nickname);
      console.log({ user });
      return this.service.updateUser(user).then(updatedUser => {
        console.log({ updatedUser });
        return updatedUser;
      });
    });
  }

  @Put('addFriend/:friendName')
  addFriend(
    @Param('friendName') friendName,
    @Body() data: any,
    @Res() response,
  ): Promise<any> {
    return this.service.getUserByNickname(friendName).then(friend => {
      const myName = data.nickname;
      console.log('la personne qui sera mon ami', { friendName }); // USER => MY FRIEND
      console.log('moi même', myName); // ME

      console.log(
        'findIndex :',
        friend.friends.findIndex(fName => myName === fName),
      );

      const findIndex = friend.friends.findIndex(fName => myName === fName);

      if (findIndex !== -1) {
        return response.sendStatus(403);
      } else {
        console.log(findIndex);
        friend.friends.push(myName);
        const invitIndex = friend.invitations.findIndex(
          invit => invit === myName,
        );
        if (invitIndex !== -1) {
          friend.invitations.splice(invitIndex, 1);
        }
      }
      this.service.updateUser(friend);

      return this.service.getUserByNickname(myName).then(myUser => {
        const myfriendFindIndex = myUser.friends.findIndex(
          fName => fName === friendName,
        );

        if (myfriendFindIndex !== -1) {
          return response.sendStatus(403);
        } else {
          console.log(myfriendFindIndex);
          myUser.friends.push(friendName);
          const invitIndex = myUser.invitations.findIndex(
            invit => invit === friendName,
          );

          if (invitIndex !== -1) {
            myUser.invitations.splice(invitIndex, 1);
          }
        }
        return this.service.updateUser(myUser).then(() => {
          console.log('myid ' + myUser.id);
          console.log('myUser', myUser);
          return this.service.getUser(Number(myUser.id));
        });
      });
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
