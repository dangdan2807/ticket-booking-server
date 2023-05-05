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
exports.Ward = void 0;
const typeorm_1 = require("typeorm");
const _1 = require("./");
let Ward = class Ward {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', name: 'id', unsigned: true }),
    __metadata("design:type", Number)
], Ward.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Ward.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Ward.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'codename',
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Ward.prototype, "codename", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'int', nullable: true, unique: true }),
    __metadata("design:type", Number)
], Ward.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'district_code', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Ward.prototype, "districtCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Ward.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Ward.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Ward.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Ward.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    }),
    __metadata("design:type", Date)
], Ward.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.District, (district) => district.wards),
    (0, typeorm_1.JoinColumn)({ name: 'parent_code_id', referencedColumnName: 'id' }),
    __metadata("design:type", _1.District)
], Ward.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Customer, (customer) => customer.ward),
    __metadata("design:type", Array)
], Ward.prototype, "customers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Staff, (staff) => staff.ward),
    __metadata("design:type", Array)
], Ward.prototype, "staffs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => _1.Station, (station) => station.ward),
    __metadata("design:type", Array)
], Ward.prototype, "stations", void 0);
Ward = __decorate([
    (0, typeorm_1.Entity)({ name: 'vi_address_ward' })
], Ward);
exports.Ward = Ward;
//# sourceMappingURL=vi-address-ward.entities.js.map