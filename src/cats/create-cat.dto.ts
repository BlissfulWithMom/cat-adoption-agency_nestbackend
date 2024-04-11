import { IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
