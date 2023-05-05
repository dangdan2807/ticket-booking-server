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
exports.AuthUserController = void 0;
const create_customer_dto_1 = require("./../../api/customer/dto/create-customer.dto");
const decorator_1 = require("./../../decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../guards");
const dto_1 = require("./dto");
const user_service_1 = require("./user.service");
let AuthUserController = class AuthUserController {
    constructor(userService) {
        this.userService = userService;
    }
    async register(dto) {
        return this.userService.register(dto);
    }
    async login(dto) {
        return this.userService.login(dto);
    }
    async logout(user) {
        return this.userService.logout(user.id);
    }
    async refreshTokens(dto) {
        return this.userService.refreshTokens(dto.refreshToken);
    }
};
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CustomerRegisterDto]),
    __metadata("design:returntype", Promise)
], AuthUserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CustomerLoginDto]),
    __metadata("design:returntype", Promise)
], AuthUserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthUserController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UserRefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthUserController.prototype, "refreshTokens", null);
AuthUserController = __decorate([
    (0, common_1.Controller)('auth/user'),
    (0, swagger_1.ApiTags)('Auth'),
    __metadata("design:paramtypes", [user_service_1.AuthUserService])
], AuthUserController);
exports.AuthUserController = AuthUserController;
//# sourceMappingURL=user.controller.js.map