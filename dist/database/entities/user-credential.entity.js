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
exports.UserCredential = void 0;
const typeorm_1 = require("typeorm");
class UserCredential {
}
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserCredential.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'refresh_token', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], UserCredential.prototype, "refresh_token", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'access_token', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], UserCredential.prototype, "access_token", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password', type: 'varchar' }),
    __metadata("design:type", String)
], UserCredential.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updatedBy', type: 'uuid', nullable: true, select: false }),
    __metadata("design:type", String)
], UserCredential.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], UserCredential.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], UserCredential.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], UserCredential.prototype, "deletedAt", void 0);
exports.UserCredential = UserCredential;
//# sourceMappingURL=user-credential.entity.js.map