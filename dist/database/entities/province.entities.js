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
exports.Province = void 0;
const typeorm_1 = require("typeorm");
const district_entities_1 = require("./district.entities");
let Province = class Province {
    constructor() {
        this.name = '';
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', name: 'id', unsigned: true }),
    __metadata("design:type", Number)
], Province.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Province.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'type', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Province.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Province.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'name_with_type',
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Province.prototype, "nameWithType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => district_entities_1.District, (district) => district.parentCode),
    __metadata("design:type", Array)
], Province.prototype, "districts", void 0);
Province = __decorate([
    (0, typeorm_1.Entity)('vi_address_provide'),
    __metadata("design:paramtypes", [])
], Province);
exports.Province = Province;
//# sourceMappingURL=province.entities.js.map