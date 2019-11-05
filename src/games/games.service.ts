
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './games-entity';

@Injectable()
export class GamesService {

    constructor(@InjectRepository(Game) private GamesRepository: Repository<Game>) { }

    async getGames(Game: Game): Promise<Game[]> {
        return await this.GamesRepository.find();
    }

    async getGame(_id: number): Promise<Game[]> {
        return await this.GamesRepository.find({
            select: ["level"],
            where: [{ "id": _id }]
        });
    }

    async createGame(Game:Game) {
        this.GamesRepository.create(Game);
    }

    async updateGame(Game: Game) {
        this.GamesRepository.save(Game)
    }

    async deleteGame(Game: Game) {
        this.GamesRepository.delete(Game);
    }
}