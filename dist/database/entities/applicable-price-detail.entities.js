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
exports.ApplicablePriceDetail = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let ApplicablePriceDetail = class ApplicablePriceDetail {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ApplicablePriceDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ApplicablePriceDetail.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ApplicablePriceDetail.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], ApplicablePriceDetail.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Trip, (trip) => trip.applicablePriceDetails),
    (0, typeorm_1.JoinColumn)({ name: 'trip_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Trip)
], ApplicablePriceDetail.prototype, "trip", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.PriceDetail, (priceDetail) => priceDetail.applicablePriceDetails),
    (0, typeorm_1.JoinColumn)({ name: 'price_detail_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.PriceDetail)
], ApplicablePriceDetail.prototype, "priceDetail", void 0);
ApplicablePriceDetail = __decorate([
    (0, typeorm_1.Entity)({ name: 'applicable_price_detail' })
], ApplicablePriceDetail);
exports.ApplicablePriceDetail = ApplicablePriceDetail;
//# sourceMappingURL=applicable-price-detail.entities.js.map