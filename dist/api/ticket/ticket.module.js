"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModule = void 0;
const seat_service_1 = require("./../seat/seat.service");
const seat_module_1 = require("./../seat/seat.module");
const trip_detail_service_1 = require("./../trip-detail/trip-detail.service");
const entities_1 = require("./../../database/entities");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const ticket_service_1 = require("./ticket.service");
const trip_detail_module_1 = require("../trip-detail/trip-detail.module");
const ticket_controller_1 = require("./ticket.controller");
let TicketModule = class TicketModule {
};
TicketModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.Ticket, entities_1.TicketDetail, entities_1.TripDetail, entities_1.Seat]),
            trip_detail_module_1.TripDetailModule,
            seat_module_1.SeatModule,
        ],
        providers: [ticket_service_1.TicketService, trip_detail_service_1.TripDetailService, seat_service_1.SeatService],
        exports: [ticket_service_1.TicketService],
        controllers: [ticket_controller_1.TicketController],
    })
], TicketModule);
exports.TicketModule = TicketModule;
//# sourceMappingURL=ticket.module.js.map