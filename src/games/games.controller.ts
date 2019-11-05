
import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './games-entity';

@Controller('Games')
export class GamesController {

    constructor(private service: GamesService) { }

    @Get(':id')
    get(@Param() params) {
        return this.service.getGame(params.id);
    }

    @Post()
    create(@Body() Game: Game) {
        return this.service.createGame(Game);
    }

    @Put()
    update(@Body() Game: Game) {
        return this.service.updateGame(Game);
    }

    @Delete(':id')
    deleteGame(@Param() params) {
        return this.service.deleteGame(params.id);
    }
}