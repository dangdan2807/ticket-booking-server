"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAdminModule = void 0;
const entities_1 = require("../../database/entities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("../auth.service");
const auth_admin_controller_1 = require("./auth-admin.controller");
const auth_admin_service_1 = require("./auth-admin.service");
const admin_service_1 = require("./../../api/admin/admin.service");
let AuthAdminModule = class AuthAdminModule {
};
AuthAdminModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Staff])],
        controllers: [auth_admin_controller_1.AuthAdminController],
        providers: [auth_admin_service_1.AuthAdminService, auth_service_1.AuthService, admin_service_1.AdminService],
        exports: [auth_admin_service_1.AuthAdminService],
    })
], AuthAdminModule);
exports.AuthAdminModule = AuthAdminModule;
//# sourceMappingURL=auth-admin.module.js.map