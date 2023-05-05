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
exports.BusScheduleDto = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("./../../../enums");
const swagger_1 = require("@nestjs/swagger");
const moment = require("moment");
moment.locale('vi');
class BusScheduleDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: moment().startOf('isoWeek').format('YYYY-MM-DD HH:mm') }),
    (0, class_validator_1.IsNotEmpty)({ message: 'START_DATE_IS_REQUIRED' }),
    (0, class_validator_1.IsDate)({ message: 'INVALID_DATE' }),
    __metadata("design:type", Date)
], BusScheduleDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: moment().endOf('isoWeek').format('YYYY-MM-DD HH:mm') }),
    (0, class_validator_1.IsNotEmpty)({ message: 'END_DATE_IS_REQUIRED' }),
    (0, class_validator_1.IsDate)({ message: 'INVALID_DATE' }),
    __metadata("design:type", Date)
], BusScheduleDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: enums_1.TripDetailStatusEnum.NOT_SOLD_OUT,
        enum: [
            '',
            enums_1.TripDetailStatusEnum.NOT_SOLD_OUT,
            enums_1.TripDetailStatusEnum.SOLD_OUT,
        ],
    }),
    (0, class_validator_1.IsEnum)(['', enums_1.TripDetailStatusEnum.NOT_SOLD_OUT, enums_1.TripDetailStatusEnum.SOLD_OUT], { message: 'INVALID_TRIP_DETAIL_STATUS' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BusScheduleDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsString)({ message: 'TRIP_CODE_IS_STRING' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BusScheduleDto.prototype, "tripCode", void 0);
exports.BusScheduleDto = BusScheduleDto;
//# sourceMappingURL=bus-schedule.dto.js.map