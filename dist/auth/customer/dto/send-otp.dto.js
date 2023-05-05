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
exports.SendOtpDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SendOtpDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '09xxxxxxxx' }),
    (0, class_validator_1.IsPhoneNumber)('VN', { message: 'INVALID_PHONE_NUMBER' }),
    (0, class_validator_1.IsString)({ message: 'PHONE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SendOtpDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'superman@gmail.com' }),
    (0, class_validator_1.IsString)({ message: 'OLD_EMAIL_IS_STRING' }),
    (0, class_validator_1.IsEmail)({}, { message: 'OLD_EMAIL_INVALID' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SendOtpDto.prototype, "oldEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'superman@gmail.com' }),
    (0, class_validator_1.IsString)({ message: 'OLD_EMAIL_IS_STRING' }),
    (0, class_validator_1.IsEmail)({}, { message: 'NEW_EMAIL_INVALID' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SendOtpDto.prototype, "newEmail", void 0);
exports.SendOtpDto = SendOtpDto;
//# sourceMappingURL=send-otp.dto.js.map