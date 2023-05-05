"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageResourceModule = void 0;
const upload_service_1 = require("./../upload/upload.service");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const image_resource_service_1 = require("./image-resource.service");
const entities_1 = require("./../../database/entities");
let ImageResourceModule = class ImageResourceModule {
};
ImageResourceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.ImageResource, entities_1.Station, entities_1.Vehicle])],
        providers: [image_resource_service_1.ImageResourceService, upload_service_1.UploadService],
        controllers: [],
        exports: [image_resource_service_1.ImageResourceService],
    })
], ImageResourceModule);
exports.ImageResourceModule = ImageResourceModule;
//# sourceMappingURL=image-resource.module.js.map