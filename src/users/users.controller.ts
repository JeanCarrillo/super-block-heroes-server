
import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users-entity';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService) { }

    @Get()
    index(): Promise<User[]> {
      return  this.service.getUsers();
    }

    @Get(':id')
    find(@Param() id): Promise<User[]> {
      return  this.service.getUser(id.id);
    }

    @Post()
    create(@Body() user: User) {
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