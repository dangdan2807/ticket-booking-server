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
exports.CalculatePromotionLineDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CalculatePromotionLineDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100000 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'TOTAL_IS_REQUIRED' }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 }, {
        message: 'TOTAL_MUST_BE_NUMBER',
    }),
    __metadata("design:type", Number)
], CalculatePromotionLineDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'NUMBER_OF_TICKET_IS_REQUIRED' }),
    (0, class_validator_1.IsInt)({ message: 'NUMBER_OF_TICKET_MUST_BE_INTEGER' }),
    __metadata("design:type", Number)
], CalculatePromotionLineDto.prototype, "numOfTicket", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['sa0', 'g'] }),
    (0, class_validator_1.IsNotEmpty)({ message: 'PROMOTION_LINE_CODES_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ each: true, message: 'PROMOTION_LINE_CODES_IS_STRING' }),
    __metadata("design:type", Array)
], CalculatePromotionLineDto.prototype, "promotionLineCodes", void 0);
exports.CalculatePromotionLineDto = CalculatePromotionLineDto;
//# sourceMappingURL=calculate-promotion-line.dto.js.map