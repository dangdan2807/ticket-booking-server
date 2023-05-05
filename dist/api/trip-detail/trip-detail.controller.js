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
exports.TripDetailController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("./../../auth/guards");
const decorator_1 = require("./../../decorator");
const enums_1 = require("./../../enums");
const trip_detail_service_1 = require("./trip-detail.service");
const dto_1 = require("./dto");
let TripDetailController = class TripDetailController {
    constructor(tripDetailService) {
        this.tripDetailService = tripDetailService;
    }
    async createTripDetail(dto, user) {
        return await this.tripDetailService.createTripDetail(dto, user.id);
    }
    async getBusSchedule(user, dto) {
        return await this.tripDetailService.getBusSchedule(dto, user.id);
    }
    async findAll(dto, pagination) {
        return await this.tripDetailService.findAllTripDetail(dto, pagination);
    }
    async getTripDetailById(id) {
        return await this.tripDetailService.getTripDetailById(id);
    }
    async getTripDetailByCode(code) {
        return await this.tripDetailService.getTripDetailByCode(code);
    }
    async updateTripDetailById(user, id, dto) {
        return await this.tripDetailService.updateTripDetailByIdOrCode(dto, user.id, id);
    }
    async updateTripDetailByCode(user, code, dto) {
        return await this.tripDetailService.updateTripDetailByIdOrCode(dto, user.id, undefined, code);
    }
    async deleteTripDetailById(user, id) {
        return await this.tripDetailService.deleteTripDetailByIdOrCode(user.id, id);
    }
    async deleteTripDetailByCode(user, code) {
        return await this.tripDetailService.deleteTripDetailByIdOrCode(user.id, undefined, code);
    }
    async deleteMultipleTripDetailByIds(user, dto) {
        return await this.tripDetailService.deleteMultipleTripDetailByIdsOrCodes(user.id, dto, enums_1.DeleteDtoTypeEnum.ID);
    }
    async deleteMultipleTripDetailByCode(user, dto) {
        return await this.tripDetailService.deleteMultipleTripDetailByIdsOrCodes(user.id, dto, enums_1.DeleteDtoTypeEnum.CODE);
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
    __metadata("design:paramtypes", [dto_1.CreateTripDetailDto, Object]),
    __metadata("design:returntype", Promise)
], TripDetailController.prototype, "createTripDetail", null);
__decorate([
    (0, common_1.Get)('bus-schedule'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.BusScheduleDto]),
    __metadata("design:returntype", Promise)
], TripDetailController.prototype, "getBusSchedule", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterTripDetailDto, Object]),
    __metadata("design:returntype", Promise)
], TripDetailController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TripDetailController.prototype, "getTripDetailById", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TripDetailController.prototype, "getTripDetailByCode", null);
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
    __metadata("design:paramtypes", [Object, String, dto_1.UpdateTripDetailDto]),
    __metadata("design:returntype", Promise)
], TripDetailController.prototype, "updateTripDetailById", null);
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
    __metadata("design:paramtypes", [Object, String, dto_1.UpdateTripDetailDto]),
    __metadata("design:returntype", Promise)
], TripDetailController.prototype, "updateTripDetailByCode", null);
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
], TripDetailController.prototype, "deleteTripDetailById", null);
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
], TripDetailController.prototype, "deleteTripDetailByCode", null);
__decorate([
    (0, common_1.Delete)('multiple'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.TripDetailDeleteMultiInput]),
    __metadata("design:returntype", Promise)
], TripDetailController.prototype, "deleteMultipleTripDetailByIds", null);
__decorate([
    (0, common_1.Delete)('multiple/code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.TripDetailDeleteMultiInput]),
    __metadata("design:returntype", Promise)
], TripDetailController.prototype, "deleteMultipleTripDetailByCode", null);
TripDetailController = __decorate([
    (0, common_1.Controller)('trip-detail'),
    (0, swagger_1.ApiTags)('Trip Detail'),
    __metadata("design:paramtypes", [trip_detail_service_1.TripDetailService])
], TripDetailController);
exports.TripDetailController = TripDetailController;
//# sourceMappingURL=trip-detail.controller.js.map