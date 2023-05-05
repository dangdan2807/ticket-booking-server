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
exports.PromotionController = void 0;
const delete_multiple_promotion_dto_1 = require("./dto/delete-multiple-promotion.dto");
const dto_1 = require("./dto");
const guards_1 = require("./../../auth/guards");
const decorator_1 = require("./../../decorator");
const enums_1 = require("./../../enums");
const promotion_service_1 = require("./promotion.service");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
let PromotionController = class PromotionController {
    constructor(promotionService) {
        this.promotionService = promotionService;
    }
    async getPromotionStatusEnum() {
        return await this.promotionService.getPromotionStatusEnum();
    }
    async findAllPromotion(dto, pagination) {
        return await this.promotionService.findAllPromotion(dto, pagination);
    }
    async createPromotion(dto, user) {
        return await this.promotionService.createPromotion(dto, user.id);
    }
    async getPromotionByCode(code) {
        return await this.promotionService.getPromotionByCode(code);
    }
    async getPromotionById(id) {
        return await this.promotionService.getPromotionById(id);
    }
    async UpdatePromotionById(id, dto, user) {
        return await this.promotionService.updatePromotionByIdOrCode(dto, user.id, id);
    }
    async UpdatePromotionByCode(code, dto, user) {
        return await this.promotionService.updatePromotionByIdOrCode(dto, user.id, undefined, code);
    }
    async deletePromotionById(id, user) {
        return await this.promotionService.deletePromotionByIdOrCode(user.id, id);
    }
    async deletePromotionByCode(code, user) {
        return await this.promotionService.deletePromotionByIdOrCode(user.id, undefined, code);
    }
    async deleteMultiplePromotionByIds(dto, user) {
        return await this.promotionService.deleteMultiplePromotionByIdsOrCodes(dto, user.id, enums_1.DeleteDtoTypeEnum.ID);
    }
    async deleteMultiplePromotionByCodes(dto, user) {
        return await this.promotionService.deleteMultiplePromotionByIdsOrCodes(dto, user.id, enums_1.DeleteDtoTypeEnum.CODE);
    }
};
__decorate([
    (0, common_1.Get)('status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PromotionController.prototype, "getPromotionStatusEnum", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterPromotionDto, Object]),
    __metadata("design:returntype", Promise)
], PromotionController.prototype, "findAllPromotion", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePromotionDto, Object]),
    __metadata("design:returntype", Promise)
], PromotionController.prototype, "createPromotion", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromotionController.prototype, "getPromotionByCode", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromotionController.prototype, "getPromotionById", null);
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
    __metadata("design:paramtypes", [String, dto_1.UpdatePromotionDto, Object]),
    __metadata("design:returntype", Promise)
], PromotionController.prototype, "UpdatePromotionById", null);
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
    __metadata("design:paramtypes", [String, dto_1.UpdatePromotionDto, Object]),
    __metadata("design:returntype", Promise)
], PromotionController.prototype, "UpdatePromotionByCode", null);
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
], PromotionController.prototype, "deletePromotionById", null);
__decorate([
    (0, common_1.Delete)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PromotionController.prototype, "deletePromotionByCode", null);
__decorate([
    (0, common_1.Delete)('multiple/ids'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_multiple_promotion_dto_1.DeleteMultiPromotionDto, Object]),
    __metadata("design:returntype", Promise)
], PromotionController.prototype, "deleteMultiplePromotionByIds", null);
__decorate([
    (0, common_1.Delete)('multiple/codes'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_multiple_promotion_dto_1.DeleteMultiPromotionDto, Object]),
    __metadata("design:returntype", Promise)
], PromotionController.prototype, "deleteMultiplePromotionByCodes", null);
PromotionController = __decorate([
    (0, common_1.Controller)('promotion'),
    (0, swagger_1.ApiTags)('Promotion'),
    __metadata("design:paramtypes", [promotion_service_1.PromotionService])
], PromotionController);
exports.PromotionController = PromotionController;
//# sourceMappingURL=promotion.controller.js.map