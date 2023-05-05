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
exports.SaveDistrictDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SaveDistrictDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Huyện Đông Anh' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'NAME_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'NAME_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'NAME_BETWEEN_1_100_CHARACTERS' }),
    __metadata("design:type", String)
], SaveDistrictDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'huyện' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'DISTRICT_TYPE_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'DISTRICT_TYPE_IS_STRING' }),
    (0, class_validator_1.Length)(1, 50, { message: 'DISTRICT_TYPE_LENGTH' }),
    __metadata("design:type", String)
], SaveDistrictDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 17 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'CODE_IS_REQUIRED' }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false }, { message: 'CODE_IS_NUMBER' }),
    __metadata("design:type", Number)
], SaveDistrictDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'huyen_dong_anh' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'CODENAME_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'CODENAME_IS_STRING' }),
    (0, class_validator_1.Length)(1, 255, { message: 'CODENAME_BETWEEN_1_255_CHARACTERS' }),
    __metadata("design:type", String)
], SaveDistrictDto.prototype, "codename", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'PROVINCE_CODE_IS_REQUIRED' }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false }, { message: 'PROVINCE_CODE_IS_NUMBER' }),
    __metadata("design:type", Number)
], SaveDistrictDto.prototype, "provinceCode", void 0);
exports.SaveDistrictDto = SaveDistrictDto;
//# sourceMappingURL=save-district.dto.js.map