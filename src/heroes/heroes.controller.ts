
import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { Hero } from './heroes-entity';

@Controller('Heroes')
export class HeroesController {

    constructor(private service: HeroesService) { }

    @Get()
    index(): Promise<Hero[]> {
      return  this.service.getHeroes();
    }

    @Get(':id')
    get(@Param() params) {
        return this.service.getHero(params.id);
    }

    @Post()
    create(@Body() Hero: Hero) {
        return this.service.createHero(Hero);
    }

    @Put()
    update(@Body() Hero: Hero) {
        return this.service.updateHero(Hero);
    }

    @Delete(':id')
    deleteHero(@Param() params) {
        return this.service.deleteHero(params.id);
    }
}