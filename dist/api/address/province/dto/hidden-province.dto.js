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
exports.HiddenProvinceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const delete_status_enum_1 = require("../../../../enums/delete-status.enum");
class HiddenProvinceDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: delete_status_enum_1.DeleteStatusEnum.NOT_DELETED,
        description: '1: hidden, 0: show',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Status is required' }),
    (0, class_validator_1.IsEnum)(delete_status_enum_1.DeleteStatusEnum, { message: 'Status is invalid' }),
    __metadata("design:type", Number)
], HiddenProvinceDto.prototype, "status", void 0);
exports.HiddenProvinceDto = HiddenProvinceDto;
//# sourceMappingURL=hidden-province.dto.js.map