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
exports.FilterTicketGroupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sort_enum_1 = require("./../../../enums/sort.enum");
const class_validator_1 = require("class-validator");
class FilterTicketGroupDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Chuyến Sài Gòn' }),
    (0, class_validator_1.IsString)({ message: 'KEYWORDS_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FilterTicketGroupDto.prototype, "keywords", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: sort_enum_1.SortEnum.DESC, enum: sort_enum_1.SortEnum }),
    (0, class_validator_1.IsString)({ message: 'SORT_IS_STRING' }),
    (0, class_validator_1.IsEnum)(sort_enum_1.SortEnum, { message: 'SORT_IS_ENUM' }),
    __metadata("design:type", String)
], FilterTicketGroupDto.prototype, "sort", void 0);
exports.FilterTicketGroupDto = FilterTicketGroupDto;
//# sourceMappingURL=filter-ticket-group.dto.js.map