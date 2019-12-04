import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, EntityManager } from 'typeorm';
import { User } from './users-entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(id): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'nickname', 'email', 'gold', 'hero'],
      relations: ['hero'],
    });
  }

  async getUserByEmail(email): Promise<User> {

    console.log('getUserByEmail():', email);
    return await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'nickname', 'email', 'gold', 'hero', 'password'],
      relations: ['hero'],
    });
  }

  async createUser(user: User): Promise<User> {
    console.log('USERS SERVICE');
    console.log(user);
    return await this.usersRepository.save(user);
  }

  async updateUser(user: User): Promise<UpdateResult> {
    return await this.usersRepository.update(user.id, user);
  }

  async deleteUser(id): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
