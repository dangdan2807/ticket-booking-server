"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const auth_service_1 = require("./../../auth/auth.service");
const user_service_1 = require("./user.service");
const auth_customer_service_1 = require("./../../auth/customer/auth-customer.service");
const entities_1 = require("./../../database/entities");
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const typeorm_1 = require("@nestjs/typeorm");
const customer_service_1 = require("../customer/customer.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Customer, entities_1.Staff])],
        providers: [user_service_1.UserService, customer_service_1.CustomerService, auth_customer_service_1.AuthCustomerService, auth_service_1.AuthService],
        controllers: [user_controller_1.UserController],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map