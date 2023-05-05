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
exports.Trip = void 0;
const enums_1 = require("./../../enums");
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Trip = class Trip {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Trip.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], Trip.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Trip.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', type: 'text' }),
    __metadata("design:type", String)
], Trip.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], Trip.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Trip.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'varchar', length: 100, default: false }),
    __metadata("design:type", String)
], Trip.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Trip.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Trip.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], Trip.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Trip.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], Trip.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Station, (station) => station.fromTrips),
    (0, typeorm_1.JoinColumn)({ name: 'from_station_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Station)
], Trip.prototype, "fromStation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Station, (station) => station.toTrips),
    (0, typeorm_1.JoinColumn)({ name: 'to_station_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Station)
], Trip.prototype, "toStation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.TripDetail, (tripDetail) => tripDetail.trip),
    __metadata("design:type", Array)
], Trip.prototype, "tripDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.PromotionDetail, (promotionDetail) => promotionDetail.trip),
    __metadata("design:type", Array)
], Trip.prototype, "promotionDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.PriceDetail, (priceDetail) => priceDetail.trip),
    __metadata("design:type", Array)
], Trip.prototype, "priceDetails", void 0);
Trip = __decorate([
    (0, typeorm_1.Entity)({ name: 'trip' })
], Trip);
exports.Trip = Trip;
//# sourceMappingURL=trip.entities.js.map