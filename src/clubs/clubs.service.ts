import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './clubs-entity';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club) private ClubsRepository: Repository<Club>,
  ) {}

  async getClubs(club: Club): Promise<Club[]> {
    return await this.ClubsRepository.find();
  }

  async getClub(id: number): Promise<Club[]> {
    return await this.ClubsRepository.find({
      select: ['name'],
      where: [{ id }],
    });
  }

  async createClub(club: Club) {
    this.ClubsRepository.create(club);
  }

  async updateClub(club: Club) {
    this.ClubsRepository.save(club);
  }

  async deleteClub(club: Club) {
    this.ClubsRepository.delete(club);
  }
}
