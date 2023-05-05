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
exports.PromotionLineController = void 0;
const guards_1 = require("./../../auth/guards");
const enums_1 = require("./../../enums");
const decorator_1 = require("./../../decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const promotion_line_service_1 = require("./promotion-line.service");
const dto_1 = require("./dto");
let PromotionLineController = class PromotionLineController {
    constructor(promotionLineService) {
        this.promotionLineService = promotionLineService;
    }
    async getPromotionLineTypeEnum() {
        return await this.promotionLineService.getPromotionLineTypeEnum();
    }
    async createPromotion(dto, user) {
        return await this.promotionLineService.createPromotionLines(dto, user.id);
    }
    async findAllPriceList(dto, pagination) {
        return await this.promotionLineService.findAllPromotionLine(dto, pagination);
    }
    async findAvailablePromotionLine(dto) {
        return await this.promotionLineService.findAvailablePromotionLine(dto);
    }
    async UpdatePromotionLineById(id, dto, user) {
        return await this.promotionLineService.updatePromotionLineByIdOrCode(dto, user.id, id);
    }
    async UpdatePromotionLineByCode(code, dto, user) {
        return await this.promotionLineService.updatePromotionLineByIdOrCode(dto, user.id, undefined, code);
    }
    async getPromotionByCode(code) {
        return await this.promotionLineService.getPromotionLineByCode(code);
    }
    async getPromotionById(id) {
        return await this.promotionLineService.getPromotionLineById(id);
    }
    async deletePromotionById(id, user) {
        return await this.promotionLineService.deletePromotionLineByIdOrCode(user.id, id);
    }
    async deletePromotionByCode(code, user) {
        return await this.promotionLineService.deletePromotionLineByIdOrCode(user.id, undefined, code);
    }
    async deleteMultiplePromotionByIds(dto, user) {
        return await this.promotionLineService.deleteMultiPromotionLineByIdOrCode(dto, user.id, enums_1.DeleteDtoTypeEnum.ID);
    }
    async deleteMultiplePromotionByCodes(dto, user) {
        return await this.promotionLineService.deleteMultiPromotionLineByIdOrCode(dto, user.id, enums_1.DeleteDtoTypeEnum.CODE);
    }
};
__decorate([
    (0, common_1.Get)('type'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PromotionLineController.prototype, "getPromotionLineTypeEnum", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePromotionLinesDto, Object]),
    __metadata("design:returntype", Promise)
], PromotionLineController.prototype, "createPromotion", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterPromotionLineDto, Object]),
    __metadata("design:returntype", Promise)
], PromotionLineController.prototype, "findAllPriceList", null);
__decorate([
    (0, common_1.Get)('/available'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterAvailablePromotionLineDto]),
    __metadata("design:returntype", Promise)
], PromotionLineController.prototype, "findAvailablePromotionLine", null);
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
    __metadata("design:paramtypes", [String, dto_1.UpdatePromotionLineDto, Object]),
    __metadata("design:returntype", Promise)
], PromotionLineController.prototype, "UpdatePromotionLineById", null);
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
    __metadata("design:paramtypes", [String, dto_1.UpdatePromotionLineDto, Object]),
    __metadata("design:returntype", Promise)
], PromotionLineController.prototype, "UpdatePromotionLineByCode", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromotionLineController.prototype, "getPromotionByCode", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromotionLineController.prototype, "getPromotionById", null);
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
], PromotionLineController.prototype, "deletePromotionById", null);
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
], PromotionLineController.prototype, "deletePromotionByCode", null);
__decorate([
    (0, common_1.Delete)('multiple/ids'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DeleteMultiPromotionLineDto, Object]),
    __metadata("design:returntype", Promise)
], PromotionLineController.prototype, "deleteMultiplePromotionByIds", null);
__decorate([
    (0, common_1.Delete)('multiple/codes'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DeleteMultiPromotionLineDto, Object]),
    __metadata("design:returntype", Promise)
], PromotionLineController.prototype, "deleteMultiplePromotionByCodes", null);
PromotionLineController = __decorate([
    (0, common_1.Controller)('promotion-line'),
    (0, swagger_1.ApiTags)('Promotion Line'),
    __metadata("design:paramtypes", [promotion_line_service_1.PromotionLineService])
], PromotionLineController);
exports.PromotionLineController = PromotionLineController;
//# sourceMappingURL=promotion-line.controller.js.map