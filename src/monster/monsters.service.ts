
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Monster } from './monsters-entity';

@Injectable()
export class MonstersService {

    constructor(@InjectRepository(Monster) private MonstersRepository: Repository<Monster>) { }

    async getMonsters(): Promise<Monster[]> {
        return await this.MonstersRepository.find();
    }

    async getMonster(_id: number): Promise<Monster[]> {
        return await this.MonstersRepository.find({
            select: ["name"],
            where: [{ "id": _id }]
        });
    }

    async createMonster(Monster:Monster) {
        this.MonstersRepository.create(Monster);
    }

    async updateMonster(Monster: Monster) {
        this.MonstersRepository.save(Monster)
    }

    async deleteMonster(Monster: Monster) {
        this.MonstersRepository.delete(Monster);
    }
}