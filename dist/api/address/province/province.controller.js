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
exports.ProvinceController = void 0;
const roles_enum_1 = require("./../../../enums/roles.enum");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const province_service_1 = require("./province.service");
const decorator_1 = require("./../../../decorator");
const guards_1 = require("./../../../auth/guards");
const dto_1 = require("./dto");
let ProvinceController = class ProvinceController {
    constructor(provinceService) {
        this.provinceService = provinceService;
    }
    async findAll(dto, pagination) {
        return this.provinceService.findAll(dto, pagination);
    }
    async findOneById(id) {
        return this.provinceService.findOneById(id);
    }
    async findOneByCode(code) {
        return this.provinceService.findOneByCode(code);
    }
    async create(dto, user) {
        return this.provinceService.createProvince(dto, user.id);
    }
    async updateById(id, dto, user) {
        return this.provinceService.updateById(id, dto, user.id);
    }
    async updateByCode(code, dto, user) {
        return this.provinceService.updateByCode(code, dto, user.id);
    }
    async deleteByCode(code, user) {
        return this.provinceService.deleteByCode(code, user.id);
    }
    async deleteById(id, user) {
        return this.provinceService.deleteById(id, user.id);
    }
    async deleteMultipleId(user, dto) {
        return await this.provinceService.deleteMultipleProvinceById(user.id, dto);
    }
    async deleteMultipleCode(user, dto) {
        return await this.provinceService.deleteMultipleProvinceByCode(user.id, dto);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterProvinceDto, Object]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "findOneByCode", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SaveProvinceDto, Object]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "create", null);
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
    __metadata("design:paramtypes", [String, dto_1.UpdateProvinceDto, Object]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "updateById", null);
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
    __metadata("design:paramtypes", [Number, dto_1.UpdateProvinceDto, Object]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "updateByCode", null);
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
], ProvinceController.prototype, "deleteByCode", null);
__decorate([
    (0, common_1.Delete)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "deleteById", null);
__decorate([
    (0, common_1.Delete)('multiple/id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.ProvinceDeleteMultiId]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "deleteMultipleId", null);
__decorate([
    (0, common_1.Delete)('multiple/code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.ProvinceDeleteMultiCode]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "deleteMultipleCode", null);
ProvinceController = __decorate([
    (0, common_1.Controller)('province'),
    (0, swagger_1.ApiTags)('Province'),
    __metadata("design:paramtypes", [province_service_1.ProvinceService])
], ProvinceController);
exports.ProvinceController = ProvinceController;
//# sourceMappingURL=province.controller.js.map