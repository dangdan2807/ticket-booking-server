"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistrictModule = void 0;
const admin_service_1 = require("./../../admin/admin.service");
const entities_1 = require("./../../../database/entities");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const district_service_1 = require("./district.service");
const district_controller_1 = require("./district.controller");
let DistrictModule = class DistrictModule {
};
DistrictModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.District, entities_1.Province, entities_1.Staff])],
        controllers: [district_controller_1.DistrictController],
        providers: [district_service_1.DistrictService, admin_service_1.AdminService],
        exports: [district_service_1.DistrictService],
    })
], DistrictModule);
exports.DistrictModule = DistrictModule;
//# sourceMappingURL=district.module.js.map