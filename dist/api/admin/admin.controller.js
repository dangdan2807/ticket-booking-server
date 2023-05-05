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
exports.AdminController = void 0;
const roles_enum_1 = require("./../../enums/roles.enum");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_service_1 = require("./admin.service");
const decorator_1 = require("./../../decorator");
const guards_1 = require("./../../auth/guards");
const dto_1 = require("./dto");
const dto_2 = require("../user/dto");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async profile(user) {
        return this.adminService.profile(user === null || user === void 0 ? void 0 : user.id);
    }
    async updatePassword(user, dto) {
        return this.adminService.updatePassword(user === null || user === void 0 ? void 0 : user.id, dto);
    }
    async updateResetPassword(user, dto) {
        return this.adminService.resetPassword(dto);
    }
    async confirmAccount(dto) {
        return this.adminService.confirmAccount(dto);
    }
};
__decorate([
    (0, common_1.Get)('profile'),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "profile", null);
__decorate([
    (0, common_1.Patch)('password'),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.AdminUpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Patch)('reset-password'),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.AdminResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateResetPassword", null);
__decorate([
    (0, common_1.Post)('active'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.ConfirmAccountDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "confirmAccount", null);
AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, swagger_1.ApiTags)('Admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map