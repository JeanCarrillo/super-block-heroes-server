
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Monster } from './monsters-entity';
@Injectable()
export class MonstersService {

    constructor(@InjectRepository(Monster) private MonstersRepository: Repository<Monster>) { }

    async getMonsters(): Promise<Monster[]> {
        return await this.MonstersRepository.find();
    }

    async getMonster(_id): Promise<Monster[]> {
        return await this.MonstersRepository.findByIds(_id);
    }

    async  createMonster(Monster: Monster): Promise<Monster> {
    return await this.MonstersRepository.save(Monster);
    }  

    async updateMonster(Monster: Monster): Promise<UpdateResult> {
        return await this.MonstersRepository.update(Monster.id, Monster);
    }

    async deleteMonster(id): Promise<DeleteResult> {
        return await this.MonstersRepository.delete(id);
    }
}