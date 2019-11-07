import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Monster } from './monsters-entity';
@Injectable()
export class MonstersService {
  constructor(
    @InjectRepository(Monster) private MonstersRepository: Repository<Monster>,
  ) {}

  async getMonsters(): Promise<Monster[]> {
    return await this.MonstersRepository.find();
  }

  async getMonster(id): Promise<Monster[]> {
    return await this.MonstersRepository.findByIds(id);
  }

  async createMonster(monster: Monster): Promise<Monster> {
    return await this.MonstersRepository.save(monster);
  }

  async updateMonster(monster: Monster): Promise<UpdateResult> {
    return await this.MonstersRepository.update(monster.id, monster);
  }

  async deleteMonster(id): Promise<DeleteResult> {
    return await this.MonstersRepository.delete(id);
  }
}
