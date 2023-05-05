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
exports.TicketDetail = void 0;
const enums_1 = require("./../../enums");
const _1 = require(".");
const typeorm_1 = require("typeorm");
let TicketDetail = class TicketDetail {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TicketDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], TicketDetail.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'varchar',
        length: 100,
        nullable: false,
        default: enums_1.TicketStatusEnum.NON_SOLD,
    }),
    __metadata("design:type", String)
], TicketDetail.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', type: 'text' }),
    __metadata("design:type", String)
], TicketDetail.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], TicketDetail.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], TicketDetail.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], TicketDetail.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Ticket, (ticket) => ticket.ticketDetails),
    (0, typeorm_1.JoinColumn)({ name: 'ticket_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Ticket)
], TicketDetail.prototype, "ticket", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Seat, (seat) => seat.ticketDetails),
    (0, typeorm_1.JoinColumn)({ name: 'seat_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Seat)
], TicketDetail.prototype, "seat", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.OrderDetail, (orderDetail) => orderDetail.ticketDetail),
    __metadata("design:type", Array)
], TicketDetail.prototype, "orderDetails", void 0);
TicketDetail = __decorate([
    (0, typeorm_1.Entity)({ name: 'ticket_detail' })
], TicketDetail);
exports.TicketDetail = TicketDetail;
//# sourceMappingURL=ticket-detail.entities.js.map