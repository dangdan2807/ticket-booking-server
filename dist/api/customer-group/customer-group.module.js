"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerGroupModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const customer_group_service_1 = require("./customer-group.service");
const customer_group_controller_1 = require("./customer-group.controller");
const entities_1 = require("./../../database/entities");
const admin_service_1 = require("../admin/admin.service");
const customer_service_1 = require("../customer/customer.service");
let CustomerGroupModule = class CustomerGroupModule {
};
CustomerGroupModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.CustomerGroup, entities_1.Staff, entities_1.Customer])],
        providers: [customer_group_service_1.CustomerGroupService, admin_service_1.AdminService, customer_service_1.CustomerService],
        controllers: [customer_group_controller_1.CustomerGroupController],
        exports: [customer_group_service_1.CustomerGroupService],
    })
], CustomerGroupModule);
exports.CustomerGroupModule = CustomerGroupModule;
//# sourceMappingURL=customer-group.module.js.map