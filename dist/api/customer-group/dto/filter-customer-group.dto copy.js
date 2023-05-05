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
exports.FilterCustomerGroupDto = void 0;
const enums_1 = require("../../../enums");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FilterCustomerGroupDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'cao cấp' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'CUSTOMER_GROUP_NAME_IS_STRING' }),
    __metadata("design:type", String)
], FilterCustomerGroupDto.prototype, "customerGroupName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: enums_1.SortEnum.ASC }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'SORT_IS_STRING' }),
    (0, class_validator_1.IsEnum)(enums_1.SortEnum, { message: 'SORT_IS_ENUM' }),
    __metadata("design:type", String)
], FilterCustomerGroupDto.prototype, "sort", void 0);
exports.FilterCustomerGroupDto = FilterCustomerGroupDto;
//# sourceMappingURL=filter-customer-group.dto%20copy.js.map