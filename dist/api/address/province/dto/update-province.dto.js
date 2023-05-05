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
exports.UpdateProvinceDto = void 0;
const province_type_enum_1 = require("./../../../../enums/province-type.enum");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateProvinceDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Thành phố Hà Nội' }),
    (0, class_validator_1.IsString)({ message: 'NAME_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProvinceDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: province_type_enum_1.ProvinceTypeEnum.MUNICIPALITY,
        enum: province_type_enum_1.ProvinceTypeEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'PROVINCE_TYPE_IS_STRING' }),
    __metadata("design:type", String)
], UpdateProvinceDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'thanh_pho_ha_noi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'CODENAME_IS_STRING' }),
    __metadata("design:type", String)
], UpdateProvinceDto.prototype, "codename", void 0);
exports.UpdateProvinceDto = UpdateProvinceDto;
//# sourceMappingURL=update-province.dto.js.map