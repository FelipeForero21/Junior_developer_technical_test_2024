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
exports.AnimalsController = void 0;
const common_1 = require("@nestjs/common");
const animals_service_1 = require("./animals.service");
const create_animal_dto_1 = require("./dto/create-animal.dto");
let AnimalsController = class AnimalsController {
    constructor(animalsService) {
        this.animalsService = animalsService;
    }
    async addAnimalToCorral(createAnimalDto) {
        if (isNaN(createAnimalDto.age) ||
            isNaN(createAnimalDto.quantity) ||
            isNaN(createAnimalDto.corralId)) {
            throw new common_1.BadRequestException('Invalid input: Age, Quantity, and Corral ID must be valid numbers.');
        }
        try {
            await this.animalsService.addAnimalToCorral(createAnimalDto);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findAll() {
        return this.animalsService.findAll();
    }
    async findOne(id) {
        return this.animalsService.findOne(id);
    }
    async update(id, updateAnimalDto) {
        return this.animalsService.update(id, updateAnimalDto);
    }
    async remove(id) {
        return this.animalsService.remove(id);
    }
    async getAnimalSummaryByCorral(id) {
        try {
            const animalSummary = await this.animalsService.getAnimalSummaryByCorral(id);
            return animalSummary;
        }
        catch (error) {
            throw new common_1.NotFoundException('Corral not found');
        }
    }
    async getAverageAgeByCorral(corralId) {
        return this.animalsService.getAverageAgeByCorral(corralId);
    }
};
exports.AnimalsController = AnimalsController;
__decorate([
    (0, common_1.Post)('add-to-corral'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_animal_dto_1.CreateAnimalDto]),
    __metadata("design:returntype", Promise)
], AnimalsController.prototype, "addAnimalToCorral", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnimalsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnimalsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_animal_dto_1.CreateAnimalDto]),
    __metadata("design:returntype", Promise)
], AnimalsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnimalsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/summary'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnimalsController.prototype, "getAnimalSummaryByCorral", null);
__decorate([
    (0, common_1.Get)('average-age/:corralId'),
    __param(0, (0, common_1.Param)('corralId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnimalsController.prototype, "getAverageAgeByCorral", null);
exports.AnimalsController = AnimalsController = __decorate([
    (0, common_1.Controller)('animals'),
    __metadata("design:paramtypes", [animals_service_1.AnimalsService])
], AnimalsController);
//# sourceMappingURL=animals.controller.js.map