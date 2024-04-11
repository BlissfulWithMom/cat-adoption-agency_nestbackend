import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])], // Provide the Cat entity to the CatsModule
  providers: [CatsService], // Include CatsService as a provider
  controllers: [CatsController],
})
export class CatsModule {}
