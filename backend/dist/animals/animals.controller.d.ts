import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
export declare class AnimalsController {
    private readonly animalsService;
    constructor(animalsService: AnimalsService);
    addAnimalToCorral(createAnimalDto: CreateAnimalDto): Promise<void>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateAnimalDto: CreateAnimalDto): Promise<any>;
    remove(id: number): Promise<void>;
    getAnimalSummaryByCorral(id: number): Promise<any>;
    getAverageAgeByCorral(corralId: number): Promise<number>;
}
