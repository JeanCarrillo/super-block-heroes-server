import { Injectable, All } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async createMonster(monster: Monster) {
    this.MonstersRepository.create(monster);
  }

  async updateMonster(monster: Monster) {
    this.MonstersRepository.save(monster);
  }

  async deleteMonster(monster: Monster) {
    this.MonstersRepository.delete(monster);
  }
}
