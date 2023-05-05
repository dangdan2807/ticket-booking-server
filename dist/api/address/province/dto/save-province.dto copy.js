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
exports.SaveProvinceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SaveProvinceDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Thành phố Hà Nội' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    (0, class_validator_1.IsString)({ message: 'Name is string' }),
    (0, class_validator_1.Length)(1, 100, { message: 'Name must be between 1 and 100 characters' }),
    __metadata("design:type", String)
], SaveProvinceDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'thành phố trung ương' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Type is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50, { message: 'Type must be between 1 and 50 characters' }),
    __metadata("design:type", String)
], SaveProvinceDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'code is number' }),
    (0, class_validator_1.IsNumber)({ allowNaN: false, allowInfinity: false }, { message: 'code is number' }),
    __metadata("design:type", Number)
], SaveProvinceDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'thanh_pho_ha_noi' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'code name is require' }),
    (0, class_validator_1.IsString)({ message: 'code name is string' }),
    (0, class_validator_1.Length)(1, 255, { message: 'code name must be between 1 and 255 characters' }),
    __metadata("design:type", String)
], SaveProvinceDto.prototype, "codename", void 0);
exports.SaveProvinceDto = SaveProvinceDto;
//# sourceMappingURL=save-province.dto%20copy.js.map