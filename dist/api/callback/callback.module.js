"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbackModule = void 0;
const common_1 = require("@nestjs/common");
const callback_service_1 = require("./callback.service");
const callback_controller_1 = require("./callback.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./../../database/entities");
const payment_history_service_1 = require("../payment-history/payment-history.service");
const admin_service_1 = require("../admin/admin.service");
const customer_service_1 = require("../customer/customer.service");
let CallbackModule = class CallbackModule {
};
CallbackModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Order, entities_1.Staff, entities_1.Customer, entities_1.PaymentHistory])],
        providers: [
            callback_service_1.CallbackService,
            payment_history_service_1.PaymentHistoryService,
            admin_service_1.AdminService,
            customer_service_1.CustomerService,
        ],
        controllers: [callback_controller_1.CallbackController],
        exports: [callback_service_1.CallbackService],
    })
], CallbackModule);
exports.CallbackModule = CallbackModule;
//# sourceMappingURL=callback.module.js.map