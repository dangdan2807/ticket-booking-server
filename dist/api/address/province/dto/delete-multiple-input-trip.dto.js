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
exports.TripDeleteMultiInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class TripDeleteMultiInput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            '3f8a967b-d18c-4e9c-a074-0df589610452',
            'e01b0dc1-f057-4496-b2e3-c5b2075cfd74',
            'f0b54e9d-a1bc-4797-9c94-a2f416515719',
        ],
        description: 'list id',
        type: (Array),
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], TripDeleteMultiInput.prototype, "ids", void 0);
exports.TripDeleteMultiInput = TripDeleteMultiInput;
//# sourceMappingURL=delete-multiple-input-trip.dto.js.map