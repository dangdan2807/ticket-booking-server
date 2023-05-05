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
exports.RevenueCustomerStatisticsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const moment_1 = require("moment");
class RevenueCustomerStatisticsDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: (0, moment_1.default)().subtract(7, 'days').format('YYYY-MM-DD'),
    }),
    (0, class_validator_1.IsDate)({ message: 'START_DATE_IS_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], RevenueCustomerStatisticsDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: (0, moment_1.default)().format('YYYY-MM-DD'),
    }),
    (0, class_validator_1.IsDate)({ message: 'END_DATE_IS_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], RevenueCustomerStatisticsDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5 }),
    (0, class_validator_1.IsNumber)({}, { message: 'LIMIT_MUST_BE_NUMBER' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RevenueCustomerStatisticsDto.prototype, "limit", void 0);
exports.RevenueCustomerStatisticsDto = RevenueCustomerStatisticsDto;
//# sourceMappingURL=revenue-customers-statistics.dto%20copy.js.map