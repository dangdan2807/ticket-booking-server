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
exports.RemoveCustomerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RemoveCustomerDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '958a39f4-f52a-412d-9042-3acb3590e210' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'CUSTOMER_ID_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'CUSTOMER_ID_IS_STRING' }),
    (0, class_validator_1.Length)(36, 36, { message: 'CUSTOMER_ID_MUST_BE_36_CHARACTERS' }),
    __metadata("design:type", String)
], RemoveCustomerDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'e80fcd4f-acad-4b04-b862-f66468348bb3' }),
    (0, class_validator_1.IsString)({ message: 'CUSTOMER_GROUP_ID_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RemoveCustomerDto.prototype, "customerGroupId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'NKHCBD3' }),
    (0, class_validator_1.IsString)({ message: 'CUSTOMER_GROUP_CODE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RemoveCustomerDto.prototype, "customerGroupCode", void 0);
exports.RemoveCustomerDto = RemoveCustomerDto;
//# sourceMappingURL=remove-customer.dto.js.map