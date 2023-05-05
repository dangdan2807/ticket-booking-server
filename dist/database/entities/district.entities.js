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
exports.District = void 0;
const typeorm_1 = require("typeorm");
const province_entities_1 = require("./province.entities");
const ward_entities_1 = require("./ward.entities");
let District = class District {
    constructor() {
        this.name = '';
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', name: 'id', unsigned: true }),
    __metadata("design:type", Number)
], District.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], District.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], District.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'name_with_type',
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], District.prototype, "nameWithType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], District.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => province_entities_1.Province, (province) => province.districts),
    (0, typeorm_1.JoinColumn)({ name: 'parent_code_id', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], District.prototype, "parentCode", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ward_entities_1.Ward, (ward) => ward.parentCode),
    __metadata("design:type", Array)
], District.prototype, "wards", void 0);
District = __decorate([
    (0, typeorm_1.Entity)('vi_address_district'),
    __metadata("design:paramtypes", [])
], District);
exports.District = District;
//# sourceMappingURL=district.entities.js.map