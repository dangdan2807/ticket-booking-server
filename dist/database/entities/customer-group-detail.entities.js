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
exports.CustomerGroupDetail = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let CustomerGroupDetail = class CustomerGroupDetail {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CustomerGroupDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], CustomerGroupDetail.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], CustomerGroupDetail.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], CustomerGroupDetail.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Customer, (customer) => customer.customerGroupDetail),
    (0, typeorm_1.JoinColumn)([{ name: 'customer_id', referencedColumnName: 'id' }]),
    __metadata("design:type", _1.Customer)
], CustomerGroupDetail.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.CustomerGroup, (customerGroup) => customerGroup.customerGroupDetail),
    (0, typeorm_1.JoinColumn)([{ name: 'customer_group_id', referencedColumnName: 'id' }]),
    __metadata("design:type", _1.CustomerGroup)
], CustomerGroupDetail.prototype, "customerGroup", void 0);
CustomerGroupDetail = __decorate([
    (0, typeorm_1.Entity)({ name: 'customer_group_detail' })
], CustomerGroupDetail);
exports.CustomerGroupDetail = CustomerGroupDetail;
//# sourceMappingURL=customer-group-detail.entities.js.map