import { Animal } from 'src/animals/entities/animal.entity';
export declare class Corral {
    id: number;
    name: string;
    capacity: number;
    isHighRisk: boolean;
    animals: Animal[];
}
