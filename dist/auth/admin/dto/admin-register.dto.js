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
exports.AdminRegisterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("./../../../enums");
const class_validator_1 = require("class-validator");
class AdminRegisterDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'dangdan2807+1@gmail.com' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'EMAIL_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'EMAIL_IS_STRING' }),
    (0, class_validator_1.MinLength)(6, { message: 'EMAIL_LENGTH' }),
    (0, class_validator_1.MaxLength)(100, { message: 'EMAIL_LENGTH' }),
    (0, class_validator_1.IsEmail)({}, { message: 'EMAIL_INVALID' }),
    __metadata("design:type", String)
], AdminRegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], AdminRegisterDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dan 2' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminRegisterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '0354043344' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminRegisterDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: enums_1.GenderEnum.FEMALE, enum: enums_1.GenderEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.GenderEnum),
    __metadata("design:type", String)
], AdminRegisterDto.prototype, "gender", void 0);
exports.AdminRegisterDto = AdminRegisterDto;
//# sourceMappingURL=admin-register.dto.js.map