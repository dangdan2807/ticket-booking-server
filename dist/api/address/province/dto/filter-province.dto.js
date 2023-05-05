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
exports.FilterProvinceDto = void 0;
const province_type_enum_1 = require("./../../../../enums/province-type.enum");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FilterProvinceDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'ha' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'NAME_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'NAME_BETWEEN_1_100_CHARACTERS' }),
    __metadata("design:type", String)
], FilterProvinceDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: province_type_enum_1.ProvinceTypeEnum.PROVINCE,
        enum: province_type_enum_1.ProvinceTypeEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(1, 50, { message: 'PROVINCE_TYPE_BETWEEN_1_50_CHARACTERS' }),
    (0, class_validator_1.IsEnum)(province_type_enum_1.ProvinceTypeEnum),
    __metadata("design:type", String)
], FilterProvinceDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'khanh' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'CODENAME_IS_STRING' }),
    (0, class_validator_1.Length)(1, 255, { message: 'CODENAME_BETWEEN_1_255_CHARACTERS' }),
    __metadata("design:type", String)
], FilterProvinceDto.prototype, "codename", void 0);
exports.FilterProvinceDto = FilterProvinceDto;
//# sourceMappingURL=filter-province.dto.js.map