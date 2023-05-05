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
exports.OrderRefund = void 0;
const _1 = require(".");
const typeorm_1 = require("typeorm");
let OrderRefund = class OrderRefund {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderRefund.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'varchar', length: 200, nullable: false }),
    __metadata("design:type", String)
], OrderRefund.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', type: 'text' }),
    __metadata("design:type", String)
], OrderRefund.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], OrderRefund.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total', type: 'double', nullable: true, default: 0.0 }),
    __metadata("design:type", Number)
], OrderRefund.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_code', type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], OrderRefund.prototype, "orderCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'customer_code',
        type: 'varchar',
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], OrderRefund.prototype, "customerCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'staff_code',
        type: 'varchar',
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], OrderRefund.prototype, "staffCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], OrderRefund.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], OrderRefund.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], OrderRefund.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], OrderRefund.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], OrderRefund.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => _1.Order, (order) => order.orderRefund),
    (0, typeorm_1.JoinColumn)({ name: 'order_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Order)
], OrderRefund.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.OrderRefundDetail, (orderRefundDetail) => orderRefundDetail.orderRefund),
    __metadata("design:type", Array)
], OrderRefund.prototype, "orderRefundDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.PromotionHistory, (promotionHistory) => promotionHistory.orderRefund),
    __metadata("design:type", Array)
], OrderRefund.prototype, "promotionHistories", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Customer, (customer) => customer.orderRefunds),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Customer)
], OrderRefund.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Staff, (staff) => staff.orderRefunds),
    (0, typeorm_1.JoinColumn)({ name: 'staff_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Staff)
], OrderRefund.prototype, "staff", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => _1.PaymentHistory, (paymentHistory) => paymentHistory.order),
    __metadata("design:type", _1.PaymentHistory)
], OrderRefund.prototype, "paymentHistory", void 0);
OrderRefund = __decorate([
    (0, typeorm_1.Entity)({ name: 'order_refund' })
], OrderRefund);
exports.OrderRefund = OrderRefund;
//# sourceMappingURL=order-refund.entities.js.map