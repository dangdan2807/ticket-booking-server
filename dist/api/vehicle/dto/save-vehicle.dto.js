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
exports.SaveVehicleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const entities_1 = require("./../../../database/entities");
const enums_1 = require("./../../../enums");
class SaveVehicleDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Xe giường nằm Limousine số 1' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    (0, class_validator_1.IsString)({ message: 'Name is string' }),
    (0, class_validator_1.Length)(1, 100, { message: 'Name must be between 1 and 100 characters' }),
    __metadata("design:type", String)
], SaveVehicleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Xe giường nằm Limousine số 1, 34 chỗ, phòng đôi' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 1000, {
        message: 'description must be between 1 and 1000 characters',
    }),
    __metadata("design:type", String)
], SaveVehicleDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.VehicleTypeEnum.SLEEPER_BUS,
        enum: enums_1.VehicleTypeEnum,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(enums_1.VehicleTypeEnum),
    __metadata("design:type", String)
], SaveVehicleDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '51A-111.11' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 20, {
        message: 'License Plate must be between 1 and 20 characters',
    }),
    __metadata("design:type", String)
], SaveVehicleDto.prototype, "licensePlate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(2),
    __metadata("design:type", Number)
], SaveVehicleDto.prototype, "floorNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: enums_1.VehicleSeatsEnum.LIMOUSINE, enum: enums_1.VehicleSeatsEnum }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsEnum)(enums_1.VehicleSeatsEnum),
    __metadata("design:type", Number)
], SaveVehicleDto.prototype, "totalSeat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: [
            {
                id: '1',
                url: 'https://res.cloudinary.com/dangdan2807/image/upload/v1668737017/ee0ygsbjvymvyfrugrtp.jpg',
                isDeleted: true,
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
], SaveVehicleDto.prototype, "images", void 0);
exports.SaveVehicleDto = SaveVehicleDto;
//# sourceMappingURL=save-vehicle.dto.js.map