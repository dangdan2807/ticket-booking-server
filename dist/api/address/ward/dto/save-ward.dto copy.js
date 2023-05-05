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
exports.SaveWardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SaveWardDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Thị trấn Đông Anh' }),
    (0, class_validator_1.IsString)({ message: 'Name is string' }),
    (0, class_validator_1.Length)(1, 100, { message: 'Name must be between 1 and 100 characters' }),
    __metadata("design:type", String)
], SaveWardDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'thị trấn' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Type is required' }),
    (0, class_validator_1.IsString)({ message: 'Type is string' }),
    (0, class_validator_1.Length)(1, 50, { message: 'Type must be between 1 and 50 characters' }),
    __metadata("design:type", String)
], SaveWardDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 454 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Code is required' }),
    (0, class_validator_1.IsNumber)({ allowNaN: false, allowInfinity: false }, { message: 'Code is number' }),
    __metadata("design:type", Number)
], SaveWardDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'thi_tran_dong_anh' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'code name is require' }),
    (0, class_validator_1.IsString)({ message: 'code name is string' }),
    (0, class_validator_1.Length)(1, 255, { message: 'Name must be between 1 and 255 characters' }),
    __metadata("design:type", String)
], SaveWardDto.prototype, "codename", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 17 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'district code is require' }),
    (0, class_validator_1.IsNumber)({ allowNaN: false, allowInfinity: false }, { message: 'district code is number' }),
    __metadata("design:type", Number)
], SaveWardDto.prototype, "districtCode", void 0);
exports.SaveWardDto = SaveWardDto;
//# sourceMappingURL=save-ward.dto%20copy.js.map