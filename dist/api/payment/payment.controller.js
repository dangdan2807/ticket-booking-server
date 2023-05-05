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
exports.PaymentController = void 0;
const decorator_1 = require("./../../decorator");
const payment_service_1 = require("./payment.service");
const common_1 = require("@nestjs/common");
const guards_1 = require("./../../auth/guards");
const enums_1 = require("../../enums");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async getZaloPayPaymentUrl(orderCode, user) {
        return await this.paymentService.getZaloPayPaymentUrl(orderCode, user.id);
    }
    async checkPaymentStatus(dto, user) {
        return await this.paymentService.checkStatusZaloPay(dto, user.id);
    }
};
__decorate([
    (0, common_1.Get)('zalopay/:orderCode/url'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.CUSTOMER),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('orderCode')),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getZaloPayPaymentUrl", null);
__decorate([
    (0, common_1.Post)('zalopay/check-status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CheckStatusZaloPayPaymentDto, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "checkPaymentStatus", null);
PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    (0, swagger_1.ApiTags)('Payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map