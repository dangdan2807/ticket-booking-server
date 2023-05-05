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
exports.OrderRefundController = void 0;
const guards_1 = require("./../../auth/guards");
const enums_1 = require("./../../enums");
const decorator_1 = require("./../../decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const order_service_1 = require("../order/order.service");
const dto_1 = require("./dto");
let OrderRefundController = class OrderRefundController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async getOrderRefundStatus() {
        return await this.orderService.getOrderRefundStatus();
    }
    async findAllOrder(dto, user, pagination) {
        return await this.orderService.findAllOrderRefund(dto, user.id, pagination);
    }
    async getOrderByCode(code) {
        return await this.orderService.getOrderRefundByCode(code);
    }
    async updateOrderRefundById(id, dto, user) {
        return await this.orderService.updateOrderRefundByIdOrCode(dto, user.id, undefined, id);
    }
    async updateOrderRefundByCode(code, dto, user) {
        return await this.orderService.updateOrderRefundByIdOrCode(dto, user.id, code);
    }
};
__decorate([
    (0, common_1.Get)('status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderRefundController.prototype, "getOrderRefundStatus", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF, enums_1.RoleEnum.CUSTOMER),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __param(2, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterOrderRefundDto, Object, Object]),
    __metadata("design:returntype", Promise)
], OrderRefundController.prototype, "findAllOrder", null);
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
], OrderRefundController.prototype, "getOrderByCode", null);
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
    __metadata("design:paramtypes", [String, dto_1.UpdateOrderRefundDto, Object]),
    __metadata("design:returntype", Promise)
], OrderRefundController.prototype, "updateOrderRefundById", null);
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
    __metadata("design:paramtypes", [String, dto_1.UpdateOrderRefundDto, Object]),
    __metadata("design:returntype", Promise)
], OrderRefundController.prototype, "updateOrderRefundByCode", null);
OrderRefundController = __decorate([
    (0, common_1.Controller)('order-refund'),
    (0, swagger_1.ApiTags)('Order Refund'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderRefundController);
exports.OrderRefundController = OrderRefundController;
//# sourceMappingURL=order-refund.controller.js.map