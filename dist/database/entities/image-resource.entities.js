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
exports.ImageResource = void 0;
const entities_1 = require("./../../database/entities");
const typeorm_1 = require("typeorm");
let ImageResource = class ImageResource {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ImageResource.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'url', type: 'text', nullable: false }),
    __metadata("design:type", String)
], ImageResource.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ImageResource.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ImageResource.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ImageResource.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true,
    }),
    __metadata("design:type", Date)
], ImageResource.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
    }),
    __metadata("design:type", Date)
], ImageResource.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.Vehicle, (vehicle) => vehicle.images),
    (0, typeorm_1.JoinColumn)({ name: 'vehicle_id', referencedColumnName: 'id' }),
    __metadata("design:type", entities_1.Vehicle)
], ImageResource.prototype, "vehicle", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.Station, (station) => station.images),
    (0, typeorm_1.JoinColumn)({ name: 'station_id', referencedColumnName: 'id' }),
    __metadata("design:type", entities_1.Station)
], ImageResource.prototype, "station", void 0);
ImageResource = __decorate([
    (0, typeorm_1.Entity)({ name: 'image_resource' })
], ImageResource);
exports.ImageResource = ImageResource;
//# sourceMappingURL=image-resource.entities.js.map