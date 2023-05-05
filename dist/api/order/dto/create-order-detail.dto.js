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
exports.CreateOrderDetailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOrderDetailDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'NOTE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDetailDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5da6e37f-bb09-422c-aa27-e5eefa8cb709' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ORDER_ID_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'ORDER_ID_IS_STRING' }),
    (0, class_validator_1.Length)(36, 36, { message: 'ORDER_ID_IS_36_CHARACTERS' }),
    __metadata("design:type", String)
], CreateOrderDetailDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '7b1e022a-96da-47c5-85b6-81858fd0f601' }),
    (0, class_validator_1.IsString)({ message: 'SEAT_ID_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDetailDto.prototype, "seatId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'SEAT_CODE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDetailDto.prototype, "seatCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'TRIP_DETAIL_CODE_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'TRIP_DETAIL_CODE_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'TRIP_DETAIL_CODE_BETWEEN_1_AND_100_CHARACTERS' }),
    __metadata("design:type", String)
], CreateOrderDetailDto.prototype, "tripDetailCode", void 0);
exports.CreateOrderDetailDto = CreateOrderDetailDto;
//# sourceMappingURL=create-order-detail.dto.js.map