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
exports.UserResetPasswordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UserResetPasswordDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '09xxxxxxxx' }),
    (0, class_validator_1.IsPhoneNumber)('VN', { message: 'INVALID_PHONE_NUMBER' }),
    (0, class_validator_1.IsString)({ message: 'PHONE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserResetPasswordDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'superman@gmail.com' }),
    (0, class_validator_1.IsString)({ message: 'EMAIL_IS_STRING' }),
    (0, class_validator_1.IsEmail)({}, { message: 'EMAIL_INVALID' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserResetPasswordDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12345678' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'NEW_PASSWORD_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'NEW_PASSWORD_MUST_BE_STRING' }),
    (0, class_validator_1.MinLength)(6, { message: 'NEW_PASSWORD_MIN_6_CHARACTERS' }),
    __metadata("design:type", String)
], UserResetPasswordDto.prototype, "newPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12345678' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'CONFIRM_NEW_PASSWORD_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'CONFIRM_NEW_PASSWORD_MUST_BE_STRING' }),
    (0, class_validator_1.MinLength)(6, { message: 'CONFIRM_NEW_PASSWORD_MIN_6_CHARACTERS' }),
    __metadata("design:type", String)
], UserResetPasswordDto.prototype, "confirmNewPassword", void 0);
exports.UserResetPasswordDto = UserResetPasswordDto;
//# sourceMappingURL=reset-password.dto.js.map