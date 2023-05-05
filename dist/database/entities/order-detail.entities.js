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
exports.OrderDetail = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let OrderDetail = class OrderDetail {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total', type: 'double', nullable: true, default: 0.0 }),
    __metadata("design:type", Number)
], OrderDetail.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', type: 'text' }),
    __metadata("design:type", String)
], OrderDetail.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'order_code',
        type: 'varchar',
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], OrderDetail.prototype, "orderCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], OrderDetail.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], OrderDetail.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], OrderDetail.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], OrderDetail.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], OrderDetail.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Order, (order) => order.orderDetails),
    (0, typeorm_1.JoinColumn)({ name: 'order_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Order)
], OrderDetail.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.PriceDetail, (priceDetail) => priceDetail.orderDetails),
    (0, typeorm_1.JoinColumn)({ name: 'price_detail_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.PriceDetail)
], OrderDetail.prototype, "priceDetail", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.TicketDetail, (ticketDetail) => ticketDetail.orderDetails),
    (0, typeorm_1.JoinColumn)({ name: 'ticket_detail_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.TicketDetail)
], OrderDetail.prototype, "ticketDetail", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => _1.OrderRefundDetail, (orderDetailRefund) => orderDetailRefund.orderDetail),
    __metadata("design:type", _1.OrderRefundDetail)
], OrderDetail.prototype, "orderRefundDetail", void 0);
OrderDetail = __decorate([
    (0, typeorm_1.Entity)({ name: 'order_detail' })
], OrderDetail);
exports.OrderDetail = OrderDetail;
//# sourceMappingURL=order-detail.entities.js.map