import { Corral } from 'src/corrals/entities/corral.entity';
export declare class Animal {
    id: number;
    name: string;
    age: number;
    isHighRisk?: boolean;
    corral: Corral;
    restrictedAnimals: Animal[];
}
