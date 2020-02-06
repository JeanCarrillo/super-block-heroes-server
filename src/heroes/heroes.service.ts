import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero } from './heroes-entity';
import { Capacity } from '../capacities/capacities-entity';

@Injectable()
export class HeroesService {
  constructor(
    @InjectRepository(Hero) private HeroesRepository: Repository<Hero>,
    @InjectRepository(Capacity)
    private CapacitiesRepository: Repository<Capacity>,
  ) {}

  async getHeroes(): Promise<Hero[]> {
    const capacities = await this.CapacitiesRepository.find();
    const heroes = await this.HeroesRepository.find();
    for (let i = 0; i < heroes.length; i++) {
      heroes[i].capacity = capacities[i];
    }
    return heroes;
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
