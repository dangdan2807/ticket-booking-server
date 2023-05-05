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
const enums_1 = require("./../../../enums");
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
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.OrderStatusEnum.UNPAID,
        enum: enums_1.OrderStatusEnum,
    }),
    (0, class_validator_1.IsString)({ message: 'ORDER_STATUS_IS_STRING' }),
    (0, class_validator_1.IsEnum)(enums_1.OrderStatusEnum, { message: 'ORDER_STATUS_IS_ENUM' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "status", void 0);
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
    (0, swagger_1.ApiProperty)({ example: 'b87985ac-3b08-46bf-8e6f-02902dcaedaf' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'TRIP_DETAIL_ID_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'TRIP_DETAIL_ID_IS_STRING' }),
    (0, class_validator_1.Length)(36, 36, { message: 'TRIP_DETAIL_ID_IS_36_CHARACTERS' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "tripDetailId", void 0);
exports.CreateOrderDto = CreateOrderDto;
//# sourceMappingURL=create-order.dto%20copy.js.map