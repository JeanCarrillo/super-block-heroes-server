import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { Monster } from './monsters-entity';

@Controller('Monsters')
export class MonstersController {
  constructor(private service: MonstersService) {}

  @Get()
  index(): Promise<Monster[]> {
    return this.service.getMonsters();
  }

  @Get(':id')
  find(@Param() id): Promise<Monster[]> {
    return this.service.getMonster(id.id);
  }

  @Post()
  create(@Body() monster: Monster) {
    return this.service.createMonster(monster);
  }

  @Put()
  update(@Body() monster: Monster) {
    return this.service.updateMonster(monster);
  }

  @Delete(':id')
  deleteMonster(@Param() params) {
    return this.service.deleteMonster(params.id);
  }
}
