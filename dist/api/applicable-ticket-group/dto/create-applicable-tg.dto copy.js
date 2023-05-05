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
exports.CreateApplicableTGDto = void 0;
const class_validator_1 = require("class-validator");
class CreateApplicableTGDto {
}
__decorate([
    (0, class_validator_1.IsString)({ message: 'TICKET_GROUP_CODE_MUST_BE_STRING' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'TICKET_GROUP_CODE_IS_REQUIRED' }),
    (0, class_validator_1.Length)(1, 100, { message: 'TICKET_GROUP_CODE_MUST_BE_BETWEEN_1_AND_100' }),
    __metadata("design:type", String)
], CreateApplicableTGDto.prototype, "ticketGroupCode", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'PROMOTION_DETAIL_ID_MUST_BE_STRING' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'PROMOTION_DETAIL_ID_IS_REQUIRED' }),
    (0, class_validator_1.Length)(1, 100, {
        message: 'PROMOTION_DETAIL_ID_MUST_BE_BETWEEN_1_AND_100_CHARACTERS',
    }),
    __metadata("design:type", String)
], CreateApplicableTGDto.prototype, "promotionDetailId", void 0);
exports.CreateApplicableTGDto = CreateApplicableTGDto;
//# sourceMappingURL=create-applicable-tg.dto%20copy.js.map