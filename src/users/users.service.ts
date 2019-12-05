import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, EntityManager } from 'typeorm';
import { User } from './users-entity';
import * as crypto from 'crypto';

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

  async getUserByNickname(nickname: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { nickname },
      select: ['id', 'nickname', 'email', 'gold', 'hero', 'password'],
      relations: ['hero'],
    });
  }

  async getUserByEmail(email): Promise<User> {
    return await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'nickname', 'email', 'gold', 'hero', 'password'],
      relations: ['hero'],
    });
  }

  async createUser(user: User): Promise<User> {
    return await this.usersRepository.save({
      ...user,
      password: crypto.createHmac('sha256', user.password).digest('hex'),
    });
  }

  async updateUser(user: User): Promise<UpdateResult> {
    return await this.usersRepository.update(user.id, user);
  }

  async deleteUser(id): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
