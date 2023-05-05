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
exports.CreateCustomerForAdminDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const gender_enum_1 = require("../../../enums/gender.enum");
const class_validator_2 = require("class-validator");
class CreateCustomerForAdminDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'superman@gmail.com' }),
    (0, class_validator_1.IsString)({ message: 'EMAIL_IS_STRING' }),
    (0, class_validator_1.IsEmail)({}, { message: 'EMAIL_INVALID' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerForAdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '0354043344' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'PHONE_IS_REQUIRED' }),
    (0, class_validator_1.IsPhoneNumber)('VN', { message: 'INVALID_PHONE_NUMBER' }),
    (0, class_validator_1.IsString)({ message: 'PHONE_IS_STRING' }),
    __metadata("design:type", String)
], CreateCustomerForAdminDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'superman' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'FULL_NAME_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'FULL_NAME_MUST_BE_STRING' }),
    (0, class_validator_1.MinLength)(1, { message: 'FULL_NAME_IS_MIN_LENGTH_1' }),
    (0, class_validator_1.MaxLength)(255, { message: 'FULL_NAME_IS_MAX_LENGTH_255' }),
    __metadata("design:type", String)
], CreateCustomerForAdminDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 26914 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 }, { message: 'WARD_CODE_MUST_BE_NUMBER' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCustomerForAdminDto.prototype, "wardCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Demo',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ADDRESS_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'ADDRESS_MUST_BE_STRING' }),
    (0, class_validator_2.Length)(1, 255, { message: 'ADDRESS_BETWEEN_1_255_CHARACTERS' }),
    __metadata("design:type", String)
], CreateCustomerForAdminDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: new Date(`${new Date().toDateString()}`) }),
    (0, class_validator_1.IsDate)({ message: 'BIRTHDAY_IS_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateCustomerForAdminDto.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'NOTE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerForAdminDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: gender_enum_1.GenderEnum.OTHER, enum: gender_enum_1.GenderEnum }),
    (0, class_validator_1.IsEnum)(gender_enum_1.GenderEnum, { message: 'GENDER_IS_ENUM' }),
    (0, class_validator_1.IsString)({ message: 'GENDER_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerForAdminDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'e80fcd4f-acad-4b04-b862-f66468348bb3' }),
    (0, class_validator_1.IsString)({ message: 'CUSTOMER_GROUP_ID_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerForAdminDto.prototype, "customerGroupId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5514 }),
    (0, class_validator_1.IsString)({ message: 'CUSTOMER_GROUP_CODE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCustomerForAdminDto.prototype, "customerGroupCode", void 0);
exports.CreateCustomerForAdminDto = CreateCustomerForAdminDto;
//# sourceMappingURL=create-customer-admin.dto.js.map