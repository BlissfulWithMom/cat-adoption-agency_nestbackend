import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cat.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() cat: Cat): Promise<Cat> {
    return this.catsService.create(cat);
  }

  @Get()
  findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<Cat> {
  //   return this.catsService.findOne(+id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() cat: Cat): Promise<Cat> {
  //   return this.catsService.update(+id, cat);
  // }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.catsService.remove(+id);
  }
}
