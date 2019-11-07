import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero } from './heroes-entity';

@Injectable()
export class HeroesService {
  constructor(
    @InjectRepository(Hero) private HeroesRepository: Repository<Hero>,
  ) {}

  async getHeroes(): Promise<Hero[]> {
    return await this.HeroesRepository.find();
  }

  async getHero(id): Promise<Hero[]> {
    return await this.HeroesRepository.findByIds(id);
  }

  async createHero(hero: Hero) {
    this.HeroesRepository.create(hero);
  }

  async updateHero(hero: Hero) {
    this.HeroesRepository.save(hero);
  }

  async deleteHero(hero: Hero) {
    this.HeroesRepository.delete(hero);
  }
}
