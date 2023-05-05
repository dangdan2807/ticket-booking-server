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
exports.UpdateTripDto = void 0;
const enums_1 = require("../../../enums");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateTripDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Bến xe miền đông - Bến xe Đức Long Bảo Lộc',
    }),
    (0, class_validator_1.IsString)({ message: 'NAME_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTripDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Từ Hồ Chí Minh đi Bến xe Đức Long Bảo Lộc xuất phát từ 5h chiều hằng ngày',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'NOTE_IS_STRING' }),
    __metadata("design:type", String)
], UpdateTripDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2023-02-12' }),
    (0, class_validator_1.IsDate)({ message: 'START_DATE_IS_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateTripDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-02-15T02:37:29.450Z' }),
    (0, class_validator_1.IsDate)({ message: 'END_DATE_IS_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateTripDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'd7d44845-b906-4a3c-be7b-232cc555f019' }),
    (0, class_validator_1.IsString)({ message: 'FROM_STATION_ID_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTripDto.prototype, "fromStationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'd7d44845-b906-4a3c-be7b-232cc555f071' }),
    (0, class_validator_1.IsString)({ message: 'TO_STATION_ID_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTripDto.prototype, "toStationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.ActiveStatusEnum.ACTIVE,
        enum: ['', enums_1.ActiveStatusEnum.ACTIVE, enums_1.ActiveStatusEnum.INACTIVE],
    }),
    (0, class_validator_1.IsString)({ message: 'TRIP_STATUS_IS_STRING' }),
    (0, class_validator_1.IsEnum)(enums_1.ActiveStatusEnum, { message: 'TRIP_STATUS_IS_ENUM' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTripDto.prototype, "status", void 0);
exports.UpdateTripDto = UpdateTripDto;
//# sourceMappingURL=update-trip.dto.js.map