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
exports.Customer = void 0;
const enums_1 = require("./../../enums");
const typeorm_1 = require("typeorm");
const _1 = require(".");
const typeorm_2 = require("typeorm");
let Customer = class Customer {
};
__decorate([
    (0, typeorm_2.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Customer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password', type: 'varchar', default: null, nullable: false }),
    __metadata("design:type", String)
], Customer.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_login', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Customer.prototype, "lastLogin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'code',
        type: 'varchar',
        nullable: false,
        length: 100,
    }),
    __metadata("design:type", String)
], Customer.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'varchar',
        length: 100,
        default: enums_1.UserStatusEnum.INACTIVATE,
        nullable: false,
    }),
    __metadata("design:type", String)
], Customer.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name', type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Customer.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gender', type: 'varchar', default: 'N', nullable: false }),
    __metadata("design:type", String)
], Customer.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_address', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "fullAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note_status', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "noteStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'birthday', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Customer.prototype, "birthday", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'otp_code', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "otpCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'otp_expired', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Customer.prototype, "otpExpired", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'refresh_token', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'access_token', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "accessToken", void 0);
__decorate([
    (0, typeorm_2.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Customer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_2.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', select: false }),
    __metadata("design:type", Date)
], Customer.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_2.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], Customer.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Ward, (ward) => ward.customers),
    (0, typeorm_1.JoinColumn)({ name: 'ward_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Ward)
], Customer.prototype, "ward", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.CustomerGroup, (customerGroup) => customerGroup.customers),
    __metadata("design:type", _1.CustomerGroup)
], Customer.prototype, "customerGroup", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Order, (order) => order.customer),
    __metadata("design:type", Array)
], Customer.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.OrderRefund, (order) => order.customer),
    __metadata("design:type", Array)
], Customer.prototype, "orderRefunds", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.PaymentHistory, (paymentHistory) => paymentHistory.customer),
    __metadata("design:type", Array)
], Customer.prototype, "paymentHistories", void 0);
Customer = __decorate([
    (0, typeorm_1.Entity)({ name: 'customer' })
], Customer);
exports.Customer = Customer;
//# sourceMappingURL=customer.entities.js.map