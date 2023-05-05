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
exports.CreatePriceListDto = void 0;
const active_status_enum_1 = require("./../../../enums/active-status.enum");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePriceListDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bảng giá tháng 3/2023' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'NAME_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'NAME_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'NAME_LENGTH' }),
    __metadata("design:type", String)
], CreatePriceListDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-03-01' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'START_DATE_IS_REQUIRED' }),
    (0, class_validator_1.IsDate)({ message: 'START_DATE_IS_DATE' }),
    __metadata("design:type", Date)
], CreatePriceListDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-03-31' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'START_DATE_IS_REQUIRED' }),
    (0, class_validator_1.IsDate)({ message: 'END_DATE_IS_DATE' }),
    __metadata("design:type", Date)
], CreatePriceListDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Bảng giá tháng 3/2023' }),
    (0, class_validator_1.IsString)({ message: 'NOTE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePriceListDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: active_status_enum_1.ActiveStatusEnum.ACTIVE,
        enum: active_status_enum_1.ActiveStatusEnum,
    }),
    (0, class_validator_1.IsString)({ message: 'PRICE_LIST_STATUS_IS_STRING' }),
    (0, class_validator_1.IsEnum)(active_status_enum_1.ActiveStatusEnum, { message: 'PRICE_LIST_STATUS_INVALID' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePriceListDto.prototype, "status", void 0);
exports.CreatePriceListDto = CreatePriceListDto;
//# sourceMappingURL=create-price-list.dto%20copy.js.map