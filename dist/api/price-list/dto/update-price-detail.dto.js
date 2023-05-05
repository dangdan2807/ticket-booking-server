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
exports.UpdatePriceDetailDto = void 0;
const enums_1 = require("./../../../enums");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdatePriceDetailDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 100000 }),
    (0, class_validator_1.IsNumber)({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 3,
    }, { message: 'PRICE_IS_NUMBER' }),
    (0, class_validator_1.Min)(0, { message: 'PRICE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePriceDetailDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'chuyến xe lúc 5h sài gòn - đà lạt' }),
    (0, class_validator_1.IsString)({ message: 'NOTE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePriceDetailDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.VehicleTypeEnum.LIMOUSINE,
        enum: enums_1.VehicleTypeEnum,
    }),
    (0, class_validator_1.IsEnum)(enums_1.VehicleTypeEnum, { message: 'SEAT_TYPE_IS_ENUM' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePriceDetailDto.prototype, "seatType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'TRIP_CODE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePriceDetailDto.prototype, "tripCode", void 0);
exports.UpdatePriceDetailDto = UpdatePriceDetailDto;
//# sourceMappingURL=update-price-detail.dto.js.map