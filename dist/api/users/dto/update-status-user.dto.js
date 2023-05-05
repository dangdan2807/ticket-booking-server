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
exports.UpdateStatusUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("./../../../enums");
const class_validator_1 = require("class-validator");
class UpdateStatusUserDto {
}
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.UserStatusEnum),
    (0, swagger_1.ApiProperty)({ example: enums_1.UserStatusEnum.INACTIVATE }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateStatusUserDto.prototype, "status", void 0);
exports.UpdateStatusUserDto = UpdateStatusUserDto;
//# sourceMappingURL=update-status-user.dto.js.map