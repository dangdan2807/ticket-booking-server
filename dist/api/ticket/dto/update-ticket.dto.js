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
exports.UpdateTicketDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateTicketDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'NOTE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTicketDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2023-03-01' }),
    (0, class_validator_1.IsDate)({ message: 'START_DATE_IS_DATE' }),
    (0, class_validator_1.MinDate)(new Date(`${new Date().toDateString()}`), {
        message: 'START_DATE_GREATER_THAN_NOW',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateTicketDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2023-03-31' }),
    (0, class_validator_1.IsDate)({ message: 'END_DATE_IS_DATE' }),
    (0, class_validator_1.MinDate)(new Date(`${new Date().toDateString()}`), {
        message: 'END_DATE_GREATER_THAN_NOW',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateTicketDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'b87985ac-3b08-46bf-8e6f-02902dcaedaf' }),
    (0, class_validator_1.IsString)({ message: 'TRIP_DETAIL_ID_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTicketDto.prototype, "tripDetailId", void 0);
exports.UpdateTicketDto = UpdateTicketDto;
//# sourceMappingURL=update-ticket.dto.js.map