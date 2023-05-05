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
exports.Ticket = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Ticket = class Ticket {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Ticket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], Ticket.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', type: 'text' }),
    __metadata("design:type", String)
], Ticket.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], Ticket.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'trip_detail_code',
        type: 'varchar',
        nullable: true,
        length: 100,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "tripDetailCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], Ticket.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.TicketDetail, (ticketDetail) => ticketDetail.ticket),
    __metadata("design:type", Array)
], Ticket.prototype, "ticketDetails", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => _1.TripDetail, (tripDetail) => tripDetail.tickets),
    (0, typeorm_1.JoinColumn)({ name: 'trip_detail_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.TripDetail)
], Ticket.prototype, "tripDetail", void 0);
Ticket = __decorate([
    (0, typeorm_1.Entity)({ name: 'ticket' })
], Ticket);
exports.Ticket = Ticket;
//# sourceMappingURL=ticket.entities.js.map