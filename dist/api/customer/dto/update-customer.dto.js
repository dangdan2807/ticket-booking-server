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
exports.UpdateCustomerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../../enums");
const class_validator_1 = require("class-validator");
class UpdateCustomerDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'superman' }),
    (0, class_validator_1.IsString)({ message: 'FULL_NAME_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '',
        enum: ['', enums_1.GenderEnum.MALE, enums_1.GenderEnum.FEMALE, enums_1.GenderEnum.OTHER],
    }),
    (0, class_validator_1.IsEnum)(['', enums_1.GenderEnum.MALE, enums_1.GenderEnum.FEMALE, enums_1.GenderEnum.OTHER], {
        message: 'GENDER_IS_ENUM',
    }),
    (0, class_validator_1.IsString)({ message: 'GENDER_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'quang trung' }),
    (0, class_validator_1.IsString)({ message: 'ADDRESS_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCustomerDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: new Date(`${new Date().toDateString()}`) }),
    (0, class_validator_1.IsDate)({ message: 'BIRTHDAY_IS_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateCustomerDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5514 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 }, { message: 'WARD_ID_IS_NUMBER' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateCustomerDto.prototype, "wardId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 27007 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 }, { message: 'WARD_CODE_IS_NUMBER' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateCustomerDto.prototype, "wardCode", void 0);
exports.UpdateCustomerDto = UpdateCustomerDto;
//# sourceMappingURL=update-customer.dto.js.map