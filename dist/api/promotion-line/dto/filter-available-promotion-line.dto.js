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
exports.FilterAvailablePromotionLineDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const moment = require("moment");
moment.locale('vi');
class FilterAvailablePromotionLineDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: moment().format('YYYY-MM-DD') }),
    (0, class_validator_1.IsDate)({ message: 'START_DATE_IS_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterAvailablePromotionLineDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: moment().add(10, 'days').format('YYYY-MM-DD'),
    }),
    (0, class_validator_1.IsDate)({ message: 'END_DATE_IS_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterAvailablePromotionLineDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'TRIP_CODE_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'TRIP_CODE_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'TRIP_CODE_BETWEEN_1_100_CHARACTERS' }),
    __metadata("design:type", String)
], FilterAvailablePromotionLineDto.prototype, "tripCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 }, { message: 'MIN_QUANTITY_BUY_IS_NUMBER' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterAvailablePromotionLineDto.prototype, "minQuantityBuy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 }, { message: 'MIN_PURCHASE_AMOUNT_IS_NUMBER' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterAvailablePromotionLineDto.prototype, "minPurchaseAmount", void 0);
exports.FilterAvailablePromotionLineDto = FilterAvailablePromotionLineDto;
//# sourceMappingURL=filter-available-promotion-line.dto.js.map