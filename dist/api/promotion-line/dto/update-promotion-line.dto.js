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
exports.UpdatePromotionLineDto = void 0;
const enums_1 = require("../../../enums");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const moment = require("moment");
const _1 = require(".");
moment.locale('vi');
class UpdatePromotionLineDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'TITLE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePromotionLineDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Chương trình khuyến mãi tháng 3/2023' }),
    (0, class_validator_1.IsString)({ message: 'DESCRIPTION_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePromotionLineDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'NOTE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePromotionLineDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'TRIP_CODE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePromotionLineDto.prototype, "tripCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: moment().add(1, 'days').format('YYYY-MM-DD'),
    }),
    (0, class_validator_1.IsDate)({ message: 'START_DATE_IS_DATE' }),
    (0, class_validator_1.MinDate)(new Date(moment().format('YYYY-MM-DD')), {
        message: 'START_DATE_GREATER_THAN_NOW',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdatePromotionLineDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: moment().add(10, 'days').format('YYYY-MM-DD'),
    }),
    (0, class_validator_1.IsDate)({ message: 'END_DATE_IS_DATE' }),
    (0, class_validator_1.MinDate)(new Date(moment().format('YYYY-MM-DD')), {
        message: 'END_DATE_GREATER_THAN_NOW',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdatePromotionLineDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 100 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 }, { message: 'MAX_QUANTITY_MUST_BE_INTEGER' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePromotionLineDto.prototype, "maxQuantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1000000 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 }, { message: 'BUDGET_IS_NUMBER' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePromotionLineDto.prototype, "maxBudget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.PromotionTypeEnum.PRODUCT_DISCOUNT_PERCENT,
        enum: enums_1.PromotionTypeEnum,
    }),
    (0, class_validator_1.IsString)({ message: 'PROMOTION_LINE_TYPE_IS_STRING' }),
    (0, class_validator_1.IsEnum)(enums_1.PromotionTypeEnum, { message: 'PROMOTION_LINE_TYPE_IS_ENUM' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePromotionLineDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: _1.ProductDiscountDto }),
    (0, class_validator_1.ValidateIf)((dto) => dto.type === enums_1.PromotionTypeEnum.PRODUCT_DISCOUNT),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => _1.ProductDiscountDto),
    __metadata("design:type", _1.ProductDiscountDto)
], UpdatePromotionLineDto.prototype, "productDiscount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: _1.ProductDiscountPercentDto }),
    (0, class_validator_1.ValidateIf)((dto) => dto.type === enums_1.PromotionTypeEnum.PRODUCT_DISCOUNT_PERCENT),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => _1.ProductDiscountPercentDto),
    __metadata("design:type", _1.ProductDiscountPercentDto)
], UpdatePromotionLineDto.prototype, "productDiscountPercent", void 0);
exports.UpdatePromotionLineDto = UpdatePromotionLineDto;
//# sourceMappingURL=update-promotion-line.dto.js.map