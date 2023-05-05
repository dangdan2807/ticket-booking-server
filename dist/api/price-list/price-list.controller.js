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
exports.PriceListController = void 0;
const guards_1 = require("./../../auth/guards");
const enums_1 = require("./../../enums");
const decorator_1 = require("./../../decorator");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const price_list_service_1 = require("./price-list.service");
let PriceListController = class PriceListController {
    constructor(priceListService) {
        this.priceListService = priceListService;
    }
    async getPriceListStatus() {
        return await this.priceListService.getPriceListStatus();
    }
    async createPriceList(dto, user) {
        return await this.priceListService.createPriceList(dto, user.id);
    }
    async findAllPriceList(dto, pagination) {
        return await this.priceListService.findAllPriceList(dto, pagination);
    }
    async getPriceListById(id) {
        return await this.priceListService.getPriceListById(id);
    }
    async getPriceListByCode(code) {
        return await this.priceListService.getPriceListByCode(code);
    }
    async updatePriceListById(user, id, dto) {
        return await this.priceListService.updatePriceListByIdOrCode(user.id, dto, id);
    }
    async updatePriceListByCode(user, code, dto) {
        return await this.priceListService.updatePriceListByIdOrCode(user.id, dto, undefined, code);
    }
    async deletePriceListById(user, id) {
        return await this.priceListService.deletePriceListByIdOrCode(user.id, id);
    }
    async deletePriceListByCode(user, code) {
        return await this.priceListService.deletePriceListByIdOrCode(user.id, undefined, code);
    }
    async deleteMultiplePriceListByIds(user, dto) {
        return await this.priceListService.deleteMultiPriceListByIdsOrCodes(user.id, dto, 'id');
    }
    async deleteMultiplePriceListByCodes(user, dto) {
        return await this.priceListService.deleteMultiPriceListByIdsOrCodes(user.id, dto, 'code');
    }
    async getPriceDetailSeatType() {
        return await this.priceListService.getPriceDetailSeatType();
    }
    async findPriceDetailForBooking(dto) {
        return await this.priceListService.findPriceDetailForBooking(dto);
    }
    async createPriceDetail(user, dto) {
        return await this.priceListService.createPriceDetail(dto, user.id);
    }
    async findAllPriceDetail(dto, pagination) {
        return this.priceListService.findAllPriceDetail(dto, pagination);
    }
    async getPriceDetailById(id) {
        return await this.priceListService.getPriceDetailById(id, {
            select: {
                priceList: {
                    id: true,
                    code: true,
                },
            },
            relations: {
                priceList: true,
            },
        });
    }
    async getPriceDetailByCode(code) {
        return await this.priceListService.getPriceDetailByCode(code, {
            select: {
                priceList: {
                    id: true,
                    code: true,
                },
            },
            relations: {
                priceList: true,
            },
        });
    }
    async updatePriceDetailById(user, id, dto) {
        return this.priceListService.updatePriceDetailByIdOrCode(user.id, dto, id);
    }
    async updatePriceDetailByCode(user, code, dto) {
        return this.priceListService.updatePriceDetailByIdOrCode(user.id, dto, undefined, code);
    }
    async deletePriceDetailById(user, id) {
        return await this.priceListService.deletePriceDetailByIdOrCode(user.id, id);
    }
    async deletePriceDetailByCode(user, code) {
        return await this.priceListService.deletePriceDetailByIdOrCode(user.id, undefined, code);
    }
    async deleteMultiplePriceDetailByIds(user, dto) {
        return await this.priceListService.deleteMultiPriceDetailByIdsOrCodes(user.id, dto, enums_1.DeleteDtoTypeEnum.ID);
    }
    async deleteMultiplePriceDetailByCodes(user, dto) {
        return await this.priceListService.deleteMultiPriceDetailByIdsOrCodes(user.id, dto, enums_1.DeleteDtoTypeEnum.CODE);
    }
};
__decorate([
    (0, common_1.Get)('status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "getPriceListStatus", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePriceListDto, Object]),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "createPriceList", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterPriceListDto, Object]),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "findAllPriceList", null);
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
], PriceListController.prototype, "getPriceListById", null);
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
], PriceListController.prototype, "getPriceListByCode", null);
__decorate([
    (0, common_1.Patch)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.UpdatePriceListDto]),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "updatePriceListById", null);
__decorate([
    (0, common_1.Patch)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('code')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.UpdatePriceListDto]),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "updatePriceListByCode", null);
__decorate([
    (0, common_1.Delete)('id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "deletePriceListById", null);
__decorate([
    (0, common_1.Delete)('code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "deletePriceListByCode", null);
__decorate([
    (0, common_1.Delete)('multiple'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.DeletePriceListDto]),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "deleteMultiplePriceListByIds", null);
__decorate([
    (0, common_1.Delete)('multiple/codes'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.DeletePriceListDto]),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "deleteMultiplePriceListByCodes", null);
__decorate([
    (0, common_1.Get)('price-detail/seat-type'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "getPriceDetailSeatType", null);
__decorate([
    (0, common_1.Get)('price-detail/booking'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterPriceDetailForBookingDto]),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "findPriceDetailForBooking", null);
__decorate([
    (0, common_1.Post)('price-detail'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreatePriceDetailDto]),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "createPriceDetail", null);
__decorate([
    (0, common_1.Get)('price-detail'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterPriceDetailDto, Object]),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "findAllPriceDetail", null);
__decorate([
    (0, common_1.Get)('price-detail/id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "getPriceDetailById", null);
__decorate([
    (0, common_1.Get)('price-detail/code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "getPriceDetailByCode", null);
__decorate([
    (0, common_1.Patch)('price-detail/id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.UpdatePriceDetailDto]),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "updatePriceDetailById", null);
__decorate([
    (0, common_1.Patch)('price-detail/code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('code')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.UpdatePriceDetailDto]),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "updatePriceDetailByCode", null);
__decorate([
    (0, common_1.Delete)('price-detail/id/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "deletePriceDetailById", null);
__decorate([
    (0, common_1.Delete)('price-detail/code/:code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "deletePriceDetailByCode", null);
__decorate([
    (0, common_1.Delete)('price-detail/multiple'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.DeletePriceDetailDto]),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "deleteMultiplePriceDetailByIds", null);
__decorate([
    (0, common_1.Delete)('price-detail/multiple/code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorator_1.Roles)(enums_1.RoleEnum.STAFF),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.DeletePriceDetailDto]),
    __metadata("design:returntype", Promise)
], PriceListController.prototype, "deleteMultiplePriceDetailByCodes", null);
PriceListController = __decorate([
    (0, common_1.Controller)('price-list'),
    (0, swagger_1.ApiTags)('Price List'),
    __metadata("design:paramtypes", [price_list_service_1.PriceListService])
], PriceListController);
exports.PriceListController = PriceListController;
//# sourceMappingURL=price-list.controller.js.map