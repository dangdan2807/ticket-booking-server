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
exports.FilterPriceListDto = void 0;
const enums_1 = require("./../../../enums");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FilterPriceListDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Bảng giá tháng 3/2023' }),
    (0, class_validator_1.IsString)({ message: 'KEYWORDS_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPriceListDto.prototype, "keywords", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2023-03-01' }),
    (0, class_validator_1.IsDate)({ message: 'START_DATE_IS_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterPriceListDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2023-03-15' }),
    (0, class_validator_1.IsDate)({ message: 'END_DATE_IS_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterPriceListDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.ActiveStatusEnum.ACTIVE,
        enum: ['', enums_1.ActiveStatusEnum.ACTIVE, enums_1.ActiveStatusEnum.INACTIVE],
    }),
    (0, class_validator_1.IsString)({ message: 'PRICE_LIST_STATUS_IS_STRING' }),
    (0, class_validator_1.IsEnum)(enums_1.ActiveStatusEnum, { message: 'PRICE_LIST_STATUS_INVALID' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPriceListDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: enums_1.SortEnum.ASC, enum: enums_1.SortEnum }),
    (0, class_validator_1.IsString)({ message: 'SORT_IS_STRING' }),
    (0, class_validator_1.IsEnum)(enums_1.SortEnum, { message: 'SORT_IS_ENUM' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPriceListDto.prototype, "sort", void 0);
exports.FilterPriceListDto = FilterPriceListDto;
//# sourceMappingURL=filter-price-list.dto.js.map