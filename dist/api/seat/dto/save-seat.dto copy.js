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
exports.SaveSeatDto = void 0;
const enums_1 = require("../../../enums");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SaveSeatDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A1' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    (0, class_validator_1.IsString)({ message: 'Name is string' }),
    (0, class_validator_1.Length)(1, 100, { message: 'Name must be between 1 and 100 characters' }),
    __metadata("design:type", String)
], SaveSeatDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: enums_1.SeatTypeEnum.NON_SALES }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(enums_1.SeatTypeEnum),
    __metadata("design:type", String)
], SaveSeatDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(2),
    __metadata("design:type", Number)
], SaveSeatDto.prototype, "floor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '8d453086-e6a2-4a2e-a407-5ce2be3b0ba8' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Vehicle is required' }),
    (0, class_validator_1.IsString)({ message: 'Vehicle is string' }),
    __metadata("design:type", String)
], SaveSeatDto.prototype, "vehicleId", void 0);
exports.SaveSeatDto = SaveSeatDto;
//# sourceMappingURL=save-seat.dto%20copy.js.map