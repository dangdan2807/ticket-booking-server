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
exports.AuthAdminController = void 0;
const admin_refresh_token_dto_1 = require("./dto/admin-refresh-token.dto");
const decorator_1 = require("./../../decorator");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../guards");
const admin_service_1 = require("./admin.service");
const dto_1 = require("./dto");
let AuthAdminController = class AuthAdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async register(user, dto) {
        return this.adminService.register(user === null || user === void 0 ? void 0 : user['id'], dto);
    }
    async login(dto) {
        return this.adminService.login(dto);
    }
    async profile(user) {
        return this.adminService.profile(user === null || user === void 0 ? void 0 : user['id']);
    }
    async logout(user) {
        return this.adminService.logout(user.id);
    }
    async refreshToken(dto) {
        return this.adminService.refreshToken(dto.refreshToken);
    }
};
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.AdminRegisterDto]),
    __metadata("design:returntype", Promise)
], AuthAdminController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AdminLoginDto]),
    __metadata("design:returntype", Promise)
], AuthAdminController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthAdminController.prototype, "profile", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthAdminController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_refresh_token_dto_1.AdminRefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthAdminController.prototype, "refreshToken", null);
AuthAdminController = __decorate([
    (0, common_1.Controller)('auth/admin'),
    (0, swagger_1.ApiTags)('Auth'),
    __metadata("design:paramtypes", [admin_service_1.AuthAdminService])
], AuthAdminController);
exports.AuthAdminController = AuthAdminController;
//# sourceMappingURL=admin.controller.js.map