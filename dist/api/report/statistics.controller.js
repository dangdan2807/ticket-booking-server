"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsController = void 0;
const guards_1 = require("../../auth/guards");
const decorator_1 = require("../../decorator");
const enums_1 = require("../../enums");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const statistics_service_1 = require("./statistics.service");
const dto_1 = require("./dto");
let StatisticsController = class StatisticsController {
    constructor(statisticsService) {
        this.statisticsService = statisticsService;
    }
    async getStatisticsLastDays(dto) {
        return this.statisticsService.getStatisticsLastDays(dto);
    }
    async getTotalRevenueLastDays(dto) {
        return await this.statisticsService.getTotalRevenueLastDays(dto);
    }
    async getTotalOrdersLastDays(dto) {
        return this.statisticsService.getTotalOrdersLastDays(dto);
    }
    async getTotalTicketsSoldLastDays(dto) {
        return this.statisticsService.getTotalTicketsSoldLastDays(dto);
    }
    async getTotalCustomersLastDays(dto) {
        return this.statisticsService.getTotalCustomersLastDays(dto);
    }
    async getTopCustomersLastDays(dto) {
        return this.statisticsService.getTopCustomersLastDays(dto);
    }
    async getRevenueByDayLastDays(dto) {
        return this.statisticsService.getRevenueByDayLastDays(dto);
    }
    async getRevenueCustomersLastDays(dto, pagination) {
        return this.statisticsService.getRevenueCustomers(dto, pagination);
    }
    async getTicketsSoldByRoute(dto, pagination) {
        return this.statisticsService.getTicketsSoldByRoute(dto, pagination);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.StatisticsDto]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getStatisticsLastDays", null);
__decorate([
    (0, common_1.Get)('revenue'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.StatisticsDto]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getTotalRevenueLastDays", null);
__decorate([
    (0, common_1.Get)('orders'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.StatisticsDto]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getTotalOrdersLastDays", null);
__decorate([
    (0, common_1.Get)('tickets'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.StatisticsDto]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getTotalTicketsSoldLastDays", null);
__decorate([
    (0, common_1.Get)('customers'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.StatisticsDto]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getTotalCustomersLastDays", null);
__decorate([
    (0, common_1.Get)('top-customers'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TopCustomerStatisticsDto]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getTopCustomersLastDays", null);
__decorate([
    (0, common_1.Get)('revenue-by-day'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.StatisticsDto]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getRevenueByDayLastDays", null);
__decorate([
    (0, common_1.Get)('revenue-by-customer'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RevenueCustomerStatisticsDto, Object]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getRevenueCustomersLastDays", null);
__decorate([
    (0, common_1.Get)('ticket-sold-by-route'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TicketStatisticsDto, Object]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getTicketsSoldByRoute", null);
StatisticsController = __decorate([
    (0, swagger_1.ApiTags)('Statistics'),
    (0, common_1.Controller)('statistics'),
    __metadata("design:paramtypes", [statistics_service_1.StatisticsService])
], StatisticsController);
exports.StatisticsController = StatisticsController;
//# sourceMappingURL=statistics.controller.js.map