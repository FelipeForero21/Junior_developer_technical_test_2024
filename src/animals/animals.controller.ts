import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post('add-to-corral')
  async addAnimalToCorral(
    @Body() createAnimalDto: CreateAnimalDto,
  ): Promise<void> {
    if (
      isNaN(createAnimalDto.age) ||
      isNaN(createAnimalDto.quantity) ||
      isNaN(createAnimalDto.corralId)
    ) {
      throw new BadRequestException(
        'Invalid input: Age, Quantity, and Corral ID must be valid numbers.',
      );
    }

    try {
      await this.animalsService.addAnimalToCorral(createAnimalDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll(): Promise<any> {
    return this.animalsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.animalsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAnimalDto: CreateAnimalDto,
  ): Promise<any> {
    return this.animalsService.update(id, updateAnimalDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.animalsService.remove(id);
  }

  @Get(':id/summary')
  async getAnimalSummaryByCorral(@Param('id') id: number): Promise<any> {
    try {
      const animalSummary =
        await this.animalsService.getAnimalSummaryByCorral(id);
      return animalSummary;
    } catch (error) {
      throw new NotFoundException('Corral not found');
    }
  }

  @Get('average-age/:corralId')
  async getAverageAgeByCorral(
    @Param('corralId') corralId: number,
  ): Promise<number> {
    return this.animalsService.getAverageAgeByCorral(corralId);
  }
}
