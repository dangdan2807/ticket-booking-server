"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsModule = void 0;
const common_1 = require("@nestjs/common");
const statistics_service_1 = require("./statistics.service");
const statistics_controller_1 = require("./statistics.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../database/entities");
let StatisticsModule = class StatisticsModule {
};
StatisticsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.Order,
                entities_1.TicketDetail,
                entities_1.OrderDetail,
                entities_1.Customer,
                entities_1.Staff,
                entities_1.Trip,
                entities_1.TripDetail,
                entities_1.TicketDetail,
                entities_1.Ticket,
                entities_1.PromotionLine,
            ]),
        ],
        providers: [statistics_service_1.StatisticsService],
        controllers: [statistics_controller_1.StatisticsController],
        exports: [statistics_service_1.StatisticsService],
    })
], StatisticsModule);
exports.StatisticsModule = StatisticsModule;
//# sourceMappingURL=statistics.module.js.map