"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WardModule = void 0;
const admin_service_1 = require("./../../admin/admin.service");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const ward_service_1 = require("./ward.service");
const ward_controller_1 = require("./ward.controller");
const entities_1 = require("./../../../database/entities");
let WardModule = class WardModule {
};
WardModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Ward, entities_1.District, entities_1.Staff])],
        controllers: [ward_controller_1.WardController],
        providers: [ward_service_1.WardService, admin_service_1.AdminService],
        exports: [ward_service_1.WardService],
    })
], WardModule);
exports.WardModule = WardModule;
//# sourceMappingURL=ward.module.js.map