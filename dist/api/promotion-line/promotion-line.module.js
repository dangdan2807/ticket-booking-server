"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionLineModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const promotion_line_service_1 = require("./promotion-line.service");
const promotion_line_controller_1 = require("./promotion-line.controller");
const entities_1 = require("./../../database/entities");
let PromotionLineModule = class PromotionLineModule {
};
PromotionLineModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.Trip, entities_1.PromotionLine, entities_1.Promotion, entities_1.PromotionDetail]),
        ],
        providers: [promotion_line_service_1.PromotionLineService],
        controllers: [promotion_line_controller_1.PromotionLineController],
        exports: [promotion_line_service_1.PromotionLineService],
    })
], PromotionLineModule);
exports.PromotionLineModule = PromotionLineModule;
//# sourceMappingURL=promotion-line.module.js.map