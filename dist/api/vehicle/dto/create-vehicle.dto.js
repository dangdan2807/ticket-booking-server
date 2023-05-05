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
exports.CreateVehicleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const entities_1 = require("../../../database/entities");
const enums_1 = require("../../../enums");
class CreateVehicleDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'CODE_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'CODE_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'CODE_BETWEEN_1_100_CHARACTERS' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Xe giường nằm Limousine số 1' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'NAME_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'NAME_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'NAME_BETWEEN_1_100_CHARACTERS' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Xe giường nằm Limousine số 1, 34 chỗ, phòng đôi' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'DESCRIPTION_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'DESCRIPTION_IS_STRING' }),
    (0, class_validator_1.Length)(1, 1000, { message: 'DESCRIPTION_BETWEEN_1_1000_CHARACTERS' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.VehicleTypeEnum.SLEEPER_BUS,
        enum: enums_1.VehicleTypeEnum,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'VEHICLE_TYPE_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'VEHICLE_TYPE_STRING' }),
    (0, class_validator_1.IsEnum)(enums_1.VehicleTypeEnum, { message: 'VEHICLE_TYPE_IS_ENUM' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '51A-111.11' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'LICENSE_PLATE_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'LICENSE_PLATE_STRING' }),
    (0, class_validator_1.Length)(1, 20, { message: 'LICENSE_PLATE_BETWEEN_1_20_CHARACTERS' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "licensePlate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 }, { message: 'VEHICLE_FLOOR_NUMBER_IS_NUMBER' }),
    (0, class_validator_1.Min)(1, { message: 'VEHICLE_FLOOR_NUMBER_MIN_MAX' }),
    (0, class_validator_1.Max)(2, { message: 'VEHICLE_FLOOR_NUMBER_MIN_MAX' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "floorNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: enums_1.VehicleSeatsEnum.LIMOUSINE, enum: enums_1.VehicleSeatsEnum }),
    (0, class_validator_1.IsNotEmpty)({ message: 'VEHICLE_TOTAL_SEAT_IS_REQUIRE' }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 }, { message: 'VEHICLE_TOTAL_SEAT_IS_NUMBER' }),
    (0, class_validator_1.IsEnum)(enums_1.VehicleSeatsEnum, { message: 'VEHICLE_TOTAL_SEAT_IS_ENUM' }),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "totalSeat", void 0);
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
], CreateVehicleDto.prototype, "images", void 0);
exports.CreateVehicleDto = CreateVehicleDto;
//# sourceMappingURL=create-vehicle.dto.js.map