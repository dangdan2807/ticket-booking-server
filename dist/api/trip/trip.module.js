"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripModule = void 0;
const trip_detail_service_1 = require("./../trip-detail/trip-detail.service");
const entities_1 = require("./../../database/entities");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const trip_service_1 = require("./trip.service");
const trip_controller_1 = require("./trip.controller");
let TripModule = class TripModule {
};
TripModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Trip, entities_1.TripDetail, entities_1.Vehicle])],
        providers: [trip_service_1.TripService, trip_detail_service_1.TripDetailService],
        controllers: [trip_controller_1.TripController],
        exports: [trip_service_1.TripService],
    })
], TripModule);
exports.TripModule = TripModule;
//# sourceMappingURL=trip.module.js.map