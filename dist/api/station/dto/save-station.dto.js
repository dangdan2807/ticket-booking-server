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
exports.SaveStationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const entities_1 = require("./../../../database/entities");
class SaveStationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bến xe Demo' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'NAME_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'NAME_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'NAME_BETWEEN_1_100_CHARACTERS' }),
    __metadata("design:type", String)
], SaveStationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Demo',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ADDRESS_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'ADDRESS_MUST_BE_STRING' }),
    (0, class_validator_1.Length)(1, 255, { message: 'ADDRESS_BETWEEN_1_255_CHARACTERS' }),
    __metadata("design:type", String)
], SaveStationDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'SGDM',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'CODE_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'CODE_IS_STRING' }),
    (0, class_validator_1.Length)(1, 255, { message: 'CODE_BETWEEN_1_10_CHARACTERS' }),
    __metadata("design:type", String)
], SaveStationDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 26914 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'WARD_ID_IS_REQUIRED' }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false }, { message: 'WARD_CODE_MUST_BE_NUMBER' }),
    __metadata("design:type", Number)
], SaveStationDto.prototype, "wardCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: [
            {
                url: 'https://res.cloudinary.com/dangdan2807/image/upload/v1668737017/ee0ygsbjvymvyfrugrtp.jpg',
            },
            {
                url: 'https://res.cloudinary.com/dangdan2807/image/upload/v1668737015/tb7fssdjfjuvn6qcrajy.png',
            },
        ],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => entities_1.ImageResource),
    __metadata("design:type", Array)
], SaveStationDto.prototype, "images", void 0);
exports.SaveStationDto = SaveStationDto;
//# sourceMappingURL=save-station.dto.js.map