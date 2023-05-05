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
exports.PromotionLine = void 0;
const enums_1 = require("./../../enums");
const typeorm_1 = require("typeorm");
const _1 = require(".");
let PromotionLine = class PromotionLine {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PromotionLine.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], PromotionLine.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'coupon_code',
        type: 'varchar',
        length: 20,
        nullable: false,
    }),
    __metadata("design:type", String)
], PromotionLine.prototype, "couponCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title', type: 'varchar', length: 200, nullable: false }),
    __metadata("design:type", String)
], PromotionLine.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'text' }),
    __metadata("design:type", String)
], PromotionLine.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', type: 'text' }),
    __metadata("design:type", String)
], PromotionLine.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], PromotionLine.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], PromotionLine.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type', type: 'varchar', length: 200, nullable: false }),
    __metadata("design:type", String)
], PromotionLine.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'use_budget', type: 'double', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], PromotionLine.prototype, "useBudget", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_budget', type: 'double', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], PromotionLine.prototype, "maxBudget", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'use_quantity', type: 'double', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], PromotionLine.prototype, "useQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_quantity', type: 'int', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], PromotionLine.prototype, "maxQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'apply_all',
        type: 'boolean',
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], PromotionLine.prototype, "applyAll", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PromotionLine.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PromotionLine.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], PromotionLine.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], PromotionLine.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], PromotionLine.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => _1.PromotionDetail, (promotionDetail) => promotionDetail.promotionLine),
    __metadata("design:type", _1.PromotionDetail)
], PromotionLine.prototype, "promotionDetail", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.PromotionHistory, (promotionHistory) => promotionHistory.promotionLine),
    __metadata("design:type", Array)
], PromotionLine.prototype, "promotionHistory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Promotion, (promotion) => promotion.promotionLines),
    (0, typeorm_1.JoinColumn)({ name: 'promotion_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Promotion)
], PromotionLine.prototype, "promotion", void 0);
PromotionLine = __decorate([
    (0, typeorm_1.Entity)({ name: 'promotion_line' })
], PromotionLine);
exports.PromotionLine = PromotionLine;
//# sourceMappingURL=promotion-line.entities.js.map