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
exports.TripDetail = void 0;
const _1 = require(".");
const typeorm_1 = require("typeorm");
let TripDetail = class TripDetail {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TripDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], TripDetail.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'departure_time', type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], TripDetail.prototype, "departureTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expected_time', type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], TripDetail.prototype, "expectedTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], TripDetail.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], TripDetail.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], TripDetail.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], TripDetail.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], TripDetail.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], TripDetail.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Trip, (trip) => trip.tripDetails),
    (0, typeorm_1.JoinColumn)({ name: 'trip_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Trip)
], TripDetail.prototype, "trip", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Vehicle, (vehicle) => vehicle.tripDetails),
    (0, typeorm_1.JoinColumn)({ name: 'vehicle_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Vehicle)
], TripDetail.prototype, "vehicle", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Province, (province) => province.fromTripDetails),
    (0, typeorm_1.JoinColumn)({ name: 'from_province_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Province)
], TripDetail.prototype, "fromProvince", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Province, (province) => province.toTripDetails),
    (0, typeorm_1.JoinColumn)({ name: 'to_province_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Province)
], TripDetail.prototype, "toProvince", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Ticket, (ticket) => ticket.tripDetail),
    __metadata("design:type", Array)
], TripDetail.prototype, "tickets", void 0);
TripDetail = __decorate([
    (0, typeorm_1.Entity)({ name: 'trip_detail' })
], TripDetail);
exports.TripDetail = TripDetail;
//# sourceMappingURL=trip-detail.entities.js.map