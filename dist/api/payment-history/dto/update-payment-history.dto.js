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
exports.UpdatePaymentHistoryDto = void 0;
const enums_1 = require("../../../enums");
const class_validator_1 = require("class-validator");
class UpdatePaymentHistoryDto {
}
__decorate([
    (0, class_validator_1.IsString)({ message: 'NOTE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePaymentHistoryDto.prototype, "note", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'AMOUNT_IS_NUMBER' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePaymentHistoryDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.PaymentHistoryStatusEnum, {
        message: 'PAYMENT_HISTORY_STATUS_IS_ENUM',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePaymentHistoryDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.PaymentMethodEnum, { message: 'PAYMENT_METHOD_IS_ENUM' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePaymentHistoryDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'PAYMENT_HISTORY_TYPE_IS_REQUIRED' }),
    (0, class_validator_1.IsEnum)(enums_1.UpdatePayHTypeDtoEnum, { message: 'PAYMENT_HISTORY_TYPE_IS_ENUM' }),
    __metadata("design:type", String)
], UpdatePaymentHistoryDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'APP_TRANS_ID_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePaymentHistoryDto.prototype, "transId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'APP_TIME_MUST_BE_NUMBER' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePaymentHistoryDto.prototype, "createAppTime", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'ZALO_TRANS_ID_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePaymentHistoryDto.prototype, "zaloTransId", void 0);
__decorate([
    (0, class_validator_1.IsDate)({ message: 'PAYMENT_TIME_IS_DATE' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdatePaymentHistoryDto.prototype, "paymentTime", void 0);
exports.UpdatePaymentHistoryDto = UpdatePaymentHistoryDto;
//# sourceMappingURL=update-payment-history.dto.js.map