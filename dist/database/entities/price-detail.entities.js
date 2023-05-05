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
exports.PriceDetail = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("./../../enums");
const _1 = require(".");
let PriceDetail = class PriceDetail {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PriceDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], PriceDetail.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'price', type: 'double', nullable: false, default: 0.0 }),
    __metadata("design:type", Number)
], PriceDetail.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'seat_type', type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], PriceDetail.prototype, "seatType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', type: 'text' }),
    __metadata("design:type", String)
], PriceDetail.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'price_list_code',
        type: 'varchar',
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], PriceDetail.prototype, "priceListCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], PriceDetail.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PriceDetail.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], PriceDetail.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], PriceDetail.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], PriceDetail.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.PriceList, (priceList) => priceList.priceDetails),
    (0, typeorm_1.JoinColumn)({ name: 'price_list_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.PriceList)
], PriceDetail.prototype, "priceList", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.OrderDetail, (orderDetail) => orderDetail.priceDetail),
    __metadata("design:type", Array)
], PriceDetail.prototype, "orderDetails", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Trip, (trip) => trip.priceDetails),
    (0, typeorm_1.JoinColumn)({ name: 'trip_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Trip)
], PriceDetail.prototype, "trip", void 0);
PriceDetail = __decorate([
    (0, typeorm_1.Entity)({ name: 'price_detail' })
], PriceDetail);
exports.PriceDetail = PriceDetail;
//# sourceMappingURL=price-detail.entities.js.map