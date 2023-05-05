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
exports.PromotionHistoryController = void 0;
const guards_1 = require("./../../auth/guards");
const enums_1 = require("./../../enums");
const decorator_1 = require("./../../decorator");
const common_1 = require("@nestjs/common");
const promotion_history_service_1 = require("./promotion-history.service");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
let PromotionHistoryController = class PromotionHistoryController {
    constructor(promotionHistoryService) {
        this.promotionHistoryService = promotionHistoryService;
    }
    async getPromotionStatusEnum() {
        return await this.promotionHistoryService.getPromotionHistoryStatusEnum();
    }
    async getPromotionHistoryById(id) {
        return await this.promotionHistoryService.getPromotionHistoryById(id);
    }
    async getPromotionHistoryByCode(code) {
        return await this.promotionHistoryService.getPromotionHistoryByCode(code);
    }
    async getPromotionHistoryByOrderCode(code) {
        return await this.promotionHistoryService.getPromotionHistoryByOrderCode(code);
    }
    async calculatePromotionLine(user, dto) {
        return await this.promotionHistoryService.calculatePromotionLine(dto, user.id);
    }
};
__decorate([
    (0, common_1.Get)('status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PromotionHistoryController.prototype, "getPromotionStatusEnum", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromotionHistoryController.prototype, "getPromotionHistoryById", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromotionHistoryController.prototype, "getPromotionHistoryByCode", null);
__decorate([
    (0, common_1.Get)('order-code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromotionHistoryController.prototype, "getPromotionHistoryByOrderCode", null);
__decorate([
    (0, common_1.Get)('calculate-promotion-line'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF, enums_1.RoleEnum.CUSTOMER),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CalculatePromotionLineDto]),
    __metadata("design:returntype", Promise)
], PromotionHistoryController.prototype, "calculatePromotionLine", null);
PromotionHistoryController = __decorate([
    (0, common_1.Controller)('promotion-history'),
    (0, swagger_1.ApiTags)('Promotion History'),
    __metadata("design:paramtypes", [promotion_history_service_1.PromotionHistoryService])
], PromotionHistoryController);
exports.PromotionHistoryController = PromotionHistoryController;
//# sourceMappingURL=promotion-history.controller.js.map