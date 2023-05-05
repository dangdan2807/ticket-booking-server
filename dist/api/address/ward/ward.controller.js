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
exports.WardController = void 0;
const roles_enum_1 = require("./../../../enums/roles.enum");
const common_1 = require("@nestjs/common");
const ward_service_1 = require("./ward.service");
const typeorm_1 = require("typeorm");
const decorator_1 = require("./../../../decorator");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("./../../../auth/guards");
const dto_1 = require("./dto");
let WardController = class WardController {
    constructor(wardService, dataSource) {
        this.wardService = wardService;
        this.dataSource = dataSource;
    }
    async findAll(dto, pagination) {
        return await this.wardService.findAll(dto, pagination);
    }
    async findOneById(id) {
        return await this.wardService.getWardById(id);
    }
    async findOneByCode(code) {
        return await this.wardService.getWardByCode(code);
    }
    async findByDistrictCode(districtCode, pagination) {
        return await this.wardService.findByDistrictCode(districtCode, pagination);
    }
    async create(dto, user) {
        return await this.wardService.createWard(dto, user.id);
    }
    async updateById(id, dto, user) {
        return await this.wardService.updateById(id, dto, user.id);
    }
    async updateByCode(code, dto, user) {
        return await this.wardService.updateByCode(code, dto, user.id);
    }
    async deleteByCode(code, user) {
        return await this.wardService.deleteByCode(code, user.id);
    }
    async deleteById(id, user) {
        return await this.wardService.deleteById(id, user.id);
    }
    async deleteMultipleId(user, dto) {
        return await this.wardService.deleteMultipleWardById(user.id, dto);
    }
    async deleteMultipleCode(user, dto) {
        return await this.wardService.deleteMultipleWardByCode(user.id, dto);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterWardDto, Object]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "findOneByCode", null);
__decorate([
    (0, common_1.Get)('district-code/:districtCode'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('districtCode')),
    __param(1, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "findByDistrictCode", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SaveWardDto, Object]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UpdateWardDto, Object]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "updateById", null);
__decorate([
    (0, common_1.Patch)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UpdateWardDto, Object]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "updateByCode", null);
__decorate([
    (0, common_1.Delete)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "deleteByCode", null);
__decorate([
    (0, common_1.Delete)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "deleteById", null);
__decorate([
    (0, common_1.Delete)('multiple/id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.WardDeleteMultiId]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "deleteMultipleId", null);
__decorate([
    (0, common_1.Delete)('multiple/code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.WardDeleteMultiCode]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "deleteMultipleCode", null);
WardController = __decorate([
    (0, common_1.Controller)('ward'),
    (0, swagger_1.ApiTags)('Ward'),
    __metadata("design:paramtypes", [ward_service_1.WardService,
        typeorm_1.DataSource])
], WardController);
exports.WardController = WardController;
//# sourceMappingURL=ward.controller.js.map