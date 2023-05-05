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
exports.SaveTripDto = void 0;
const trip_status_enum_1 = require("../../../enums/trip-status.enum");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SaveTripDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bến xe miền đông - Bến xe Đức Long Bảo Lộc' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    (0, class_validator_1.IsString)({ message: 'Name is string' }),
    (0, class_validator_1.Length)(1, 100, { message: 'Name must be between 1 and 100 characters' }),
    __metadata("design:type", String)
], SaveTripDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Từ Hồ Chí Minh đi Bến xe Đức Long Bảo Lộc xuất phát từ 5h chiều hằng ngày',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SaveTripDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-02-12' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'start date is required' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SaveTripDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-02-15T02:37:29.450Z' }),
    (0, class_validator_1.IsDate)({ message: 'End date is date' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], SaveTripDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'd7d44845-b906-4a3c-be7b-232cc555f019' }),
    (0, class_validator_1.IsString)({ message: 'From Station Id is string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'From Station Id is required' }),
    (0, class_validator_1.Length)(36, 36, { message: 'From Station Id must be 36 characters' }),
    __metadata("design:type", String)
], SaveTripDto.prototype, "fromStationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'd7d44845-b906-4a3c-be7b-232cc555f071' }),
    (0, class_validator_1.IsString)({ message: 'To Station Id is string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'To Station Id is required' }),
    (0, class_validator_1.Length)(36, 36, { message: 'To Station Id must be 36 characters' }),
    __metadata("design:type", String)
], SaveTripDto.prototype, "toStationId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: trip_status_enum_1.TripStatusEnum.ACTIVE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(trip_status_enum_1.TripStatusEnum),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1),
    __metadata("design:type", trip_status_enum_1.TripStatusEnum)
], SaveTripDto.prototype, "isActive", void 0);
exports.SaveTripDto = SaveTripDto;
//# sourceMappingURL=save-trip.dto%20copy.js.map