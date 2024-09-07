import { IsString, IsNumber, Min, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { Animal } from '../entities/animal.entity';

export class CreateAnimalDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  age: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  corralId: number;

  @IsOptional()
  @IsArray()
  restrictedAnimals?: Animal[];

  @IsOptional()
  @IsBoolean()
  isHighRisk?: boolean;
}