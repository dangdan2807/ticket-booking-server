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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const payment_history_entities_1 = require("./payment-history.entities");
let Order = class Order {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], Order.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', type: 'text' }),
    __metadata("design:type", String)
], Order.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total', type: 'double', nullable: true, default: 0.0 }),
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'final_total', type: 'double', nullable: true, default: 0.0 }),
    __metadata("design:type", Number)
], Order.prototype, "finalTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'payment_method',
        type: 'varchar',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], Order.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Order.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Customer, (customer) => customer.orders),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Customer)
], Order.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Staff, (staff) => staff.orders),
    (0, typeorm_1.JoinColumn)({ name: 'staff_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Staff)
], Order.prototype, "staff", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.OrderDetail, (orderDetail) => orderDetail.order),
    __metadata("design:type", Array)
], Order.prototype, "orderDetails", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => _1.OrderRefund, (orderRefund) => orderRefund.order),
    __metadata("design:type", _1.OrderRefund)
], Order.prototype, "orderRefund", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.PromotionHistory, (promotionHistory) => promotionHistory.order),
    __metadata("design:type", Array)
], Order.prototype, "promotionHistories", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => payment_history_entities_1.PaymentHistory, (paymentHistory) => paymentHistory.order),
    __metadata("design:type", payment_history_entities_1.PaymentHistory)
], Order.prototype, "paymentHistory", void 0);
Order = __decorate([
    (0, typeorm_1.Entity)({ name: 'order' })
], Order);
exports.Order = Order;
//# sourceMappingURL=order.entities.js.map