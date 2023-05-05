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
exports.CreatePromotionHistoryDto = void 0;
const enums_1 = require("./../../../enums");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePromotionHistoryDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: enums_1.PromotionHistoryTypeEnum.PRODUCT_DISCOUNT_PERCENT }),
    (0, class_validator_1.IsNotEmpty)({ message: 'PROMOTION_HISTORY_TYPE_IS_REQUIRED' }),
    (0, class_validator_1.IsEnum)(enums_1.PromotionHistoryTypeEnum, {
        message: 'PROMOTION_HISTORY_TYPE_IS_ENUM',
    }),
    __metadata("design:type", String)
], CreatePromotionHistoryDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'PROMOTION_LINE_CODE_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'PROMOTION_LINE_CODE_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'PROMOTION_LINE_CODE_BETWEEN_1_100_CHARACTERS' }),
    __metadata("design:type", String)
], CreatePromotionHistoryDto.prototype, "promotionLineCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ORDER_CODE_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'ORDER_CODE_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'ORDER_CODE_BETWEEN_1_100_CHARACTERS' }),
    __metadata("design:type", String)
], CreatePromotionHistoryDto.prototype, "orderCode", void 0);
exports.CreatePromotionHistoryDto = CreatePromotionHistoryDto;
//# sourceMappingURL=create-promotion-history-cancel-promotion.dto.js.map