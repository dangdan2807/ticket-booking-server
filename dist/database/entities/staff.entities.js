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
exports.Staff = void 0;
const enums_1 = require("./../../enums");
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Staff = class Staff {
    constructor() {
        this.lastLogin = null;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Staff.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password', type: 'varchar', default: null, nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'last_login',
        type: 'timestamp',
        default: null,
    }),
    __metadata("design:type", Date)
], Staff.prototype, "lastLogin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'bool', default: false }),
    __metadata("design:type", Boolean)
], Staff.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'code',
        type: 'varchar',
        unique: true,
        nullable: false,
        length: 100,
    }),
    __metadata("design:type", String)
], Staff.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar' }),
    __metadata("design:type", String)
], Staff.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fullname', type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Staff.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gender', type: 'varchar', length: 1, default: 'N' }),
    __metadata("design:type", String)
], Staff.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'address',
        type: 'varchar',
        length: 255,
        default: '',
        nullable: true,
    }),
    __metadata("design:type", String)
], Staff.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'birthday',
        type: 'date',
        default: null,
        nullable: true,
    }),
    __metadata("design:type", Date)
], Staff.prototype, "birthDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_manage', type: 'bool', default: false, select: false }),
    __metadata("design:type", Boolean)
], Staff.prototype, "isManage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'refresh_token',
        type: 'varchar',
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], Staff.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'access_token',
        type: 'varchar',
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], Staff.prototype, "accessToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'otp_code', type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "otpCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'otp_expired', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Staff.prototype, "otpExpired", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note_status', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "noteStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Staff.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Staff.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], Staff.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Ward, (ward) => ward.staffs),
    (0, typeorm_1.JoinColumn)({ name: 'ward_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.Ward)
], Staff.prototype, "ward", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Order, (order) => order.staff),
    __metadata("design:type", Array)
], Staff.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.PaymentHistory, (paymentHistory) => paymentHistory.staff),
    __metadata("design:type", Array)
], Staff.prototype, "paymentHistories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.OrderRefund, (order) => order.customer),
    __metadata("design:type", Array)
], Staff.prototype, "orderRefunds", void 0);
Staff = __decorate([
    (0, typeorm_1.Entity)({ name: 'staff' })
], Staff);
exports.Staff = Staff;
//# sourceMappingURL=staff.entities.js.map