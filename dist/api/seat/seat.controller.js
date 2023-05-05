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
exports.SeatController = void 0;
const enums_1 = require("./../../enums");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const seat_service_1 = require("./seat.service");
const decorator_1 = require("./../../decorator");
const guards_1 = require("./../../auth/guards");
const dto_1 = require("./dto");
let SeatController = class SeatController {
    constructor(seatService) {
        this.seatService = seatService;
    }
    async createSeat(dto, user) {
        return await this.seatService.createSeat(dto, user.id);
    }
    async getSeatById(id) {
        return await this.seatService.getSeatById(id);
    }
    async getSeatByCode(code) {
        return await this.seatService.getSeatByCode(code);
    }
    async getSeatByVehicleId(vehicleId, pagination) {
        return await this.seatService.findAllSeatByVehicleId(vehicleId, pagination);
    }
    async searchSeat(dto, pagination) {
        return await this.seatService.searchSeat(dto, pagination);
    }
    async searchSeatWithVehicleId(vehicleId, dto, pagination) {
        return await this.seatService.searchSeatWithVehicleId(dto, vehicleId, pagination);
    }
    async updateSeatById(user, id, dto) {
        return await this.seatService.updateSeatByIdOrCode(dto, user.id, id);
    }
    async updateSeatByCode(user, code, dto) {
        return await this.seatService.updateSeatByIdOrCode(dto, user.id, undefined, code);
    }
    async deleteStationById(user, id) {
        return await this.seatService.deleteSeatByIdOrCode(user.id, id);
    }
    async deleteStationByCode(user, code) {
        return await this.seatService.deleteSeatByIdOrCode(user.id, undefined, code);
    }
    async deleteMultipleByIds(user, dto) {
        return await this.seatService.deleteMultipleTripById(user.id, dto);
    }
    async deleteMultipleByCodes(user, dto) {
        return await this.seatService.deleteMultipleTripByCode(user.id, dto);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateSeatDto, Object]),
    __metadata("design:returntype", Promise)
], SeatController.prototype, "createSeat", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeatController.prototype, "getSeatById", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeatController.prototype, "getSeatByCode", null);
__decorate([
    (0, common_1.Get)('vehicle/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SeatController.prototype, "getSeatByVehicleId", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterSeatDto, Object]),
    __metadata("design:returntype", Promise)
], SeatController.prototype, "searchSeat", null);
__decorate([
    (0, common_1.Get)('search/vehicle/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.FilterSeatDto, Object]),
    __metadata("design:returntype", Promise)
], SeatController.prototype, "searchSeatWithVehicleId", null);
__decorate([
    (0, common_1.Patch)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.UpdateSeatDto]),
    __metadata("design:returntype", Promise)
], SeatController.prototype, "updateSeatById", null);
__decorate([
    (0, common_1.Patch)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('code')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.UpdateSeatDto]),
    __metadata("design:returntype", Promise)
], SeatController.prototype, "updateSeatByCode", null);
__decorate([
    (0, common_1.Delete)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SeatController.prototype, "deleteStationById", null);
__decorate([
    (0, common_1.Delete)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SeatController.prototype, "deleteStationByCode", null);
__decorate([
    (0, common_1.Delete)('multiple/ids'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.SeatDeleteMultiInput]),
    __metadata("design:returntype", Promise)
], SeatController.prototype, "deleteMultipleByIds", null);
__decorate([
    (0, common_1.Delete)('multiple/codes'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.SeatDeleteMultiInput]),
    __metadata("design:returntype", Promise)
], SeatController.prototype, "deleteMultipleByCodes", null);
SeatController = __decorate([
    (0, common_1.Controller)('seat'),
    (0, swagger_1.ApiTags)('Seat'),
    __metadata("design:paramtypes", [seat_service_1.SeatService])
], SeatController);
exports.SeatController = SeatController;
//# sourceMappingURL=seat.controller.js.map