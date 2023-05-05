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
exports.ProvinceController = void 0;
const vi_address_provide_entities_1 = require("../../database/entities/vi-address-provide.entities");
const decorator_1 = require("../../decorator");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const province_service_1 = require("./province.service");
const axios_1 = require("axios");
let ProvinceController = class ProvinceController {
    constructor(provinceService) {
        this.provinceService = provinceService;
    }
    async findAll(pagination) {
        return await this.provinceService.findAll(pagination);
    }
    async findOne(id) {
        return await this.provinceService.findOneById(id);
    }
    async crawlData() {
        const url = 'https://thongtindoanhnghiep.co/api/city';
        const response = await axios_1.default.get(url);
        console.log(response.data.LtsItem);
        return response.data.LtsItem;
    }
    async create(province) {
        return await this.provinceService.create(province);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorator_1.GetPagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('/crawl'),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "crawlData", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vi_address_provide_entities_1.Province]),
    __metadata("design:returntype", Promise)
], ProvinceController.prototype, "create", null);
ProvinceController = __decorate([
    (0, common_1.Controller)('province'),
    (0, swagger_1.ApiTags)('province'),
    __metadata("design:paramtypes", [province_service_1.ProvinceService])
], ProvinceController);
exports.ProvinceController = ProvinceController;
//# sourceMappingURL=province.controller.js.map