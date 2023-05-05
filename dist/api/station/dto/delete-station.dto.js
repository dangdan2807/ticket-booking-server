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
exports.DeleteStationByIdsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DeleteStationByIdsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            '8d453086-e6a2-4a2e-a407-5ce2be3b0b01',
            '902c3808-afdb-4285-9de7-c47e4ce5d19c',
        ],
        description: 'list id',
        type: [String],
        minLength: 1,
        isArray: true,
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], DeleteStationByIdsDto.prototype, "ids", void 0);
exports.DeleteStationByIdsDto = DeleteStationByIdsDto;
//# sourceMappingURL=delete-station.dto.js.map