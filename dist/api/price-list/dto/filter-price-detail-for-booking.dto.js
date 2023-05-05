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
exports.FilterPriceDetailForBookingDto = void 0;
const enums_1 = require("../../../enums");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const moment = require("moment");
moment.locale('vi');
class FilterPriceDetailForBookingDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: moment().format('YYYY-MM-DD') }),
    (0, class_validator_1.IsDate)({ message: 'APPLY_DATE_IS_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FilterPriceDetailForBookingDto.prototype, "applyDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'MDBL' }),
    (0, class_validator_1.IsString)({ message: 'TRIP_CODE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPriceDetailForBookingDto.prototype, "tripCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'GGGG' }),
    (0, class_validator_1.IsString)({ message: 'TRIP_DETAIL_CODE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterPriceDetailForBookingDto.prototype, "tripDetailCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: enums_1.VehicleTypeEnum.LIMOUSINE,
        enum: [
            '',
            enums_1.VehicleTypeEnum.LIMOUSINE,
            enums_1.VehicleTypeEnum.SLEEPER_BUS,
            enums_1.VehicleTypeEnum.SEAT_BUS,
        ],
    }),
    (0, class_validator_1.IsEnum)([
        '',
        enums_1.VehicleTypeEnum.LIMOUSINE,
        enums_1.VehicleTypeEnum.SLEEPER_BUS,
        enums_1.VehicleTypeEnum.SEAT_BUS,
    ], { message: 'SEAT_TYPE_IS_ENUM' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'SEAT_TYPE_IS_REQUIRED' }),
    __metadata("design:type", String)
], FilterPriceDetailForBookingDto.prototype, "seatType", void 0);
exports.FilterPriceDetailForBookingDto = FilterPriceDetailForBookingDto;
//# sourceMappingURL=filter-price-detail-for-booking.dto.js.map