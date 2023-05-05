"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketGroupModule = void 0;
const ticket_group_entities_1 = require("./../../database/entities/ticket-group.entities");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const ticket_group_service_1 = require("./ticket-group.service");
const ticket_group_controller_1 = require("./ticket-group.controller");
let TicketGroupModule = class TicketGroupModule {
};
TicketGroupModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([ticket_group_entities_1.TicketGroup])],
        providers: [ticket_group_service_1.TicketGroupService],
        controllers: [ticket_group_controller_1.TicketGroupController],
        exports: [ticket_group_service_1.TicketGroupService],
    })
], TicketGroupModule);
exports.TicketGroupModule = TicketGroupModule;
//# sourceMappingURL=ticket-group.module.js.map