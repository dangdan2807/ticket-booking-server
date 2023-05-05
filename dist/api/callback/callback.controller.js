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
exports.CallbackController = void 0;
const common_1 = require("@nestjs/common");
const callback_service_1 = require("./callback.service");
const swagger_1 = require("@nestjs/swagger");
let CallbackController = class CallbackController {
    constructor(callbackService) {
        this.callbackService = callbackService;
    }
    async callbackZaloPayV2(dto) {
        return await this.callbackService.callbackZaloPayV2(dto);
    }
};
__decorate([
    (0, common_1.Post)('zalopay'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CallbackController.prototype, "callbackZaloPayV2", null);
CallbackController = __decorate([
    (0, common_1.Controller)('callback'),
    (0, swagger_1.ApiTags)('Callback'),
    __metadata("design:paramtypes", [callback_service_1.CallbackService])
], CallbackController);
exports.CallbackController = CallbackController;
//# sourceMappingURL=callback.controller.js.map