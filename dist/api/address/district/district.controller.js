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
exports.DistrictController = void 0;
const guards_1 = require("./../../../auth/guards");
const enums_1 = require("./../../../enums");
const district_service_1 = require("./district.service");
const decorator_1 = require("./../../../decorator");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const common_1 = require("@nestjs/common");
let DistrictController = class DistrictController {
    constructor(districtService) {
        this.districtService = districtService;
    }
    async findAll(dto, pagination) {
        return this.districtService.findAll(dto, pagination);
    }
    async findOneById(id) {
        return this.districtService.findOneById(id);
    }
    async findOneByCode(code) {
        return this.districtService.findOneByCode(code);
    }
    async findByProvinceCode(provinceCode, pagination) {
        return this.districtService.findByProvinceCode(provinceCode, pagination);
    }
    async create(dto, user) {
        return this.districtService.createDistrict(dto, user.id);
    }
    async updateById(id, dto, user) {
        return this.districtService.updateByIdOrCode(dto, user.id, id);
    }
    async updateByCode(code, dto, user) {
        return this.districtService.updateByIdOrCode(dto, user.id, undefined, code);
    }
    async hiddenByCode(code, user) {
        return this.districtService.deleteByIdOrCode(user.id, undefined, code);
    }
    async hiddenById(id, user) {
        return this.districtService.deleteByIdOrCode(user.id, id);
    }
    async deleteMultipleId(user, dto) {
        return await this.districtService.deleteMultipleDistrictByIdsOrCodes(user.id, dto, enums_1.DeleteDtoTypeEnum.ID);
    }
    async deleteMultipleCode(user, dto) {
        return await this.districtService.deleteMultipleDistrictByIdsOrCodes(user.id, dto, enums_1.DeleteDtoTypeEnum.CODE);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterDistrictDto, Object]),
    __metadata("design:returntype", Promise)
], DistrictController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DistrictController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DistrictController.prototype, "findOneByCode", null);
__decorate([
    (0, common_1.Get)('province-code/:provinceCode'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('provinceCode')),
    __param(1, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DistrictController.prototype, "findByProvinceCode", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SaveDistrictDto, Object]),
    __metadata("design:returntype", Promise)
], DistrictController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateDistrictDto, Object]),
    __metadata("design:returntype", Promise)
], DistrictController.prototype, "updateById", null);
__decorate([
    (0, common_1.Patch)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UpdateDistrictDto, Object]),
    __metadata("design:returntype", Promise)
], DistrictController.prototype, "updateByCode", null);
__decorate([
    (0, common_1.Delete)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DistrictController.prototype, "hiddenByCode", null);
__decorate([
    (0, common_1.Delete)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DistrictController.prototype, "hiddenById", null);
__decorate([
    (0, common_1.Delete)('multiple/id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.DistrictDeleteMultiByIdsOrCodes]),
    __metadata("design:returntype", Promise)
], DistrictController.prototype, "deleteMultipleId", null);
__decorate([
    (0, common_1.Delete)('multiple/code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.DistrictDeleteMultiByIdsOrCodes]),
    __metadata("design:returntype", Promise)
], DistrictController.prototype, "deleteMultipleCode", null);
DistrictController = __decorate([
    (0, common_1.Controller)('district'),
    (0, swagger_1.ApiTags)('District'),
    __metadata("design:paramtypes", [district_service_1.DistrictService])
], DistrictController);
exports.DistrictController = DistrictController;
//# sourceMappingURL=district.controller.js.map