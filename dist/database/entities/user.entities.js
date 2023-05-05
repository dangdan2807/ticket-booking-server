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
exports.User = void 0;
const gender_enum_1 = require("./../../enums/gender.enum");
const typeorm_1 = require("typeorm");
const base_entity_entities_1 = require("./base-entity.entities");
class User extends base_entity_entities_1.BaseEntity {
    constructor() {
        super();
        this.phone = '';
        this.fullName = '';
        this.email = '';
        this.password = '';
        this.birthDay = new Date();
        this.lastLogin = new Date();
        this.isActive = false;
        this.gender = gender_enum_1.GenderEnum.NONE;
        this.address = '';
        this.note = '';
        this.refreshToken = '';
        this.accessToken = '';
    }
}
__decorate([
    (0, typeorm_1.Column)({ name: 'phone', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fullname', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password', type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'birthday', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "birthDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_login', type: 'datetime' }),
    __metadata("design:type", Date)
], User.prototype, "lastLogin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'tinyint', default: 0 }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gender', type: 'varchar', default: 'N' }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'note', type: 'longtext' }),
    __metadata("design:type", String)
], User.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'refresh_token', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'access_token', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], User.prototype, "accessToken", void 0);
exports.User = User;
//# sourceMappingURL=user.entities.js.map