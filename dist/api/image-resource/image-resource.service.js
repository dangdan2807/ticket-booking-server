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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageResourceService = void 0;
const upload_service_1 = require("./../upload/upload.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./../../database/entities");
const typeorm_2 = require("typeorm");
const dto_1 = require("../upload/dto");
let ImageResourceService = class ImageResourceService {
    constructor(imageResourceRepository, uploadService, dataSource) {
        this.imageResourceRepository = imageResourceRepository;
        this.uploadService = uploadService;
        this.dataSource = dataSource;
    }
    async saveImageResource(imageResource, userId, vehicleId, stationId) {
        const newImage = new entities_1.ImageResource();
        newImage.url = imageResource.url;
        if (imageResource.id) {
            newImage.id = imageResource.id;
        }
        if (vehicleId) {
            const vehicle = await this.dataSource
                .getRepository(entities_1.Vehicle)
                .findOne({ where: { id: vehicleId } });
            newImage.vehicle = vehicle;
        }
        if (stationId) {
            const station = await this.dataSource
                .getRepository(entities_1.Station)
                .findOne({ where: { id: stationId } });
            newImage.station = station;
        }
        if (!vehicleId && !stationId) {
            throw new common_1.BadRequestException('INVALID_IMAGE_RESOURCE');
        }
        newImage.createdBy = userId;
        return await this.imageResourceRepository.save(newImage);
    }
    async findImageResourcesByStationId(stationId, options) {
        return await this.imageResourceRepository.find(Object.assign({ where: { station: { id: stationId } } }, options));
    }
    async removeImageById(id) {
        const imageResource = await this.imageResourceRepository.findOne({
            where: { id },
        });
        if (imageResource) {
            const dto = new dto_1.DeleteFileUploadDto();
            dto.path = imageResource.url;
            await this.uploadService.deleteFileWithCloudinary(dto);
            return await this.imageResourceRepository.remove(imageResource);
        }
    }
    async removeImageResourcesByStationId(id) {
        const imageResources = await this.imageResourceRepository.find({
            where: { station: { id } },
        });
        if (imageResources) {
            imageResources.forEach(async (imageResource) => {
                const dto = new dto_1.DeleteFileUploadDto();
                dto.path = imageResource.url;
                await this.uploadService.deleteFileWithCloudinary(dto);
            });
            return await this.imageResourceRepository.remove(imageResources);
        }
    }
};
ImageResourceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.ImageResource)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        upload_service_1.UploadService,
        typeorm_2.DataSource])
], ImageResourceService);
exports.ImageResourceService = ImageResourceService;
//# sourceMappingURL=image-resource.service.js.map