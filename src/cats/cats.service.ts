import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  async create(cat: Cat): Promise<Cat> {
    return this.catRepository.save(cat);
  }

  async findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  // async findOne(id: number): Promise<Cat> {
  //   return this.catRepository.findOne(id);
  // }

  // async update(id: number, cat: Cat): Promise<Cat> {
  //   await this.catRepository.update(id, cat);
  //   return this.catRepository.findOne(id);
  // }

  async remove(id: number): Promise<void> {
    await this.catRepository.delete(id);
  }
}
