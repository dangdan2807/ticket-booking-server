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
exports.PaymentHistory = void 0;
const typeorm_1 = require("typeorm");
const order_entities_1 = require("./order.entities");
const customer_entities_1 = require("./customer.entities");
const staff_entities_1 = require("./staff.entities");
const order_refund_entities_1 = require("./order-refund.entities");
let PaymentHistory = class PaymentHistory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PaymentHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], PaymentHistory.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', type: 'text' }),
    __metadata("design:type", String)
], PaymentHistory.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'amount', type: 'double', nullable: true, default: 0.0 }),
    __metadata("design:type", Number)
], PaymentHistory.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], PaymentHistory.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'order_code',
        type: 'varchar',
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], PaymentHistory.prototype, "orderCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'customer_code',
        type: 'varchar',
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], PaymentHistory.prototype, "customerCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'staff_code',
        type: 'varchar',
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], PaymentHistory.prototype, "staffCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'payment_method',
        type: 'varchar',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], PaymentHistory.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'trans_Id',
        type: 'varchar',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], PaymentHistory.prototype, "transId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'create_app_time', type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], PaymentHistory.prototype, "createAppTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'zalo_trans_Id',
        type: 'varchar',
        length: 100,
        nullable: true,
        default: '',
    }),
    __metadata("design:type", String)
], PaymentHistory.prototype, "zaloTransId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'zalo_trans_time', type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], PaymentHistory.prototype, "paymentTime", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], PaymentHistory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], PaymentHistory.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => order_entities_1.Order, (order) => order.paymentHistory),
    (0, typeorm_1.JoinColumn)({ name: 'order_id', referencedColumnName: 'id' }),
    __metadata("design:type", order_entities_1.Order)
], PaymentHistory.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entities_1.Customer, (customer) => customer.paymentHistories),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id', referencedColumnName: 'id' }),
    __metadata("design:type", customer_entities_1.Customer)
], PaymentHistory.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entities_1.Staff, (staff) => staff.paymentHistories),
    (0, typeorm_1.JoinColumn)({ name: 'staff_id', referencedColumnName: 'id' }),
    __metadata("design:type", staff_entities_1.Staff)
], PaymentHistory.prototype, "staff", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => order_refund_entities_1.OrderRefund, (orderRefund) => orderRefund.paymentHistory),
    (0, typeorm_1.JoinColumn)({ name: 'order_refund_id', referencedColumnName: 'id' }),
    __metadata("design:type", order_refund_entities_1.OrderRefund)
], PaymentHistory.prototype, "orderRefund", void 0);
PaymentHistory = __decorate([
    (0, typeorm_1.Entity)({ name: 'payment_history' })
], PaymentHistory);
exports.PaymentHistory = PaymentHistory;
//# sourceMappingURL=payment-history.entities.js.map