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
exports.FilterPromotionLineDto = void 0;
const enums_1 = require("../../../enums");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const moment = require("moment");
moment.locale('vi');
class FilterPromotionLineDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'KEYWORDS_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPromotionLineDto.prototype, "keywords", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: moment().format('YYYY-MM-DD') }),
    (0, class_validator_1.IsDate)({ message: 'START_DATE_IS_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterPromotionLineDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: moment().add(10, 'days').format('YYYY-MM-DD'),
    }),
    (0, class_validator_1.IsDate)({ message: 'END_DATE_IS_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterPromotionLineDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 100 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 }, { message: 'USE_QUANTITY_IS_NUMBER' }),
    (0, class_validator_1.Min)(0, { message: 'MIN_USE_QUANTITY_IS_NUMBER' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterPromotionLineDto.prototype, "minUseQuantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 100 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 }, { message: 'USE_QUANTITY_IS_NUMBER' }),
    (0, class_validator_1.Min)(0, { message: 'MAX_USE_QUANTITY_IS_NUMBER' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterPromotionLineDto.prototype, "maxUseQuantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 100 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 }, { message: 'MAX_OF_MAX_QUANTITY_IS_NUMBER' }),
    (0, class_validator_1.Min)(0, { message: 'MAX_OF_MAX_QUANTITY_MIN_0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterPromotionLineDto.prototype, "maxOfMaxQuantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 100 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 }, { message: 'MIN_OF_MAX_QUANTITY_IS_NUMBER' }),
    (0, class_validator_1.Min)(0, { message: 'MIN_OF_MAX_QUANTITY_MIN_0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterPromotionLineDto.prototype, "minOfMaxQuantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1000000 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 }, { message: 'MIN_USE_BUDGET_IS_NUMBER' }),
    (0, class_validator_1.Min)(0, { message: 'MIN_USE_BUDGET_MUST_BE_GREATER_THAN_0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterPromotionLineDto.prototype, "minUseBudget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1000000 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 }, { message: 'MAX_USE_BUDGET_IS_NUMBER' }),
    (0, class_validator_1.Min)(0, { message: 'MAX_USE_BUDGET_MUST_BE_GREATER_THAN_0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterPromotionLineDto.prototype, "maxUseBudget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1000000 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 }, { message: 'MIN_OF_MAX_BUDGET_IS_NUMBER' }),
    (0, class_validator_1.Min)(0, { message: 'MIN_OF_MAX_BUDGET_MUST_BE_GREATER_THAN_0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterPromotionLineDto.prototype, "minOfMaxBudget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1000000 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 }, { message: 'MAX_OF_MAX_BUDGET_IS_NUMBER' }),
    (0, class_validator_1.Min)(0, { message: 'MAX_OF_MAX_BUDGET_MUST_BE_GREATER_THAN_0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterPromotionLineDto.prototype, "maxOfMaxBudget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'PROMOTION_CODE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPromotionLineDto.prototype, "promotionCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.PromotionTypeEnum.PRODUCT_DISCOUNT_PERCENT,
        enum: [
            '',
            enums_1.PromotionTypeEnum.PRODUCT_DISCOUNT_PERCENT,
            enums_1.PromotionTypeEnum.PRODUCT_DISCOUNT,
        ],
    }),
    (0, class_validator_1.IsEnum)(enums_1.PromotionTypeEnum, { message: 'PROMOTION_LINE_TYPE_IS_ENUM' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPromotionLineDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.SortEnum.ASC,
        enum: ['', enums_1.SortEnum.ASC, enums_1.SortEnum.DESC],
    }),
    (0, class_validator_1.IsEnum)(enums_1.SortEnum, { message: 'SORT_IS_ENUM' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPromotionLineDto.prototype, "sort", void 0);
exports.FilterPromotionLineDto = FilterPromotionLineDto;
//# sourceMappingURL=filter-promotion-line.dto.js.map