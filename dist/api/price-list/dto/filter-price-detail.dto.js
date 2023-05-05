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
exports.FilterPriceDetailDto = void 0;
const enums_1 = require("./../../../enums");
const sort_enum_1 = require("./../../../enums/sort.enum");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FilterPriceDetailDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 100000 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false }, { message: 'MAX_PRICE_IS_NUMBER' }),
    (0, class_validator_1.Min)(0, { message: 'MAX_PRICE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterPriceDetailDto.prototype, "maxPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 100000 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false }, { message: 'MIN_PRICE_IS_NUMBER' }),
    (0, class_validator_1.Min)(0, { message: 'MIN_PRICE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterPriceDetailDto.prototype, "minPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'chuyến xe lúc 5h sài gòn - đà lạt' }),
    (0, class_validator_1.IsString)({ message: 'KEYWORDS_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPriceDetailDto.prototype, "keywords", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'PRICE_LIST_CODE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPriceDetailDto.prototype, "priceListCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.VehicleTypeEnum.LIMOUSINE,
        enum: [
            '',
            enums_1.VehicleTypeEnum.LIMOUSINE,
            enums_1.VehicleTypeEnum.SLEEPER_BUS,
            enums_1.VehicleTypeEnum.SEAT_BUS,
        ],
    }),
    (0, class_validator_1.IsEnum)([
        '',
        enums_1.VehicleTypeEnum.LIMOUSINE,
        enums_1.VehicleTypeEnum.SLEEPER_BUS,
        enums_1.VehicleTypeEnum.SEAT_BUS,
    ], { message: 'SEAT_TYPE_IS_ENUM' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPriceDetailDto.prototype, "seatType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: sort_enum_1.SortEnum.DESC,
        enum: ['', sort_enum_1.SortEnum.ASC, sort_enum_1.SortEnum.DESC],
    }),
    (0, class_validator_1.IsEnum)(['', sort_enum_1.SortEnum.ASC, sort_enum_1.SortEnum.DESC], { message: 'SORT_IS_ENUM' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPriceDetailDto.prototype, "sort", void 0);
exports.FilterPriceDetailDto = FilterPriceDetailDto;
//# sourceMappingURL=filter-price-detail.dto.js.map