"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const animal_entity_1 = require("./entities/animal.entity");
const corral_entity_1 = require("../corrals/entities/corral.entity");
let AnimalsService = class AnimalsService {
    constructor(animalsRepository, corralsRepository) {
        this.animalsRepository = animalsRepository;
        this.corralsRepository = corralsRepository;
    }
    async addAnimalToCorral(createAnimalDto) {
        if (isNaN(createAnimalDto.age) ||
            isNaN(createAnimalDto.quantity) ||
            isNaN(createAnimalDto.corralId)) {
            throw new common_1.BadRequestException('Invalid input: Age, Quantity, and Corral ID must be valid numbers.');
        }
        const corral = await this.corralsRepository.findOne({
            where: { id: createAnimalDto.corralId },
            relations: ['animals'],
        });
        if (!corral) {
            throw new common_1.BadRequestException('Corral not found');
        }
        if (corral.isHighRisk !== createAnimalDto.isHighRisk) {
            throw new common_1.BadRequestException(`The animal's risk status (${createAnimalDto.isHighRisk ? 'High Risk' : 'No Risk'}) does not match the corral's risk status (${corral.isHighRisk ? 'High Risk' : 'No Risk'}).`);
        }
        const currentAnimalCount = corral.animals.length;
        const newAnimalCount = currentAnimalCount + createAnimalDto.quantity;
        if (newAnimalCount > corral.capacity) {
            throw new common_1.BadRequestException('Corral capacity exceeded');
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
    }
    async remove(id) {
        const animal = await this.animalsRepository.findOne({
            where: { id },
            relations: ['corral'],
        });
        if (!animal) {
            throw new common_1.BadRequestException('Animal not found');
        }
        const corral = animal.corral;
        await this.animalsRepository.delete(id);
        corral.capacity += 1;
        await this.corralsRepository.save(corral);
    }
    async findAll() {
        return this.animalsRepository.find({ relations: ['corral'] });
    }
    async findOne(id) {
        const animal = await this.animalsRepository.findOne({
            where: { id },
            relations: ['corral'],
        });
        if (!animal) {
            throw new common_1.BadRequestException('Animal not found');
        }
        return animal;
    }
    async update(id, updateAnimalDto) {
        const animal = await this.findOne(id);
        if (!animal) {
            throw new common_1.BadRequestException('Animal not found');
        }
        Object.assign(animal, updateAnimalDto);
        return this.animalsRepository.save(animal);
    }
    async getAnimalSummaryByCorral(corralId) {
        const corral = await this.corralsRepository.findOne({
            where: { id: corralId },
            relations: ['animals'],
        });
        if (!corral) {
            throw new Error('Corral not found');
        }
        return {
            corralId: corral.id,
            corralName: corral.name,
            animals: corral.animals.map((animal) => ({
                name: animal.name,
                age: animal.age,
                isHighRisk: animal.isHighRisk,
            })),
        };
    }
    async getAverageAgeByCorral(corralId) {
        const corral = await this.corralsRepository.findOne({
            where: { id: corralId },
            relations: ['animals'],
        });
        if (!corral) {
            throw new common_1.BadRequestException('Corral not found');
        }
        if (corral.animals.length === 0) {
            throw new common_1.BadRequestException('Corral has no animals');
        }
        const totalAge = corral.animals.reduce((sum, animal) => sum + animal.age, 0);
        return totalAge / corral.animals.length;
    }
};
exports.AnimalsService = AnimalsService;
exports.AnimalsService = AnimalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(animal_entity_1.Animal)),
    __param(1, (0, typeorm_1.InjectRepository)(corral_entity_1.Corral)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AnimalsService);
//# sourceMappingURL=animals.service.js.map