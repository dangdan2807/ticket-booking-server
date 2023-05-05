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
exports.OrderController = void 0;
const dto_1 = require("./dto");
const guards_1 = require("./../../auth/guards");
const enums_1 = require("./../../enums");
const decorator_1 = require("./../../decorator");
const order_service_1 = require("./order.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async createOrder(dto, user) {
        return await this.orderService.createOrder(dto, user.id);
    }
    async getOrderStatus() {
        return await this.orderService.getOrderStatus();
    }
    async getOrderUpdateStatus() {
        return await this.orderService.getOrderUpdateStatus();
    }
    async getPaymentMethod() {
        return await this.orderService.getPaymentMethod();
    }
    async payment(dto, user) {
        return this.orderService.paymentForAdmin(dto, user.id);
    }
    async findAllOrder(dto, user, pagination) {
        return await this.orderService.findAllOrder(dto, user.id, pagination);
    }
    async findAllBill(dto, user, pagination) {
        return await this.orderService.findAllBill(dto, user.id, pagination);
    }
    async findAllBillHistoryForCustomer(dto, user, pagination) {
        return await this.orderService.findAllBillHistoryForCustomer(dto, user.id, pagination);
    }
    async findAllBillAvailableForCustomer(dto, user, pagination) {
        return await this.orderService.findAllBillAvailableForCustomer(dto, user.id, pagination);
    }
    async getOrderById(id) {
        return await this.orderService.getOrderById(id);
    }
    async getOrderByCode(code) {
        return await this.orderService.getOrderByCode(code);
    }
    async cancelOrderById(dto, id, user) {
        return await this.orderService.updateOrderByIdOrCode(dto, user.id, id, undefined);
    }
    async cancelOrderByCode(dto, code, user) {
        return await this.orderService.updateOrderByIdOrCode(dto, user.id, undefined, code);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)('status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderStatus", null);
__decorate([
    (0, common_1.Get)('update-status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderUpdateStatus", null);
__decorate([
    (0, common_1.Get)('payment-method'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getPaymentMethod", null);
__decorate([
    (0, common_1.Post)('payment'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PaymentAdminDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "payment", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __param(2, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterOrderDto, Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAllOrder", null);
__decorate([
    (0, common_1.Get)('bill'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __param(2, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterBillDto, Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAllBill", null);
__decorate([
    (0, common_1.Get)('/customer/bill/history'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.CUSTOMER),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __param(2, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterBillHistoryDto, Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAllBillHistoryForCustomer", null);
__decorate([
    (0, common_1.Get)('/customer/bill/available'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.CUSTOMER),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __param(2, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterBillAvailableDto, Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAllBillAvailableForCustomer", null);
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
], OrderController.prototype, "getOrderById", null);
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
], OrderController.prototype, "getOrderByCode", null);
__decorate([
    (0, common_1.Patch)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.CUSTOMER, enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateOrderDto, String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "cancelOrderById", null);
__decorate([
    (0, common_1.Patch)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.CUSTOMER, enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('code')),
    __param(2, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateOrderDto, String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "cancelOrderByCode", null);
OrderController = __decorate([
    (0, common_1.Controller)('order'),
    (0, swagger_1.ApiTags)('Order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map