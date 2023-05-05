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
exports.PromotionDetail = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let PromotionDetail = class PromotionDetail {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PromotionDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantity_buy', type: 'int', nullable: false }),
    __metadata("design:type", Number)
], PromotionDetail.prototype, "quantityBuy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'purchase_amount', type: 'double', nullable: true }),
    __metadata("design:type", Number)
], PromotionDetail.prototype, "purchaseAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reduction_amount', type: 'double', nullable: true }),
    __metadata("design:type", Number)
], PromotionDetail.prototype, "reductionAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'percent_discount', type: 'double', nullable: true }),
    __metadata("design:type", Number)
], PromotionDetail.prototype, "percentDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'maximum_reduction_amount', type: 'double', nullable: true }),
    __metadata("design:type", Number)
], PromotionDetail.prototype, "maxReductionAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'promotion_line_code', type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], PromotionDetail.prototype, "promotionLineCode", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], PromotionDetail.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], PromotionDetail.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], PromotionDetail.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => _1.PromotionLine, (promotionLine) => promotionLine.promotionDetail),
    (0, typeorm_1.JoinColumn)({ name: 'promotion_line_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.PromotionLine)
], PromotionDetail.prototype, "promotionLine", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Trip, (trip) => trip.promotionDetails),
    (0, typeorm_1.JoinColumn)({ name: 'trip_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Trip)
], PromotionDetail.prototype, "trip", void 0);
PromotionDetail = __decorate([
    (0, typeorm_1.Entity)({ name: 'promotion_detail' })
], PromotionDetail);
exports.PromotionDetail = PromotionDetail;
//# sourceMappingURL=promotion-detail.entities.js.map