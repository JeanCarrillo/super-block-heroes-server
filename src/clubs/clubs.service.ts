
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './clubs-entity';

@Injectable()
export class ClubsService {

    constructor(@InjectRepository(Club) private ClubsRepository: Repository<Club>) { }

    async getClubs(Club: Club): Promise<Club[]> {
        return await this.ClubsRepository.find();
    }

    async getClub(_id: number): Promise<Club[]> {
        return await this.ClubsRepository.find({
            select: ["name"],
            where: [{ "id": _id }]
        });
    }

    async createClub(Club:Club) {
        this.ClubsRepository.create(Club);
    }

    async updateClub(Club: Club) {
        this.ClubsRepository.save(Club)
    }

    async deleteClub(Club: Club) {
        this.ClubsRepository.delete(Club);
    }
}