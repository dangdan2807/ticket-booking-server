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
exports.DeleteFileUploadDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DeleteFileUploadDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://res.cloudinary.com/dangdan2807/image/upload/v1676125893/n7uwgcsqef0fnjealy4o.webp',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'path is required' }),
    (0, class_validator_1.IsString)({ message: 'path is string' }),
    __metadata("design:type", String)
], DeleteFileUploadDto.prototype, "path", void 0);
exports.DeleteFileUploadDto = DeleteFileUploadDto;
//# sourceMappingURL=delete-file-upload.dto.js.map