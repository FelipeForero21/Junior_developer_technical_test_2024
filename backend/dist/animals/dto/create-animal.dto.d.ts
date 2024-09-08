import { Animal } from '../entities/animal.entity';
export declare class CreateAnimalDto {
    name: string;
    age: number;
    quantity: number;
    corralId: number;
    restrictedAnimals?: Animal[];
    isHighRisk?: boolean;
}
