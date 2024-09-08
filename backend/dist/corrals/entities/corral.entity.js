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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Corral = void 0;
const typeorm_1 = require("typeorm");
const animal_entity_1 = require("../../animals/entities/animal.entity");
let Corral = class Corral {
};
exports.Corral = Corral;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Corral.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Corral.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Corral.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Corral.prototype, "isHighRisk", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => animal_entity_1.Animal, (animal) => animal.corral),
    __metadata("design:type", Array)
], Corral.prototype, "animals", void 0);
exports.Corral = Corral = __decorate([
    (0, typeorm_1.Entity)()
], Corral);
//# sourceMappingURL=corral.entity.js.map