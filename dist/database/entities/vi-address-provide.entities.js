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
exports.Province = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Province = class Province {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Province.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Province.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Province.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'int', nullable: true, unique: true }),
    __metadata("design:type", Number)
], Province.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'codename',
        type: 'varchar',
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], Province.prototype, "codename", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Province.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Province.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Province.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Province.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], Province.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.District, (district) => district.province),
    __metadata("design:type", Array)
], Province.prototype, "districts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.TripDetail, (tripDetail) => tripDetail.fromProvince),
    __metadata("design:type", Array)
], Province.prototype, "fromTripDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.TripDetail, (tripDetail) => tripDetail.toProvince),
    __metadata("design:type", Array)
], Province.prototype, "toTripDetails", void 0);
Province = __decorate([
    (0, typeorm_1.Entity)({ name: 'vi_address_provide' })
], Province);
exports.Province = Province;
//# sourceMappingURL=vi-address-provide.entities.js.map