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
const staff_entities_1 = require("./staff.entities");
const customer_entities_1 = require("./customer.entities");
const passenger_car_company_entities_1 = require("./passenger-car-company.entities");
const typeorm_1 = require("typeorm");
const district_entities_1 = require("./district.entities");
const station_entities_1 = require("./station.entities");
let Ward = class Ward {
    constructor() {
        this.name = '';
    }
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
        name: 'name_with_type',
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Ward.prototype, "nameWithType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'code', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Ward.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => district_entities_1.District, (district) => district.wards),
    (0, typeorm_1.JoinColumn)({ name: 'parent_code_id', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], Ward.prototype, "parentCode", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => customer_entities_1.Customer, (customer) => customer.ward),
    __metadata("design:type", Array)
], Ward.prototype, "customers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => staff_entities_1.Staff, (staff) => staff.ward),
    __metadata("design:type", Array)
], Ward.prototype, "staffs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => passenger_car_company_entities_1.PassengerCarCompany, (passengerCarCompany) => passengerCarCompany.ward),
    __metadata("design:type", Array)
], Ward.prototype, "passengerCarCompanies", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => station_entities_1.Station, (station) => station.ward),
    __metadata("design:type", station_entities_1.Station)
], Ward.prototype, "station", void 0);
Ward = __decorate([
    (0, typeorm_1.Entity)('vi_address_ward'),
    __metadata("design:paramtypes", [])
], Ward);
exports.Ward = Ward;
//# sourceMappingURL=ward.entities.js.map