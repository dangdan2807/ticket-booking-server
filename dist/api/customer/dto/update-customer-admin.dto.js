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
exports.UpdateCustomerForAdminDto = void 0;
const enums_1 = require("./../../../enums");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const gender_enum_1 = require("../../../enums/gender.enum");
class UpdateCustomerForAdminDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'superman' }),
    (0, class_validator_1.IsString)({ message: 'FULL_NAME_MUST_BE_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerForAdminDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 26914 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 }, { message: 'WARD_CODE_MUST_BE_NUMBER' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateCustomerForAdminDto.prototype, "wardCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Demo' }),
    (0, class_validator_1.IsString)({ message: 'ADDRESS_MUST_BE_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerForAdminDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: new Date('2000-01-01') }),
    (0, class_validator_1.IsDate)({ message: 'BIRTHDAY_IS_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateCustomerForAdminDto.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: gender_enum_1.GenderEnum.OTHER, enum: gender_enum_1.GenderEnum }),
    (0, class_validator_1.IsEnum)(gender_enum_1.GenderEnum, { message: 'GENDER_IS_ENUM' }),
    (0, class_validator_1.IsString)({ message: 'GENDER_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerForAdminDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'NOTE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerForAdminDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'e80fcd4f-acad-4b04-b862-f66468348bb3' }),
    (0, class_validator_1.IsString)({ message: 'CUSTOMER_GROUP_ID_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerForAdminDto.prototype, "customerGroupId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'DEFAULT' }),
    (0, class_validator_1.IsString)({ message: 'CUSTOMER_GROUP_CODE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerForAdminDto.prototype, "customerGroupCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.UserStatusEnum.INACTIVATE,
        enum: enums_1.UserStatusEnum,
    }),
    (0, class_validator_1.IsEnum)(enums_1.UserStatusEnum, { message: 'CUSTOMER_STATUS_IS_ENUM' }),
    (0, class_validator_1.IsString)({ message: 'CUSTOMER_STATUS_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerForAdminDto.prototype, "status", void 0);
exports.UpdateCustomerForAdminDto = UpdateCustomerForAdminDto;
//# sourceMappingURL=update-customer-admin.dto.js.map