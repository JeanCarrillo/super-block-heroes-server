
import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { Monster } from './monsters-entity';

@Controller('Monsters')
export class MonstersController {

    constructor(private service: MonstersService) { }

    @Get()
    index(): Promise<Monster[]> {
      return  this.service.getMonsters();
    }

    @Get(':id')
    find(@Param() data): Promise<Monster[]> {
      return  this.service.getMonster(data.id);
    }

    @Post('new')
    async create(@Body() Monster: Monster): Promise<any> {
      return this.service.createMonster(Monster);
    }  

    @Put('update/:id')
    async update(@Param('id') id, @Body() data: Monster): Promise<any> {
        data.id = Number(id);
        console.log('Update #' + data.id)
        return this.service.updateMonster(data);
    }  

    @Delete('delete/:id')
    async delete(@Param('id') id): Promise<any> {
      return this.service.deleteMonster(id);
    }  
}