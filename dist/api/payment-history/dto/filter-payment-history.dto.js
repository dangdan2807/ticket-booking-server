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
exports.FilterPaymentHistoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("./../../../enums");
const class_validator_1 = require("class-validator");
const moment = require("moment");
moment.locale('vi');
class FilterPaymentHistoryDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'KEYWORDS_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPaymentHistoryDto.prototype, "keywords", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 }, { message: 'MIN_AMOUNT_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterPaymentHistoryDto.prototype, "minAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 }, { message: 'MAX_AMOUNT_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterPaymentHistoryDto.prototype, "maxAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'CUSTOMER_CODE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPaymentHistoryDto.prototype, "customerCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'STAFF_CODE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPaymentHistoryDto.prototype, "staffCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.PaymentHistoryStatusEnum.SUCCESS,
        enum: enums_1.PaymentHistoryStatusEnum,
    }),
    (0, class_validator_1.IsEnum)(enums_1.PaymentHistoryStatusEnum, {
        message: 'PAYMENT_HISTORY_STATUS_IS_ENUM',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPaymentHistoryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.PaymentMethodEnum.CASH,
        enum: enums_1.PaymentMethodEnum,
    }),
    (0, class_validator_1.IsEnum)(enums_1.PaymentMethodEnum, { message: 'PAYMENT_METHOD_IS_ENUM' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPaymentHistoryDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: moment().subtract(7, 'days').format('YYYY-MM-DD'),
    }),
    (0, class_validator_1.IsDate)({ message: 'FROM_DATE_PAYMENT_TIME_IS_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterPaymentHistoryDto.prototype, "fromDatePaymentTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: moment().format('YYYY-MM-DD') }),
    (0, class_validator_1.IsDate)({ message: 'TO_DATE_PAYMENT_TIME_IS_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterPaymentHistoryDto.prototype, "toDatePaymentTime", void 0);
exports.FilterPaymentHistoryDto = FilterPaymentHistoryDto;
//# sourceMappingURL=filter-payment-history.dto.js.map