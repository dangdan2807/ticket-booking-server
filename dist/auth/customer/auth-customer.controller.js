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
exports.AuthCustomerController = void 0;
const create_customer_dto_1 = require("./dto/create-customer.dto");
const decorator_1 = require("../../decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../guards");
const dto_1 = require("./dto");
const auth_customer_service_1 = require("./auth-customer.service");
let AuthCustomerController = class AuthCustomerController {
    constructor(authCustomerService) {
        this.authCustomerService = authCustomerService;
    }
    async register(dto) {
        return this.authCustomerService.register(dto);
    }
    async login(dto) {
        return this.authCustomerService.login(dto);
    }
    async logout(user) {
        return this.authCustomerService.logout(user.id);
    }
    async refreshTokens(dto) {
        return this.authCustomerService.refreshTokens(dto.refreshToken);
    }
    async sendOtp(dto) {
        return this.authCustomerService.sendOtp(dto);
    }
};
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CustomerRegisterDto]),
    __metadata("design:returntype", Promise)
], AuthCustomerController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CustomerLoginDto]),
    __metadata("design:returntype", Promise)
], AuthCustomerController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthCustomerController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CustomerRefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthCustomerController.prototype, "refreshTokens", null);
__decorate([
    (0, common_1.Post)('send-otp'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SendOtpDto]),
    __metadata("design:returntype", Promise)
], AuthCustomerController.prototype, "sendOtp", null);
AuthCustomerController = __decorate([
    (0, common_1.Controller)('auth/user'),
    (0, swagger_1.ApiTags)('Auth User'),
    __metadata("design:paramtypes", [auth_customer_service_1.AuthCustomerService])
], AuthCustomerController);
exports.AuthCustomerController = AuthCustomerController;
//# sourceMappingURL=auth-customer.controller.js.map