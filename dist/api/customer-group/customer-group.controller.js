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
exports.CustomerGroupController = void 0;
const roles_enum_1 = require("./../../enums/roles.enum");
const common_1 = require("@nestjs/common");
const customer_group_service_1 = require("./customer-group.service");
const dto_1 = require("./dto");
const decorator_1 = require("./../../decorator");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("./../../auth/guards");
let CustomerGroupController = class CustomerGroupController {
    constructor(customGroupService) {
        this.customGroupService = customGroupService;
    }
    async createCustomerGroup(dto, user) {
        return await this.customGroupService.createCustomerGroup(dto, user.id);
    }
    async findAllCustomerGroup(dto, user, pagination) {
        return await this.customGroupService.findAllCustomerGroup(dto, user.id, pagination);
    }
    async getCustomerGroupById(id, user) {
        return await this.customGroupService.getCustomerGroupById(id, user.id);
    }
    async getCustomerGroupByCode(code, user) {
        return await this.customGroupService.getCustomerGroupByCode(code, user.id);
    }
    async updateCustomerGroupById(user, id, dto) {
        return await this.customGroupService.updateCustomerGroupById(user.id, id, dto);
    }
    async updateCustomerGroupByCode(user, code, dto) {
        return await this.customGroupService.updateCustomerGroupByCode(user.id, code, dto);
    }
    async deleteCustomerGroupById(user, id) {
        return await this.customGroupService.deleteCustomerGroupById(user.id, id);
    }
    async deleteCustomerGroupByCode(user, code) {
        return await this.customGroupService.deleteCustomerGroupById(user.id, code);
    }
    async deleteMultipleCustomerGroupByIds(user, dto) {
        return await this.customGroupService.deleteMultipleCustomerGroupByIds(user.id, dto);
    }
    async deleteMultipleCustomerGroupByCodes(user, dto) {
        return await this.customGroupService.deleteMultipleCustomerGroupByCodes(user.id, dto);
    }
    async getCustomersByGroupId(id, dto, user, pagination) {
        return await this.customGroupService.getCustomersByGroupId(id, user.id, dto, pagination);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SaveCustomerGroupDto, Object]),
    __metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "createCustomerGroup", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __param(2, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterCustomerGroupDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "findAllCustomerGroup", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "getCustomerGroupById", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "getCustomerGroupByCode", null);
__decorate([
    (0, common_1.Patch)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.UpdateCustomerGroupDto]),
    __metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "updateCustomerGroupById", null);
__decorate([
    (0, common_1.Patch)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('code')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.UpdateCustomerGroupDto]),
    __metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "updateCustomerGroupByCode", null);
__decorate([
    (0, common_1.Delete)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "deleteCustomerGroupById", null);
__decorate([
    (0, common_1.Delete)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "deleteCustomerGroupByCode", null);
__decorate([
    (0, common_1.Delete)('multiple'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.DeleteMultiCustomerGroupDto]),
    __metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "deleteMultipleCustomerGroupByIds", null);
__decorate([
    (0, common_1.Delete)('multiple/codes'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.DeleteMultiCustomerGroupDto]),
    __metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "deleteMultipleCustomerGroupByCodes", null);
__decorate([
    (0, common_1.Get)(':id/customers'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, decorator_1.CurrentUser)()),
    __param(3, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.FilterCustomerDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "getCustomersByGroupId", null);
CustomerGroupController = __decorate([
    (0, common_1.Controller)('customer-group'),
    (0, swagger_1.ApiTags)('Customer Group'),
    __metadata("design:paramtypes", [customer_group_service_1.CustomerGroupService])
], CustomerGroupController);
exports.CustomerGroupController = CustomerGroupController;
//# sourceMappingURL=customer-group.controller.js.map