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
exports.CreateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOrderDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'NOTE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '09276ef0-df78-4ee1-9b4d-a0a1bd7ccbc6' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'CUSTOMER_ID_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'CUSTOMER_ID_IS_STRING' }),
    (0, class_validator_1.Length)(36, 36, { message: 'CUSTOMER_ID_MUST_BE_36_CHARACTERS' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: [
            '7b1e022a-96da-47c5-85b6-81858fd0f601',
            '7b1e022a-96da-47c5-85b6-81858fd0f602',
        ],
    }),
    (0, class_validator_1.IsArray)({ message: 'SEAT_IDS_IS_ARRAY' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "seatIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ['XGNL2A2', 'XGNL2A3'] }),
    (0, class_validator_1.IsArray)({ message: 'SEAT_CODES_IS_ARRAY' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "seatCodes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'GGGG' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'TRIP_DETAIL_CODE_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'TRIP_DETAIL_CODE_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'TRIP_DETAIL_CODE_BETWEEN_1_AND_100_CHARACTERS' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "tripDetailCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ['', ''] }),
    (0, class_validator_1.IsArray)({ message: 'PROMOTION_LINE_CODES_IS_ARRAY' }),
    (0, class_validator_1.IsString)({ each: true, message: 'PROMOTION_LINE_CODES_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "promotionLineCodes", void 0);
exports.CreateOrderDto = CreateOrderDto;
//# sourceMappingURL=create-order.dto.js.map