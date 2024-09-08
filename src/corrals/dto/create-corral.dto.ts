import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateCorralDto {
  @IsString()
  name: string;

  @IsNumber()
  capacity: number;

  @IsBoolean()
  isHighRisk: boolean;
}
