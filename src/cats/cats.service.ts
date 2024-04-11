import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const newCat = this.catRepository.create(createCatDto);
    return this.catRepository.save(newCat);
  }

  async findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  async findOne(id: number): Promise<Cat> {
  const findOneOptions : FindOneOptions<Cat> = { 
    where: { id },
   }
    return this.catRepository.findOne(findOneOptions);
  }

  async update(id: number, updateCatDto: CreateCatDto): Promise<Cat> {
    const cat = await this.catRepository.preload({
      id: +id,
      ...updateCatDto,
    });
    if (!cat) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    return this.catRepository.save(cat);
  }

  async remove(id: number): Promise<void> {
    const result = await this.catRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
  }
}
