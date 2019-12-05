import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Capacity } from './capacities-entity';

@Injectable()
export class CapacitiesService {
  constructor(
    @InjectRepository(Capacity)
    private CapacitiesRepository: Repository<Capacity>,
  ) {}

  async getCapacities(): Promise<Capacity[]> {
    return await this.CapacitiesRepository.find();
  }

  async getCapacity(id: number): Promise<Capacity[]> {
    return await this.CapacitiesRepository.find({
      select: ['name'],
      where: [{ id }],
    });
  }

  async createCapacity(capacity: Capacity) {
    this.CapacitiesRepository.create(capacity);
  }

  async updateCapacity(capacity: Capacity) {
    this.CapacitiesRepository.save(capacity);
  }

  async deleteCapacity(capacity: Capacity) {
    this.CapacitiesRepository.delete(capacity);
  }
}
