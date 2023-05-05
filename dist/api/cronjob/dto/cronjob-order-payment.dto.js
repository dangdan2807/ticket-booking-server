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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronjobOrderPaymentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CronjobOrderPaymentDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456789' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'SECRET_KEY_MUST_BE_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'SECRET_KEY_MUST_BE_STRING' }),
    __metadata("design:type", String)
], CronjobOrderPaymentDto.prototype, "secretKey", void 0);
exports.CronjobOrderPaymentDto = CronjobOrderPaymentDto;
//# sourceMappingURL=cronjob-order-payment.dto.js.map