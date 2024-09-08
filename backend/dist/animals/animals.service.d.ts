import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { Corral } from 'src/corrals/entities/corral.entity';
export declare class AnimalsService {
    private readonly animalsRepository;
    private readonly corralsRepository;
    constructor(animalsRepository: Repository<Animal>, corralsRepository: Repository<Corral>);
    addAnimalToCorral(createAnimalDto: CreateAnimalDto): Promise<void>;
    remove(id: number): Promise<void>;
    findAll(): Promise<Animal[]>;
    findOne(id: number): Promise<Animal>;
    update(id: number, updateAnimalDto: CreateAnimalDto): Promise<Animal>;
    getAnimalSummaryByCorral(corralId: number): Promise<any>;
    getAverageAgeByCorral(corralId: number): Promise<number>;
}
