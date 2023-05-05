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
exports.CreatePromotionLineDto = void 0;
const enums_1 = require("./../../../enums");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const promotion_type_dto_1 = require("./promotion-type.dto");
const moment = require("moment");
moment.locale('vi');
class CreatePromotionLineDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'KM1' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'CODE_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'CODE_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'CODE_BETWEEN_1_100_CHARACTERS' }),
    __metadata("design:type", String)
], CreatePromotionLineDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'TITLE_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'TITLE_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'TITLE_LENGTH' }),
    __metadata("design:type", String)
], CreatePromotionLineDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Chương trình khuyến mãi tháng 3/2023' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'DESCRIPTION_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'DESCRIPTION_IS_STRING' }),
    (0, class_validator_1.Length)(0, 1000, { message: 'DESCRIPTION_BETWEEN_1_1000_CHARACTERS' }),
    __metadata("design:type", String)
], CreatePromotionLineDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'NOTE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePromotionLineDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'COUPON_CODE_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'COUPON_CODE_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'COUPON_CODE_BETWEEN_1_100_CHARACTERS' }),
    __metadata("design:type", String)
], CreatePromotionLineDto.prototype, "couponCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: moment().format('YYYY-MM-DD') }),
    (0, class_validator_1.IsNotEmpty)({ message: 'START_DATE_IS_REQUIRED' }),
    (0, class_validator_1.IsDate)({ message: 'START_DATE_IS_DATE' }),
    (0, class_validator_1.MinDate)(new Date(moment().format('YYYY-MM-DD')), {
        message: 'START_DATE_GREATER_THAN_NOW',
    }),
    __metadata("design:type", Date)
], CreatePromotionLineDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: moment().add(10, 'days').format('YYYY-MM-DD'),
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'START_DATE_IS_REQUIRED' }),
    (0, class_validator_1.IsDate)({ message: 'END_DATE_IS_DATE' }),
    (0, class_validator_1.MinDate)(new Date(moment().format('YYYY-MM-DD')), {
        message: 'END_DATE_GREATER_THAN_NOW',
    }),
    __metadata("design:type", Date)
], CreatePromotionLineDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'MAX_QUANTITY_IS_REQUIRED' }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 }, { message: 'MAX_QUANTITY_IS_NUMBER' }),
    (0, class_validator_1.Min)(1, { message: 'MAX_QUANTITY_MIN_1' }),
    (0, class_validator_1.IsInt)({ message: 'MAX_QUANTITY_MUST_BE_INTEGER' }),
    __metadata("design:type", Number)
], CreatePromotionLineDto.prototype, "maxQuantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'MAX_QUANTITY_PER_CUSTOMER_IS_REQUIRED' }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 }, { message: 'MAX_QUANTITY_PER_CUSTOMER_IS_NUMBER' }),
    (0, class_validator_1.Min)(1, { message: 'MAX_QUANTITY_PER_CUSTOMER_MIN_1' }),
    (0, class_validator_1.IsInt)({ message: 'MAX_QUANTITY_PER_CUSTOMER_MUST_BE_INTEGER' }),
    __metadata("design:type", Number)
], CreatePromotionLineDto.prototype, "maxQuantityPerCustomer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000000 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'BUDGET_IS_REQUIRED' }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 }, { message: 'BUDGET_IS_NUMBER' }),
    (0, class_validator_1.Min)(0, { message: 'BUDGET_MUST_BE_GREATER_THAN_0' }),
    __metadata("design:type", Number)
], CreatePromotionLineDto.prototype, "maxBudget", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'PROMOTION_CODE_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'PROMOTION_CODE_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'PROMOTION_CODE_BETWEEN_1_100_CHARACTERS' }),
    __metadata("design:type", String)
], CreatePromotionLineDto.prototype, "promotionCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: enums_1.PromotionTypeEnum.PRODUCT_DISCOUNT_PERCENT,
        enum: enums_1.PromotionTypeEnum,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'PROMOTION_LINE_TYPE_IS_REQUIRED' }),
    (0, class_validator_1.IsEnum)(enums_1.PromotionTypeEnum, { message: 'PROMOTION_LINE_TYPE_IS_ENUM' }),
    __metadata("design:type", String)
], CreatePromotionLineDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'TICKET_GROUP_CODE_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'TICKET_GROUP_CODE_MUST_BE_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'TICKET_GROUP_CODE_MUST_BE_BETWEEN_1_AND_100' }),
    __metadata("design:type", String)
], CreatePromotionLineDto.prototype, "ticketGroupCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: promotion_type_dto_1.ProductDiscountDto }),
    (0, class_validator_1.ValidateIf)((dto) => dto.type === enums_1.PromotionTypeEnum.PRODUCT_DISCOUNT),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => promotion_type_dto_1.ProductDiscountDto),
    __metadata("design:type", promotion_type_dto_1.ProductDiscountDto)
], CreatePromotionLineDto.prototype, "productDiscount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: promotion_type_dto_1.ProductDiscountPercentDto }),
    (0, class_validator_1.ValidateIf)((dto) => dto.type === enums_1.PromotionTypeEnum.PRODUCT_DISCOUNT_PERCENT),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => promotion_type_dto_1.ProductDiscountPercentDto),
    __metadata("design:type", promotion_type_dto_1.ProductDiscountPercentDto)
], CreatePromotionLineDto.prototype, "productDiscountPercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: promotion_type_dto_1.ProductGiveawayDto }),
    (0, class_validator_1.ValidateIf)((dto) => dto.type === enums_1.PromotionTypeEnum.PRODUCT_GIVEAWAYS),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => promotion_type_dto_1.ProductGiveawayDto),
    __metadata("design:type", promotion_type_dto_1.ProductGiveawayDto)
], CreatePromotionLineDto.prototype, "productGiveaway", void 0);
exports.CreatePromotionLineDto = CreatePromotionLineDto;
//# sourceMappingURL=create-promotion-line.dto%20copy.js.map