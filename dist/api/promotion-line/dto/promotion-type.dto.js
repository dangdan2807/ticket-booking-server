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
exports.ProductDiscountPercentDto = exports.ProductDiscountDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ProductDiscountDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsInt)({ message: 'QUANTITY_BUY_MUST_BE_INTEGER' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProductDiscountDto.prototype, "quantityBuy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsInt)({ message: 'PURCHASE_AMOUNT_MUST_BE_INT' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProductDiscountDto.prototype, "purchaseAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)({ message: 'REDUCTION_AMOUNT_IS_INT' }),
    (0, class_validator_1.Min)(0, { message: 'REDUCTION_AMOUNT_GREATER_THAN_OR_EQUAL_TO_0' }),
    __metadata("design:type", Number)
], ProductDiscountDto.prototype, "reductionAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)({ message: 'MAX_REDUCTION_AMOUNT_MUST_BE_INT' }),
    (0, class_validator_1.Min)(0, { message: 'MAX_REDUCTION_AMOUNT_GREATER_THAN_OR_EQUAL_TO_0' }),
    __metadata("design:type", Number)
], ProductDiscountDto.prototype, "maxReductionAmount", void 0);
exports.ProductDiscountDto = ProductDiscountDto;
class ProductDiscountPercentDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsInt)({ message: 'QUANTITY_BUY_MUST_BE_INTEGER' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProductDiscountPercentDto.prototype, "quantityBuy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0 }),
    (0, class_validator_1.IsInt)({ message: 'PURCHASE_AMOUNT_MUST_BE_INT' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProductDiscountPercentDto.prototype, "purchaseAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)({ message: 'PERCENT_DISCOUNT_IS_INT' }),
    (0, class_validator_1.Min)(1, { message: 'PERCENT_DISCOUNT_GREATER_THAN_OR_EQUAL_TO_1' }),
    __metadata("design:type", Number)
], ProductDiscountPercentDto.prototype, "percentDiscount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10000 }),
    (0, class_validator_1.IsInt)({ message: 'MAX_REDUCTION_AMOUNT_MUST_BE_INT' }),
    (0, class_validator_1.Min)(0, { message: 'MAX_REDUCTION_AMOUNT_GREATER_THAN_OR_EQUAL_TO_0' }),
    __metadata("design:type", Number)
], ProductDiscountPercentDto.prototype, "maxReductionAmount", void 0);
exports.ProductDiscountPercentDto = ProductDiscountPercentDto;
//# sourceMappingURL=promotion-type.dto.js.map