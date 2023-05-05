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
exports.CreateSeatDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateSeatDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'CODE_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'CODE_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'CODE_BETWEEN_1_100_CHARACTERS' }),
    __metadata("design:type", String)
], CreateSeatDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A1' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'NAME_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'NAME_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'NAME_BETWEEN_1_100_CHARACTERS' }),
    __metadata("design:type", String)
], CreateSeatDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, enum: [1, 2] }),
    (0, class_validator_1.IsNumber)({
        allowNaN: false,
        allowInfinity: false,
        maxDecimalPlaces: 0,
    }, { message: 'FLOOR_IS_NUMBER' }),
    (0, class_validator_1.Min)(1, { message: 'SEAT_FLOOR_MIN_MAX' }),
    (0, class_validator_1.Max)(2, { message: 'SEAT_FLOOR_MIN_MAX' }),
    (0, class_validator_1.IsEnum)([1, 2], { message: 'SEAT_FLOOR_MIN_MAX' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateSeatDto.prototype, "floor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '8d453086-e6a2-4a2e-a407-5ce2be3b0ba8' }),
    (0, class_validator_1.IsNotEmpty)({ message: ' VEHICLE_ID_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'VEHICLE_ID_IS_STRING' }),
    __metadata("design:type", String)
], CreateSeatDto.prototype, "vehicleId", void 0);
exports.CreateSeatDto = CreateSeatDto;
//# sourceMappingURL=create-seat.dto.js.map