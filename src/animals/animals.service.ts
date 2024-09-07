import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { Corral } from 'src/corrals/entities/corral.entity';
@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalsRepository: Repository<Animal>,
    @InjectRepository(Corral)
    private readonly corralsRepository: Repository<Corral>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal[]> {
    if (
      isNaN(createAnimalDto.age) ||
      isNaN(createAnimalDto.quantity) ||
      isNaN(createAnimalDto.corralId)
    ) {
      throw new BadRequestException(
        'Invalid input: Age, Quantity, and Corral ID must be valid numbers.',
      );
    }
  
    const corral = await this.corralsRepository.findOne({
      where: { id: createAnimalDto.corralId },
      relations: ['animals'],
    });
  
    if (!corral) {
      throw new BadRequestException('Corral not found');
    }
  
    const currentAnimalCount = corral.animals.length;
    if (currentAnimalCount + createAnimalDto.quantity > corral.capacity) {
      throw new BadRequestException('Corral capacity exceeded');
    }
  
    // Crear nuevos animales
    const animals: Animal[] = [];
    for (let i = 0; i < createAnimalDto.quantity; i++) {
      const animal = this.animalsRepository.create({
        name: createAnimalDto.name,
        age: createAnimalDto.age,
        isHighRisk: createAnimalDto.isHighRisk,
        corral: corral, 
        restrictedAnimals: createAnimalDto.restrictedAnimals
          ? await this.animalsRepository.findByIds(createAnimalDto.restrictedAnimals)
          : [],      
      });
      animals.push(animal);
    }
  
    const savedAnimals = await this.animalsRepository.save(animals);
  
    corral.capacity -= createAnimalDto.quantity;
  
    return this.animalsRepository.find({
      where: { id: In(savedAnimals.map(animal => animal.id)) },
      relations: ['corral'],
    });
  }
  async addAnimalToCorral(createAnimalDto: CreateAnimalDto): Promise<void> {
    if (
      isNaN(createAnimalDto.age) ||
      isNaN(createAnimalDto.quantity) ||
      isNaN(createAnimalDto.corralId)
    ) {
      throw new BadRequestException(
        'Invalid input: Age, Quantity, and Corral ID must be valid numbers.',
      );
    }

    const corral = await this.corralsRepository.findOne({
      where: { id: createAnimalDto.corralId },
      relations: ['animals'],
    });

    if (!corral) {
      throw new BadRequestException('Corral not found');
    }

    const currentAnimalCount = corral.animals.length;
    if (currentAnimalCount + createAnimalDto.quantity > corral.capacity) {
      throw new BadRequestException('Corral capacity exceeded');
    }

    for (let i = 0; i < createAnimalDto.quantity; i++) {
      const newAnimal = this.animalsRepository.create({
        name: createAnimalDto.name,
        age: createAnimalDto.age,
        isHighRisk: createAnimalDto.isHighRisk,
        corral: corral,
      });
      await this.animalsRepository.save(newAnimal);
    }

    corral.capacity -= createAnimalDto.quantity;
    await this.corralsRepository.save(corral);
  }

  async remove(id: number): Promise<void> {
    const animal = await this.animalsRepository.findOne({
      where: { id },
      relations: ['corral'],
    });

    if (!animal) {
      throw new BadRequestException('Animal not found');
    }

    const corral = animal.corral;
    await this.animalsRepository.delete(id);

    corral.capacity += 1;
    await this.corralsRepository.save(corral);
  }

  async findAll(): Promise<Animal[]> {
    return this.animalsRepository.find({ relations: ['corral'] });
  }

  async findOne(id: number): Promise<Animal> {
    const animal = await this.animalsRepository.findOne({
      where: { id },
      relations: ['corral'],
    });
    if (!animal) {
      throw new BadRequestException('Animal not found');
    }
    return animal;
  }

  async update(id: number, updateAnimalDto: CreateAnimalDto): Promise<Animal> {
    const animal = await this.findOne(id);
    if (!animal) {
      throw new BadRequestException('Animal not found');
    }
    Object.assign(animal, updateAnimalDto);
    return this.animalsRepository.save(animal);
  }

  async getAnimalSummaryByCorral(): Promise<any> {
    const corrals = await this.corralsRepository.find({
      relations: ['animals'],
    });
    return corrals.map((corral) => ({
      corralId: corral.id,
      corralName: corral.name,
      animals: corral.animals.map((animal) => ({
        name: animal.name,
        age: animal.age,
        isHighRisk: animal.isHighRisk,
      })),
    }));
  }

  async getAverageAgeByCorral(corralId: number): Promise<number> {
    const corral = await this.corralsRepository.findOne({
      where: { id: corralId },
      relations: ['animals'],
    });

    if (!corral) {
      throw new BadRequestException('Corral not found');
    }

    if (corral.animals.length === 0) {
      throw new BadRequestException('Corral has no animals');
    }

    const totalAge = corral.animals.reduce(
      (sum, animal) => sum + animal.age,
      0,
    );

    return totalAge / corral.animals.length;
  }
}
