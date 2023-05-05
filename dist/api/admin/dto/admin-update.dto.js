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
exports.AdminUpdateDto = void 0;
const enums_1 = require("./../../../enums");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const moment = require("moment");
class AdminUpdateDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'fullName' }),
    (0, class_validator_1.IsString)({ message: 'FULL_NAME_MUST_BE_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminUpdateDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.GenderEnum.MALE,
        enum: ['', enums_1.GenderEnum.MALE, enums_1.GenderEnum.FEMALE, enums_1.GenderEnum.OTHER],
    }),
    (0, class_validator_1.IsEnum)(['', enums_1.GenderEnum.MALE, enums_1.GenderEnum.FEMALE, enums_1.GenderEnum.OTHER]),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminUpdateDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '12345678' }),
    (0, class_validator_1.IsString)({ message: 'ADDRESS_MUST_BE_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminUpdateDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: moment().subtract(18, 'years').format('YYYY-MM-DD'),
    }),
    (0, class_validator_1.IsString)({ message: 'BIRTHDAY_MUST_BE_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], AdminUpdateDto.prototype, "birthDay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '0123456789' }),
    (0, class_validator_1.IsString)({ message: 'WARD_CODE_MUST_BE_NUMBER' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminUpdateDto.prototype, "wardCode", void 0);
exports.AdminUpdateDto = AdminUpdateDto;
//# sourceMappingURL=admin-update.dto.js.map