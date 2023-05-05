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
exports.PaymentHistoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payment_history_service_1 = require("./payment-history.service");
const decorator_1 = require("./../../decorator");
const enums_1 = require("./../../enums");
const guards_1 = require("./../../auth/guards");
const dto_1 = require("./dto");
let PaymentHistoryController = class PaymentHistoryController {
    constructor(paymentHistoryService) {
        this.paymentHistoryService = paymentHistoryService;
    }
    async findAllPaymentHistory(dto, user, pagination) {
        return await this.paymentHistoryService.findAllPaymentHistory(dto, user.id, pagination);
    }
    async getPaymentHistoryByCode(code) {
        return await this.paymentHistoryService.getPaymentHistoryByCode(code);
    }
    async getPaymentHistoryById(id) {
        return await this.paymentHistoryService.getPaymentHistoryById(id);
    }
    async getPaymentHistoryByOrderCode(orderCode) {
        return await this.paymentHistoryService.getPaymentHistoryByOrderCode(orderCode);
    }
};
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF, enums_1.RoleEnum.CUSTOMER),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __param(2, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterPaymentHistoryDto, Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentHistoryController.prototype, "findAllPaymentHistory", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF, enums_1.RoleEnum.CUSTOMER),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentHistoryController.prototype, "getPaymentHistoryByCode", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF, enums_1.RoleEnum.CUSTOMER),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentHistoryController.prototype, "getPaymentHistoryById", null);
__decorate([
    (0, common_1.Get)('order-code/:orderCode'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF, enums_1.RoleEnum.CUSTOMER),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('orderCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentHistoryController.prototype, "getPaymentHistoryByOrderCode", null);
PaymentHistoryController = __decorate([
    (0, common_1.Controller)('payment-history'),
    (0, swagger_1.ApiTags)('Payment History'),
    __metadata("design:paramtypes", [payment_history_service_1.PaymentHistoryService])
], PaymentHistoryController);
exports.PaymentHistoryController = PaymentHistoryController;
//# sourceMappingURL=payment-history.controller.js.map