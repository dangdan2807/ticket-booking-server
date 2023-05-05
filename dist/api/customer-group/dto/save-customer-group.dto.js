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
exports.SaveCustomerGroupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SaveCustomerGroupDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'SGDM',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'CODE_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'CODE_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'CODE_BETWEEN_1_100_CHARACTERS' }),
    __metadata("design:type", String)
], SaveCustomerGroupDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nhóm khách hàng cơ bản' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'NAME_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'NAME_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'NAME_LENGTH' }),
    __metadata("design:type", String)
], SaveCustomerGroupDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Nhóm này gồm phần lớn khách hàng bao gồm cả khách hàng mới.',
    }),
    (0, class_validator_1.IsString)({ message: 'DESCRIPTION_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SaveCustomerGroupDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Tập khách hàng lớn nhất.' }),
    (0, class_validator_1.IsString)({ message: 'NOTE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SaveCustomerGroupDto.prototype, "note", void 0);
exports.SaveCustomerGroupDto = SaveCustomerGroupDto;
//# sourceMappingURL=save-customer-group.dto.js.map