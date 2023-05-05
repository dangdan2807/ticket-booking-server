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
exports.TicketGroupController = void 0;
const guards_1 = require("./../../auth/guards");
const roles_enum_1 = require("./../../enums/roles.enum");
const swagger_1 = require("@nestjs/swagger");
const ticket_group_service_1 = require("./ticket-group.service");
const common_1 = require("@nestjs/common");
const decorator_1 = require("./../../decorator");
const dto_1 = require("./dto");
let TicketGroupController = class TicketGroupController {
    constructor(ticketGroupService) {
        this.ticketGroupService = ticketGroupService;
    }
    async createTickerGroup(dto, user) {
        return await this.ticketGroupService.createTicketGroup(dto, user.id);
    }
    async findAll(user, dto, pagination) {
        return await this.ticketGroupService.findAllTicketGroup(dto, pagination);
    }
    async getTickerGroupById(id, user) {
        return await this.ticketGroupService.getTicketGroupById(id, user.id);
    }
    async getTickerGroupByCode(code, user) {
        return await this.ticketGroupService.getTicketGroupByCode(code, user.id);
    }
    async updateTicketGroupById(user, id, dto) {
        return await this.ticketGroupService.updateTicketGroupById(id, dto, user.id);
    }
    async updateTickerGroupByCode(user, code, dto) {
        return await this.ticketGroupService.updateTicketGroupByCode(code, dto, user.id);
    }
    async deleteTicketGroupById(user, id) {
        return await this.ticketGroupService.deleteTicketGroupById(id, user.id);
    }
    async deleteTicketGroupByCode(user, code) {
        return await this.ticketGroupService.deleteTicketGroupByCode(code, user.id);
    }
    async deleteMultipleByIds(user, dto) {
        return await this.ticketGroupService.deleteMultipleTicketGroupsByIds(user.id, dto);
    }
    async deleteMultipleByCodes(user, dto) {
        return await this.ticketGroupService.deleteMultipleTicketGroupsByCodes(user.id, dto);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateTicketGroupDto, Object]),
    __metadata("design:returntype", Promise)
], TicketGroupController.prototype, "createTickerGroup", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.FilterTicketGroupDto, Object]),
    __metadata("design:returntype", Promise)
], TicketGroupController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TicketGroupController.prototype, "getTickerGroupById", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TicketGroupController.prototype, "getTickerGroupByCode", null);
__decorate([
    (0, common_1.Patch)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.UpdateTicketGroupDto]),
    __metadata("design:returntype", Promise)
], TicketGroupController.prototype, "updateTicketGroupById", null);
__decorate([
    (0, common_1.Patch)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('code')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.UpdateTicketGroupDto]),
    __metadata("design:returntype", Promise)
], TicketGroupController.prototype, "updateTickerGroupByCode", null);
__decorate([
    (0, common_1.Delete)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TicketGroupController.prototype, "deleteTicketGroupById", null);
__decorate([
    (0, common_1.Delete)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TicketGroupController.prototype, "deleteTicketGroupByCode", null);
__decorate([
    (0, common_1.Delete)('multiple/ids'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.DeleteMultiTicketGroupDto]),
    __metadata("design:returntype", Promise)
], TicketGroupController.prototype, "deleteMultipleByIds", null);
__decorate([
    (0, common_1.Delete)('multiple/codes'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(roles_enum_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.DeleteMultiTicketGroupDto]),
    __metadata("design:returntype", Promise)
], TicketGroupController.prototype, "deleteMultipleByCodes", null);
TicketGroupController = __decorate([
    (0, common_1.Controller)('ticket-group'),
    (0, swagger_1.ApiTags)('Ticket Group'),
    __metadata("design:paramtypes", [ticket_group_service_1.TicketGroupService])
], TicketGroupController);
exports.TicketGroupController = TicketGroupController;
//# sourceMappingURL=ticket-group.controller.js.map