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
exports.TicketGroupDetail = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let TicketGroupDetail = class TicketGroupDetail {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TicketGroupDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], TicketGroupDetail.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], TicketGroupDetail.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], TicketGroupDetail.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.TicketGroup, (ticketGroup) => ticketGroup.ticketGroupDetail),
    (0, typeorm_1.JoinColumn)([{ name: 'ticket_group_id', referencedColumnName: 'id' }]),
    __metadata("design:type", _1.TicketGroup)
], TicketGroupDetail.prototype, "ticketGroup", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Ticket, (ticket) => ticket.ticketGroupDetails),
    (0, typeorm_1.JoinColumn)([{ name: 'ticket_id', referencedColumnName: 'id' }]),
    __metadata("design:type", _1.Ticket)
], TicketGroupDetail.prototype, "ticket", void 0);
TicketGroupDetail = __decorate([
    (0, typeorm_1.Entity)({ name: 'ticket_group-detail' })
], TicketGroupDetail);
exports.TicketGroupDetail = TicketGroupDetail;
//# sourceMappingURL=ticket-group-detail.entities.js.map