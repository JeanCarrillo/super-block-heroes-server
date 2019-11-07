import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './games-entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private GamesRepository: Repository<Game>,
  ) {}

  async getGames(game: Game): Promise<Game[]> {
    return await this.GamesRepository.find();
  }

  async getGame(id: number): Promise<Game[]> {
    return await this.GamesRepository.find({
      select: ['level'],
      where: [{ id }],
    });
  }

  async createGame(game: Game) {
    this.GamesRepository.create(game);
  }

  async updateGame(game: Game) {
    this.GamesRepository.save(game);
  }

  async deleteGame(game: Game) {
    this.GamesRepository.delete(game);
  }
}
