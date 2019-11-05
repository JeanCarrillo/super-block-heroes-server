
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Capacity } from './capacities-entity';

@Injectable()
export class CapacitiesService {

    constructor(@InjectRepository(Capacity) private CapacitiesRepository: Repository<Capacity>) { }

    async getCapacities(Capacity: Capacity): Promise<Capacity[]> {
        return await this.CapacitiesRepository.find();
    }

    async getCapacity(_id: number): Promise<Capacity[]> {
        return await this.CapacitiesRepository.find({
            select: ["name"],
            where: [{ "id": _id }]
        });
    }

    async createCapacity(Capacity:Capacity) {
        this.CapacitiesRepository.create(Capacity);
    }

    async updateCapacity(Capacity: Capacity) {
        this.CapacitiesRepository.save(Capacity)
    }

    async deleteCapacity(Capacity: Capacity) {
        this.CapacitiesRepository.delete(Capacity);
    }
}