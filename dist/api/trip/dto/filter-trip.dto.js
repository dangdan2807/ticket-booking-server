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
exports.FilterTripDto = void 0;
const enums_1 = require("./../../../enums");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FilterTripDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Bến xe miền đông - Bến xe Đức Long Bảo Lộc',
    }),
    (0, class_validator_1.IsString)({ message: 'KEYWORDS_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterTripDto.prototype, "keywords", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2023-02-15' }),
    (0, class_validator_1.IsDate)({ message: 'TRIP_START_DATE_INVALID' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterTripDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-02-15T02:37:29.450Z' }),
    (0, class_validator_1.IsDate)({ message: 'TRIP_END_DATE_INVALID' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterTripDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.ActiveStatusEnum.ACTIVE,
        enum: ['', enums_1.ActiveStatusEnum.ACTIVE, enums_1.ActiveStatusEnum.INACTIVE],
    }),
    (0, class_validator_1.IsString)({ message: 'TRIP_STATUS_IS_STRING' }),
    (0, class_validator_1.IsEnum)(enums_1.ActiveStatusEnum, { message: 'TRIP_STATUS_IS_ENUM' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterTripDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: enums_1.SortEnum.ASC, enum: enums_1.SortEnum }),
    (0, class_validator_1.IsString)({ message: 'SORT_IS_STRING' }),
    (0, class_validator_1.IsEnum)(enums_1.SortEnum, { message: 'SORT_IS_ENUM' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterTripDto.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'd7d44845-b906-4a3c-be7b-232cc555f019' }),
    (0, class_validator_1.IsString)({ message: 'FROM_STATION_ID_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterTripDto.prototype, "fromStationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'd7d44845-b906-4a3c-be7b-232cc555f071' }),
    (0, class_validator_1.IsString)({ message: 'TO_STATION_ID_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterTripDto.prototype, "toStationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'FROM_STATION_CODE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterTripDto.prototype, "fromStationCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'TO_STATION_CODE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterTripDto.prototype, "toStationCode", void 0);
exports.FilterTripDto = FilterTripDto;
//# sourceMappingURL=filter-trip.dto.js.map