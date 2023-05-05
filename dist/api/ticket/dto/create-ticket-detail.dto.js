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
exports.CreateTicketDetailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateTicketDetailDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'CODE_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'CODE_IS_STRING' }),
    (0, class_validator_1.Length)(1, 100, { message: 'CODE_BETWEEN_1_100_CHARACTERS' }),
    __metadata("design:type", String)
], CreateTicketDetailDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'TICKET_ID_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'TICKET_ID_IS_STRING' }),
    (0, class_validator_1.Length)(36, 36, { message: 'TICKET_ID_IS_36_CHARACTERS' }),
    __metadata("design:type", String)
], CreateTicketDetailDto.prototype, "ticketId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'SEAT_ID_IS_REQUIRED' }),
    (0, class_validator_1.IsString)({ message: 'SEAT_ID_IS_STRING' }),
    (0, class_validator_1.Length)(36, 36, { message: 'SEAT_ID_IS_36_CHARACTERS' }),
    __metadata("design:type", String)
], CreateTicketDetailDto.prototype, "seatId", void 0);
exports.CreateTicketDetailDto = CreateTicketDetailDto;
//# sourceMappingURL=create-ticket-detail.dto.js.map