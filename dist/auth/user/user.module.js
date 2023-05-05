"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserModule = void 0;
const customer_service_1 = require("./../../api/customer/customer.service");
const customer_module_1 = require("./../../api/customer/customer.module");
const entities_1 = require("./../../database/entities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("../auth.service");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
let AuthUserModule = class AuthUserModule {
};
AuthUserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Customer]), customer_module_1.CustomerModule],
        controllers: [user_controller_1.AuthUserController],
        providers: [user_service_1.AuthUserService, auth_service_1.AuthService, customer_service_1.CustomerService],
        exports: [user_service_1.AuthUserService],
    })
], AuthUserModule);
exports.AuthUserModule = AuthUserModule;
//# sourceMappingURL=user.module.js.map