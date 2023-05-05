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
exports.RevenueByCustomerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const moment = require("moment");
class RevenueByCustomerDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: moment().format('YYYY-MM-DD') }),
    (0, class_validator_1.IsNotEmpty)({ message: 'START_DATE_IS_REQUIRED' }),
    (0, class_validator_1.IsDate)({ message: 'START_DATE_IS_DATE' }),
    __metadata("design:type", Date)
], RevenueByCustomerDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: moment().add(7, 'days').format('YYYY-MM-DD') }),
    (0, class_validator_1.IsNotEmpty)({ message: 'START_DATE_IS_REQUIRED' }),
    (0, class_validator_1.IsDate)({ message: 'END_DATE_IS_DATE' }),
    __metadata("design:type", Date)
], RevenueByCustomerDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'CUSTOMER_ID_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'CUSTOMER_ID_IS_STRING' }),
    (0, class_validator_1.Length)(36, 36, { message: 'CUSTOMER_ID_MUST_BE_36_CHARACTERS' }),
    __metadata("design:type", String)
], RevenueByCustomerDto.prototype, "customerId", void 0);
exports.RevenueByCustomerDto = RevenueByCustomerDto;
//# sourceMappingURL=revenue-by-customer.dto.js.map