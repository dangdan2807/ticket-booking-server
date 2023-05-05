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
exports.TicketGroup = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let TicketGroup = class TicketGroup {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TicketGroup.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], TicketGroup.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], TicketGroup.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'text' }),
    __metadata("design:type", String)
], TicketGroup.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', type: 'text' }),
    __metadata("design:type", String)
], TicketGroup.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], TicketGroup.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], TicketGroup.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], TicketGroup.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], TicketGroup.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], TicketGroup.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.PromotionDetail, (promotionDetail) => promotionDetail.ticketGroup),
    __metadata("design:type", Array)
], TicketGroup.prototype, "promotionDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Ticket, (ticket) => ticket.ticketGroup),
    __metadata("design:type", Array)
], TicketGroup.prototype, "tickets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Trip, (trip) => trip.ticketGroup),
    __metadata("design:type", Array)
], TicketGroup.prototype, "trips", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.PriceDetail, (priceDetail) => priceDetail.ticketGroup),
    __metadata("design:type", Array)
], TicketGroup.prototype, "priceDetail", void 0);
TicketGroup = __decorate([
    (0, typeorm_1.Entity)({ name: 'ticket_group' })
], TicketGroup);
exports.TicketGroup = TicketGroup;
//# sourceMappingURL=ticket-group.entities.js.map