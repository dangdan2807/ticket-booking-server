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
exports.VehicleService = void 0;
const dto_1 = require("./../seat/dto");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./../../database/entities");
const utils_1 = require("./../../utils");
const typeorm_2 = require("typeorm");
const image_resource_service_1 = require("../image-resource/image-resource.service");
const enums_1 = require("./../../enums");
const seat_service_1 = require("../seat/seat.service");
let VehicleService = class VehicleService {
    constructor(vehicleService, imageResourceService, seatService, dataSource) {
        this.vehicleService = vehicleService;
        this.imageResourceService = imageResourceService;
        this.seatService = seatService;
        this.dataSource = dataSource;
    }
    async findOneVehicle(options) {
        return await this.vehicleService.findOne(Object.assign({ where: Object.assign({}, options.where), relations: Object.assign({ images: true, seats: true }, options === null || options === void 0 ? void 0 : options.relations), select: Object.assign({ seats: {
                    id: true,
                    code: true,
                    name: true,
                    floor: true,
                }, images: {
                    id: true,
                    url: true,
                    createdAt: true,
                } }, options === null || options === void 0 ? void 0 : options.select), order: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.order) }, options));
    }
    async findOneVehicleById(id, options) {
        if (options) {
            options.where = Object.assign({ id }, options.where);
        }
        else {
            options = { where: { id } };
        }
        return await this.findOneVehicle(options);
    }
    async findOneVehicleByCode(code, options) {
        if (options) {
            options.where = Object.assign({ code }, options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOneVehicle(options);
    }
    async getVehicleTypes() {
        return {
            dataResult: Object.keys(enums_1.VehicleTypeEnum).map((key) => ({
                key,
                value: enums_1.VehicleTypeEnum[key],
                numOfSeats: enums_1.VehicleSeatsEnum[key],
            })),
        };
    }
    async createVehicle(dto, userId) {
        const { code, name, description, type, images, licensePlate, floorNumber, totalSeat, } = dto;
        const vehicleExist = await this.findOneVehicleByCode(code, {
            withDeleted: true,
        });
        if (vehicleExist) {
            throw new common_1.BadRequestException('VEHICLE_CODE_ALREADY_EXIST');
        }
        const vehicle = new entities_1.Vehicle();
        vehicle.code = code;
        vehicle.name = name;
        vehicle.description = description;
        if (!type) {
            throw new common_1.BadRequestException('VEHICLE_TYPE_REQUIRED');
        }
        vehicle.type = type;
        if (licensePlate.match(utils_1.LICENSE_PLATE_REGEX)) {
            vehicle.licensePlate = licensePlate;
        }
        else {
            throw new common_1.BadRequestException('LICENSE_PLATE_INVALID');
        }
        if (floorNumber == 1 || floorNumber == 2) {
            vehicle.floorNumber = floorNumber;
        }
        else {
            throw new common_1.BadRequestException('FLOOR_NUMBER_INVALID');
        }
        vehicle.totalSeat = totalSeat;
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: userId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.UnauthorizedException('USER_NOT_ACTIVE');
        }
        vehicle.createdBy = adminExist.id;
        const newVehicle = await this.vehicleService.save(vehicle);
        if (images && images.length > 0) {
            const newImages = await images.map(async (image) => {
                image.createdBy = adminExist.id;
                const newImage = await this.imageResourceService.saveImageResource(image, adminExist.id, newVehicle.id);
                delete newImage.vehicle;
                delete newImage.createdBy;
                delete newImage.updatedBy;
                delete newImage.deletedAt;
                return newImage;
            });
            newVehicle.images = await Promise.all(newImages);
        }
        const seatsPerFloor = Math.floor(totalSeat / 2);
        for (let i = 0; i < totalSeat; i++) {
            const seatNum = i < seatsPerFloor ? i + 1 : i + 1 - seatsPerFloor;
            const dto = new dto_1.CreateSeatDto();
            dto.code =
                i < seatsPerFloor ? `${code}A${seatNum}` : `${code}B${seatNum}`;
            dto.name = i < seatsPerFloor ? `A${seatNum}` : `B${seatNum}`;
            dto.floor = i < seatsPerFloor ? 1 : 2;
            dto.vehicleId = newVehicle.id;
            await this.seatService.createSeat(dto, userId);
        }
        delete newVehicle.deletedAt;
        return newVehicle;
    }
    async getVehicleById(id, options) {
        const vehicle = await this.findOneVehicleById(id, options);
        if (!vehicle) {
            throw new common_1.BadRequestException('VEHICLE_NOT_FOUND');
        }
        return vehicle;
    }
    async getVehicleByCode(code, options) {
        const vehicle = await this.findOneVehicleByCode(code, options);
        if (!vehicle) {
            throw new common_1.BadRequestException('VEHICLE_NOT_FOUND');
        }
        return vehicle;
    }
    async findAllVehicle(dto, pagination) {
        const { keywords, type, floorNumber } = dto;
        const query = this.vehicleService.createQueryBuilder('q');
        if (keywords) {
            const newKeywords = keywords.trim();
            const subQuery = this.vehicleService
                .createQueryBuilder('q2')
                .select('q2.id')
                .where('q2.code LIKE :code', { code: `%${newKeywords}%` })
                .orWhere('q2.licensePlate LIKE :licensePlate', {
                licensePlate: `%${newKeywords}%`,
            })
                .where('q2.name LIKE :name', { name: `%${newKeywords}%` })
                .where('q2.description LIKE :description', {
                description: `%${newKeywords}%`,
            })
                .getQuery();
            query.andWhere(`q.id in (${subQuery})`, {
                code: `%${newKeywords}%`,
                licensePlate: `%${newKeywords}%`,
                name: `%${newKeywords}%`,
                description: `%${newKeywords}%`,
            });
        }
        switch (type) {
            case enums_1.VehicleTypeEnum.LIMOUSINE:
            case enums_1.VehicleTypeEnum.SLEEPER_BUS:
            case enums_1.VehicleTypeEnum.SEAT_BUS:
                query.andWhere('q.type = :type', { type });
                break;
            default:
                break;
        }
        if (floorNumber == 1 || floorNumber == 2) {
            query.andWhere('q.floorNumber = :floorNumber', { floorNumber });
        }
        const total = await query.getCount();
        const dataResult = await query
            .orderBy('q.createdAt', enums_1.SortEnum.DESC)
            .offset(pagination.skip)
            .limit(pagination.take)
            .getMany();
        if (dataResult && dataResult.length > 0) {
            const queryImage = this.dataSource
                .getRepository(entities_1.ImageResource)
                .createQueryBuilder('i');
            const images = await queryImage
                .andWhere('i.vehicle_id IN (:...ids)', {
                ids: dataResult.map((station) => station.id),
            })
                .leftJoinAndSelect('i.vehicle', 'v')
                .select(['i.id', 'i.url', 'i.updatedAt', 'i.createdAt', 'v.id'])
                .getMany();
            dataResult.forEach((vehicle) => {
                vehicle.images = images.filter((image) => image.vehicle.id === vehicle.id);
            });
        }
        return { dataResult, pagination, total };
    }
    async updateVehicleById(dto, userId, id) {
        const { name, description, licensePlate, type, floorNumber, totalSeat, images, } = dto;
        const vehicle = await this.findOneVehicleById(id);
        if (!vehicle) {
            throw new common_1.BadRequestException('VEHICLE_NOT_FOUND');
        }
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: userId, isActive: true } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (name) {
            vehicle.name = name;
        }
        if (description) {
            vehicle.description = description;
        }
        if (licensePlate && licensePlate.match(utils_1.LICENSE_PLATE_REGEX)) {
            vehicle.licensePlate = licensePlate;
        }
        if (type) {
            vehicle.type = type;
        }
        if (floorNumber && (floorNumber == 1 || floorNumber == 2)) {
            vehicle.floorNumber = floorNumber;
        }
        else {
            vehicle.floorNumber = 1;
        }
        if (totalSeat) {
            vehicle.totalSeat = totalSeat;
        }
        vehicle.updatedBy = adminExist.id;
        const updateVehicle = await this.vehicleService.save(vehicle);
        if (images && images.length > 0) {
            const newImages = await images.map(async (image) => {
                const newImage = await this.imageResourceService.saveImageResource(image, adminExist.id, updateVehicle.id);
                delete newImage.vehicle;
                delete newImage.createdBy;
                delete newImage.updatedBy;
                delete newImage.deletedAt;
                return newImage;
            });
            updateVehicle.images = await Promise.all(newImages);
        }
        return updateVehicle;
    }
    async deleteVehicleById(userId, id) {
        const deleteVehicle = await this.vehicleService.findOne({ where: { id } });
        if (!deleteVehicle) {
            throw new common_1.BadRequestException('VEHICLE_NOT_FOUND');
        }
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: userId, isActive: true } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        deleteVehicle.deletedAt = new Date();
        deleteVehicle.updatedBy = adminExist.id;
        return await this.vehicleService.save(deleteVehicle);
    }
    async deleteMultipleVehicle(userId, dto) {
        try {
            const { ids } = dto;
            const list = await Promise.all(ids.map(async (id) => await (await this.deleteVehicleById(userId, id)).id));
            return list;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
};
VehicleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Vehicle)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        image_resource_service_1.ImageResourceService,
        seat_service_1.SeatService,
        typeorm_2.DataSource])
], VehicleService);
exports.VehicleService = VehicleService;
//# sourceMappingURL=vehicle.service.js.map