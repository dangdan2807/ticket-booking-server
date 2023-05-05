"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationModule = void 0;
const admin_service_1 = require("./../admin/admin.service");
const customer_service_1 = require("./../customer/customer.service");
const customer_entities_1 = require("./../../database/entities/customer.entities");
const ward_service_1 = require("./../address/ward/ward.service");
const province_service_1 = require("./../address/province/province.service");
const district_service_1 = require("./../address/district/district.service");
const image_resource_service_1 = require("./../image-resource/image-resource.service");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const station_service_1 = require("./station.service");
const station_controller_1 = require("./station.controller");
const entities_1 = require("./../../database/entities");
let StationModule = class StationModule {
};
StationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.Station,
                entities_1.Ward,
                entities_1.District,
                entities_1.Province,
                entities_1.ImageResource,
                entities_1.Staff,
                customer_entities_1.Customer,
            ]),
        ],
        controllers: [station_controller_1.StationController],
        providers: [
            station_service_1.StationService,
            image_resource_service_1.ImageResourceService,
            ward_service_1.WardService,
            district_service_1.DistrictService,
            province_service_1.ProvinceService,
            admin_service_1.AdminService,
            customer_service_1.CustomerService,
        ],
        exports: [station_service_1.StationService],
    })
], StationModule);
exports.StationModule = StationModule;
//# sourceMappingURL=station.module.js.map