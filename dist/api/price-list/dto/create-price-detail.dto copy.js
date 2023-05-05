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
exports.CreatePriceDetailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePriceDetailDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100000 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false }, { message: 'PRICE_IS_NUMBER' }),
    (0, class_validator_1.Min)(0, { message: 'PRICE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0' }),
    __metadata("design:type", Number)
], CreatePriceDetailDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'chuyến xe lúc 5h sài gòn - đà lạt' }),
    (0, class_validator_1.IsString)({ message: 'NOTE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePriceDetailDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1fbaba64-77c4-4403-9d14-73c03e3d0954' }),
    (0, class_validator_1.IsString)({ message: 'PRICE_LIST_ID_IS_STRING' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'PRICE_LIST_ID_IS_REQUIRED' }),
    (0, class_validator_1.Length)(36, 36, { message: 'PRICE_LIST_ID_IS_36_CHARACTERS' }),
    __metadata("design:type", String)
], CreatePriceDetailDto.prototype, "priceListId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'd0adc2a4-386a-45de-bbf3-46d672b0a493' }),
    (0, class_validator_1.IsString)({ message: 'TICKET_GROUP_ID_IS_STRING' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'TICKET_GROUP_ID_IS_REQUIRED' }),
    (0, class_validator_1.Length)(36, 36, { message: 'TICKET_GROUP_ID_IS_36_CHARACTERS' }),
    __metadata("design:type", String)
], CreatePriceDetailDto.prototype, "ticketGroupId", void 0);
exports.CreatePriceDetailDto = CreatePriceDetailDto;
//# sourceMappingURL=create-price-detail.dto%20copy.js.map