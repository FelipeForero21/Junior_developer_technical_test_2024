import { IsNumber } from 'class-validator';

export class AddAnimalToCorralDto {
  @IsNumber()
  animalId: number;

  @IsNumber()
  corralId: number;

  @IsNumber()
  quantity: number;
}
