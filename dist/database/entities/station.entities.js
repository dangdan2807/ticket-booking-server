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
exports.Station = void 0;
const _1 = require(".");
const typeorm_1 = require("typeorm");
let Station = class Station {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Station.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Station.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address', type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Station.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_address', type: 'text' }),
    __metadata("design:type", String)
], Station.prototype, "fullAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'varchar', length: 10, nullable: false }),
    __metadata("design:type", String)
], Station.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Station.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Station.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], Station.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Station.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], Station.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Ward, (ward) => ward.stations),
    (0, typeorm_1.JoinColumn)({ name: 'ward_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Ward)
], Station.prototype, "ward", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Trip, (trip) => trip.fromStation),
    __metadata("design:type", Array)
], Station.prototype, "fromTrips", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Trip, (trip) => trip.toStation),
    __metadata("design:type", Array)
], Station.prototype, "toTrips", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.ImageResource, (imageResource) => imageResource.station),
    __metadata("design:type", Array)
], Station.prototype, "images", void 0);
Station = __decorate([
    (0, typeorm_1.Entity)({ name: 'station' })
], Station);
exports.Station = Station;
//# sourceMappingURL=station.entities.js.map