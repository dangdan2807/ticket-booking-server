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
exports.RemoveMultiCustomerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RemoveMultiCustomerDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            '32489ff0-cb19-41c2-991c-53b98398f773',
            '9a1f6cda-415f-4431-89f3-3d21d75cbacd',
        ],
        description: 'list customer id',
        type: (Array),
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'CUSTOMER_ID_IS_REQUIRED' }),
    __metadata("design:type", Array)
], RemoveMultiCustomerDto.prototype, "customerIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2a5147d9-8449-4fca-83c0-e3fa29af596d' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'CUSTOMER_GROUP_ID_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'CUSTOMER_GROUP_ID_IS_STRING' }),
    (0, class_validator_1.Length)(36, 36, { message: 'CUSTOMER_GROUP_ID_MUST_BE_36_CHARACTERS' }),
    __metadata("design:type", String)
], RemoveMultiCustomerDto.prototype, "customerGroupId", void 0);
exports.RemoveMultiCustomerDto = RemoveMultiCustomerDto;
//# sourceMappingURL=remove-multi-customer.dto.js.map