import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ClubsService } from './Clubs.service';
import { Club } from './clubs-entity';

@Controller('Clubs')
export class ClubsController {
  constructor(private service: ClubsService) {}

  @Get(':id')
  get(@Param() params) {
    return this.service.getClub(params.id);
  }

  @Post()
  create(@Body() club: Club) {
    return this.service.createClub(club);
  }

  @Put()
  update(@Body() club: Club) {
    return this.service.updateClub(club);
  }

  @Delete(':id')
  deleteClub(@Param() params) {
    return this.service.deleteClub(params.id);
  }
}
