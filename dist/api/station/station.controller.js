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
exports.StationController = void 0;
const enums_1 = require("./../../enums");
const decorator_1 = require("./../../decorator");
const station_service_1 = require("./station.service");
const common_1 = require("@nestjs/common");
const guards_1 = require("./../../auth/guards");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const decorators_1 = require("@nestjs/common/decorators");
let StationController = class StationController {
    constructor(stationService) {
        this.stationService = stationService;
    }
    async createNewStation(dto, user) {
        return await this.stationService.createStation(dto, user.id);
    }
    async getStationById(id) {
        const options = {
            relations: {
                ward: {
                    district: {
                        province: true,
                    },
                },
            },
        };
        const station = await this.stationService.getOneStationById(id, options);
        station['province'] = station.ward.district.province;
        delete station.ward.district.province;
        station['district'] = station.ward.district;
        delete station.ward.district;
        return station;
    }
    async getStationByCode(code) {
        const options = {
            relations: {
                ward: {
                    district: {
                        province: true,
                    },
                },
            },
        };
        const station = await this.stationService.getOneStationByCode(code, options);
        station['province'] = station.ward.district.province;
        delete station.ward.district.province;
        station['district'] = station.ward.district;
        delete station.ward.district;
        return station;
    }
    async findAll(dto, pagination) {
        return await this.stationService.findAll(dto, pagination);
    }
    async updateStationById(user, id, dto) {
        return await this.stationService.updateStationById(user.id, id, dto);
    }
    async updateStationByCode(user, code, dto) {
        return await this.stationService.updateStationByCode(user.id, code, dto);
    }
    async deleteStationById(user, id) {
        return await this.stationService.deleteStationById(user.id, id);
    }
    async deleteStationByCode(user, code) {
        return await this.stationService.deleteStationByCode(user.id, code);
    }
    async deleteMultipleStationByIds(user, dto) {
        return await this.stationService.deleteMultipleStationByIds(user.id, dto);
    }
    async deleteMultipleStationByCodes(user, dto) {
        return await this.stationService.deleteMultipleStationByCodes(user.id, dto);
    }
    async export(dto, res) {
        return await this.stationService.exportStation(dto, res);
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
    __metadata("design:paramtypes", [dto_1.SaveStationDto, Object]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "createNewStation", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "getStationById", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "getStationByCode", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterStationDto, Object]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Patch)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.UpdateStationDto]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "updateStationById", null);
__decorate([
    (0, decorators_1.Patch)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('code')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.UpdateStationDto]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "updateStationByCode", null);
__decorate([
    (0, common_1.Delete)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "deleteStationById", null);
__decorate([
    (0, common_1.Delete)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "deleteStationByCode", null);
__decorate([
    (0, common_1.Delete)('multiple/ids'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.DeleteStationByIdsDto]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "deleteMultipleStationByIds", null);
__decorate([
    (0, common_1.Delete)('multiple/codes'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.DeleteStationByCodesDto]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "deleteMultipleStationByCodes", null);
__decorate([
    (0, common_1.Post)('export'),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorators_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterStationDto, Object]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "export", null);
StationController = __decorate([
    (0, common_1.Controller)('station'),
    (0, swagger_1.ApiTags)('Station'),
    __metadata("design:paramtypes", [station_service_1.StationService])
], StationController);
exports.StationController = StationController;
//# sourceMappingURL=station.controller.js.map