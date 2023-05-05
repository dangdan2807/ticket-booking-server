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
exports.UserRefreshTokenDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UserRefreshTokenDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA4OTI2MTM2LTI2ZDgtNDE3Ni04MjdlLTA2MGNjN2U2Mjg1ZCIsImVtYWlsIjoiZGFuZ2RhbjI4MDdAZ21haWwuY29tIiwidHlwZSI6InN0YWZmIiwiaWF0IjoxNjc0MTM5NjUwLCJleHAiOjE2NzQ3NDQ0NTB9.POmmyjmgN58INWCkakmNujCaKyXJlJCBFuGbrbeyIh8',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserRefreshTokenDto.prototype, "refreshToken", void 0);
exports.UserRefreshTokenDto = UserRefreshTokenDto;
//# sourceMappingURL=user-refresh-token.dto.js.map