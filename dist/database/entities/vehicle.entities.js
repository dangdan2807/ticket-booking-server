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
exports.Vehicle = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Vehicle = class Vehicle {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Vehicle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], Vehicle.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'text' }),
    __metadata("design:type", String)
], Vehicle.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'license_plate',
        type: 'varchar',
        length: 20,
        nullable: true,
        unique: true,
    }),
    __metadata("design:type", String)
], Vehicle.prototype, "licensePlate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'floor_number', type: 'int', nullable: true, default: 1 }),
    __metadata("design:type", Number)
], Vehicle.prototype, "floorNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_seat', type: 'int', nullable: true, default: 1 }),
    __metadata("design:type", Number)
], Vehicle.prototype, "totalSeat", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Vehicle.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Vehicle.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], Vehicle.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Seat, (seat) => seat.vehicle),
    __metadata("design:type", Array)
], Vehicle.prototype, "seats", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.TripDetail, (tripDetail) => tripDetail.vehicle),
    __metadata("design:type", Array)
], Vehicle.prototype, "tripDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.ImageResource, (imageResource) => imageResource.vehicle),
    __metadata("design:type", Array)
], Vehicle.prototype, "images", void 0);
Vehicle = __decorate([
    (0, typeorm_1.Entity)({ name: 'vehicle' })
], Vehicle);
exports.Vehicle = Vehicle;
//# sourceMappingURL=vehicle.entities.js.map