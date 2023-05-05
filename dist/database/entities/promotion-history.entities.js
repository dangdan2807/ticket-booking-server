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
exports.PromotionHistory = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let PromotionHistory = class PromotionHistory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PromotionHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'amount', type: 'double', nullable: false, default: 0.0 }),
    __metadata("design:type", Number)
], PromotionHistory.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', type: 'text' }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantity', type: 'int', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], PromotionHistory.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type', type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'promotion_line_code',
        type: 'varchar',
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "promotionLineCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'order_code',
        type: 'varchar',
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], PromotionHistory.prototype, "orderCode", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], PromotionHistory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], PromotionHistory.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], PromotionHistory.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Order, (order) => order.promotionHistories),
    (0, typeorm_1.JoinColumn)({ name: 'order_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Order)
], PromotionHistory.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.OrderRefund, (orderRefund) => orderRefund.promotionHistories),
    (0, typeorm_1.JoinColumn)({ name: 'order_refund_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.OrderRefund)
], PromotionHistory.prototype, "orderRefund", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.PromotionLine, (promotionLine) => promotionLine.promotionHistory),
    (0, typeorm_1.JoinColumn)({ name: 'promotion_line_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.PromotionLine)
], PromotionHistory.prototype, "promotionLine", void 0);
PromotionHistory = __decorate([
    (0, typeorm_1.Entity)({ name: 'promotion_history' })
], PromotionHistory);
exports.PromotionHistory = PromotionHistory;
//# sourceMappingURL=promotion-history.entities.js.map