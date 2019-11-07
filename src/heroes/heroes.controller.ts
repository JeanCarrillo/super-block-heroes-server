import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { Hero } from './heroes-entity';

@Controller('Heroes')
export class HeroesController {
  constructor(private service: HeroesService) {}

  @Get()
  index(): Promise<Hero[]> {
    return this.service.getHeroes();
  }

  @Get(':id')
  find(@Param() id): Promise<Hero[]> {
    return this.service.getHero(id.id);
  }

  @Post()
  create(@Body() hero: Hero) {
    return this.service.createHero(hero);
  }

  @Put()
  update(@Body() hero: Hero) {
    return this.service.updateHero(hero);
  }

  @Delete(':id')
  deleteHero(@Param() params) {
    return this.service.deleteHero(params.id);
  }
}
