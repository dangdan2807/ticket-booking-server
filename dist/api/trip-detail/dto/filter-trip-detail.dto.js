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
exports.FilterTripDetailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("./../../../enums");
const moment = require("moment");
moment.locale('vi');
class FilterTripDetailDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: moment().format('YYYY-MM-DD HH:mm') }),
    (0, class_validator_1.IsDate)({ message: 'INVALID_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterTripDetailDto.prototype, "minDepartureTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: moment().format('YYYY-MM-DD HH:mm') }),
    (0, class_validator_1.IsDate)({ message: 'INVALID_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterTripDetailDto.prototype, "departureTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: moment().format('YYYY-MM-DD HH:mm') }),
    (0, class_validator_1.IsDate)({ message: 'INVALID_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterTripDetailDto.prototype, "maxDepartureTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.TripDetailStatusEnum.NOT_SOLD_OUT,
        enum: [
            '',
            enums_1.TripDetailStatusEnum.NOT_SOLD_OUT,
            enums_1.TripDetailStatusEnum.SOLD_OUT,
        ],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'INVALID_STRING' }),
    (0, class_validator_1.IsEnum)(['', enums_1.TripDetailStatusEnum.NOT_SOLD_OUT, enums_1.TripDetailStatusEnum.SOLD_OUT], { message: 'INVALID_TRIP_DETAIL_STATUS' }),
    __metadata("design:type", String)
], FilterTripDetailDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '59464f9b-0be3-4929-b1ea-d2aa80c21a6a' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'TRIP_ID_IS_STRING' }),
    __metadata("design:type", String)
], FilterTripDetailDto.prototype, "tripId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'TRIP_CODE_IS_STRING' }),
    __metadata("design:type", String)
], FilterTripDetailDto.prototype, "tripCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 79 }),
    (0, class_validator_1.IsNumber)({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0,
    }, { message: 'FROM_PROVINCE_CODE_INVALID_NUMBER' }),
    (0, class_validator_1.Min)(0, { message: 'FROM_PROVINCE_CODE_GREATER_THAN_OR_EQUAL_TO_0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterTripDetailDto.prototype, "fromProvinceCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 68 }),
    (0, class_validator_1.IsNumber)({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0,
    }, { message: 'TO_PROVINCE_CODE_INVALID_NUMBER' }),
    (0, class_validator_1.Min)(0, { message: 'TO_PROVINCE_CODE_GREATER_THAN_OR_EQUAL_TO_0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FilterTripDetailDto.prototype, "toProvinceCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: enums_1.SortEnum.ASC, enum: enums_1.SortEnum }),
    (0, class_validator_1.IsString)({ message: 'SORT_IS_STRING' }),
    (0, class_validator_1.IsEnum)(enums_1.SortEnum, { message: 'SORT_IS_ENUM' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterTripDetailDto.prototype, "sort", void 0);
exports.FilterTripDetailDto = FilterTripDetailDto;
//# sourceMappingURL=filter-trip-detail.dto.js.map