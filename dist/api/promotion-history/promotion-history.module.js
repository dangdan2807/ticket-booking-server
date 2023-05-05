"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const promotion_history_service_1 = require("./promotion-history.service");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./../../database/entities");
const promotion_history_controller_1 = require("./promotion-history.controller");
let PromotionHistoryModule = class PromotionHistoryModule {
};
PromotionHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.Order,
                entities_1.OrderDetail,
                entities_1.OrderRefund,
                entities_1.PromotionLine,
                entities_1.PromotionHistory,
            ]),
        ],
        providers: [promotion_history_service_1.PromotionHistoryService],
        exports: [promotion_history_service_1.PromotionHistoryService],
        controllers: [promotion_history_controller_1.PromotionHistoryController],
    })
], PromotionHistoryModule);
exports.PromotionHistoryModule = PromotionHistoryModule;
//# sourceMappingURL=promotion-history.module.js.map