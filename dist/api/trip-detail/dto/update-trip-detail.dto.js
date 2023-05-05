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
exports.UpdateTripDetailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("./../../../enums");
class UpdateTripDetailDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2023-02-12' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'INVALID_DATE' }),
    __metadata("design:type", Date)
], UpdateTripDetailDto.prototype, "departureTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2023-02-12' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ context: { errorCode: 400, description: 'INVALID_DATE' } }),
    __metadata("design:type", Date)
], UpdateTripDetailDto.prototype, "expectedTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.TripDetailStatusEnum.NOT_SOLD_OUT,
        enum: enums_1.TripDetailStatusEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'INVALID_STRING' }),
    (0, class_validator_1.IsEnum)(enums_1.TripDetailStatusEnum, { message: 'INVALID_TRIP_DETAIL_STATUS' }),
    __metadata("design:type", String)
], UpdateTripDetailDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '8d453086-e6a2-4a2e-a407-5ce2be3b0ba8' }),
    (0, class_validator_1.IsString)({ message: 'VEHICLE_ID_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTripDetailDto.prototype, "vehicleId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'VEHICLE_CODE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTripDetailDto.prototype, "vehicleCode", void 0);
exports.UpdateTripDetailDto = UpdateTripDetailDto;
//# sourceMappingURL=update-trip-detail.dto.js.map