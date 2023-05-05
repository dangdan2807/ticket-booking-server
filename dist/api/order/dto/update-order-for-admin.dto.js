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
exports.UpdateOrderForAdminDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../../enums");
const class_validator_1 = require("class-validator");
class UpdateOrderForAdminDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'NOTE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateOrderForAdminDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.OrderUpdateStatusAdminEnum.CANCEL,
        enum: [
            '',
            enums_1.OrderUpdateStatusAdminEnum.UNPAID,
            enums_1.OrderUpdateStatusAdminEnum.PAID,
            enums_1.OrderUpdateStatusAdminEnum.CANCEL,
            enums_1.OrderUpdateStatusAdminEnum.RETURNED,
        ],
    }),
    (0, class_validator_1.IsString)({ message: 'ORDER_STATUS_IS_STRING' }),
    (0, class_validator_1.IsEnum)([
        '',
        enums_1.OrderUpdateStatusAdminEnum.UNPAID,
        enums_1.OrderUpdateStatusAdminEnum.PAID,
        enums_1.OrderUpdateStatusAdminEnum.CANCEL,
        enums_1.OrderUpdateStatusAdminEnum.RETURNED,
    ], {
        message: 'ORDER_STATUS_IS_ENUM',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateOrderForAdminDto.prototype, "status", void 0);
exports.UpdateOrderForAdminDto = UpdateOrderForAdminDto;
//# sourceMappingURL=update-order-for-admin.dto.js.map