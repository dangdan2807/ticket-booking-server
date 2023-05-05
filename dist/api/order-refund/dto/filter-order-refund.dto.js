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
exports.FilterOrderRefundDto = void 0;
const enums_1 = require("./../../../enums");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const moment = require("moment");
moment.locale('vi');
class FilterOrderRefundDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'keywords' }),
    (0, class_validator_1.IsString)({ message: 'KEYWORDS_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterOrderRefundDto.prototype, "keywords", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'CUSTOMER_CODE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterOrderRefundDto.prototype, "customerCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'STAFF_CODE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterOrderRefundDto.prototype, "staffCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: [enums_1.OrderRefundStatusEnum.PENDING, enums_1.OrderRefundStatusEnum.FINISHED],
        enum: [enums_1.OrderRefundStatusEnum.PENDING, enums_1.OrderRefundStatusEnum.FINISHED],
    }),
    (0, class_validator_1.IsEnum)([enums_1.OrderRefundStatusEnum.PENDING, enums_1.OrderRefundStatusEnum.FINISHED], {
        message: 'ORDER_REFUND_STATUS_IS_ENUM',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterOrderRefundDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0 }),
    (0, class_validator_1.IsNumber)({}, { message: 'MIN_FINAL_TOTAL_IS_NUMBER' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterOrderRefundDto.prototype, "minTotal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0 }),
    (0, class_validator_1.IsNumber)({}, { message: 'MAX_FINAL_TOTAL_IS_NUMBER' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterOrderRefundDto.prototype, "maxTotal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: moment().format('YYYY-MM-DD') }),
    (0, class_validator_1.IsDate)({ message: 'START_DATE_IS_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterOrderRefundDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: moment().add(10, 'days').format('YYYY-MM-DD'),
    }),
    (0, class_validator_1.IsDate)({ message: 'END_DATE_IS_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterOrderRefundDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: enums_1.SortEnum.ASC, enum: enums_1.SortEnum }),
    (0, class_validator_1.IsString)({ message: 'SORT_IS_STRING' }),
    (0, class_validator_1.IsEnum)(enums_1.SortEnum, { message: 'SORT_IS_ENUM' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterOrderRefundDto.prototype, "sort", void 0);
exports.FilterOrderRefundDto = FilterOrderRefundDto;
//# sourceMappingURL=filter-order-refund.dto.js.map