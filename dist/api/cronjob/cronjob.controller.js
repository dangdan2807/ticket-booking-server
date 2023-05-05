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
exports.CronjobController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cronjob_service_1 = require("./cronjob.service");
const dto_1 = require("./dto");
let CronjobController = class CronjobController {
    constructor(cronjobService) {
        this.cronjobService = cronjobService;
    }
    async createOrder(dto) {
        return await this.cronjobService.cronjobOrderPayment(dto);
    }
};
__decorate([
    (0, common_1.Post)('/order-payment'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CronjobOrderPaymentDto]),
    __metadata("design:returntype", Promise)
], CronjobController.prototype, "createOrder", null);
CronjobController = __decorate([
    (0, common_1.Controller)('cronjob'),
    (0, swagger_1.ApiTags)('Cronjob'),
    __metadata("design:paramtypes", [cronjob_service_1.CronjobService])
], CronjobController);
exports.CronjobController = CronjobController;
//# sourceMappingURL=cronjob.controller.js.map