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
exports.FilterSeatDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FilterSeatDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'A1' }),
    (0, class_validator_1.IsString)({ message: 'KEYWORDS_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterSeatDto.prototype, "keywords", void 0);
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
], FilterSeatDto.prototype, "floor", void 0);
exports.FilterSeatDto = FilterSeatDto;
//# sourceMappingURL=filter-seat.dto.js.map