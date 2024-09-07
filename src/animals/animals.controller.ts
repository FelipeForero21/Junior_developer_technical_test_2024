import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  async create(@Body() createAnimalDto: CreateAnimalDto): Promise<any> {
    return this.animalsService.create(createAnimalDto);
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
  async update(@Param('id') id: number, @Body() updateAnimalDto: CreateAnimalDto): Promise<any> {
    return this.animalsService.update(id, updateAnimalDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.animalsService.remove(id);
  }

  @Post('add-to-corral')
  async addAnimalToCorral(@Body() createAnimalDto: CreateAnimalDto): Promise<void> {
    await this.animalsService.addAnimalToCorral(createAnimalDto);
  }
  

  @Get('summary-by-corral')
  async getSummaryByCorral(): Promise<any> {
    return this.animalsService.getAnimalSummaryByCorral();
  }

  @Get('average-age/:corralId')
  async getAverageAgeByCorral(@Param('corralId') corralId: number): Promise<number> {
      return this.animalsService.getAverageAgeByCorral(corralId);
  }
}