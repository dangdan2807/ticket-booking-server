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
exports.StationService = void 0;
const enums_1 = require("./../../enums");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const entities_1 = require("./../../database/entities");
const typeorm_2 = require("@nestjs/typeorm");
const image_resource_service_1 = require("../image-resource/image-resource.service");
const common_2 = require("@nestjs/common");
const excel = require("exceljs");
const stream_1 = require("stream");
const district_service_1 = require("../address/district/district.service");
const province_service_1 = require("../address/province/province.service");
const ward_service_1 = require("../address/ward/ward.service");
let StationService = class StationService {
    constructor(stationRepository, imageResourceService, wardService, districtService, provinceService, dataSource) {
        this.stationRepository = stationRepository;
        this.imageResourceService = imageResourceService;
        this.wardService = wardService;
        this.districtService = districtService;
        this.provinceService = provinceService;
        this.dataSource = dataSource;
        this.selectFile = [
            'q',
            'w.id',
            'w.code',
            'w.name',
            'w.type',
            'w.codename',
            'w.districtCode',
        ];
    }
    async findOneStation(options) {
        return await this.stationRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), select: Object.assign({ deletedAt: false, ward: {
                    id: true,
                    code: true,
                    name: true,
                    type: true,
                    codename: true,
                    districtCode: true,
                }, images: {
                    id: true,
                    url: true,
                    createdAt: true,
                } }, options === null || options === void 0 ? void 0 : options.select), relations: Object.assign({ ward: true, images: true }, options === null || options === void 0 ? void 0 : options.relations), order: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.order) }, options === null || options === void 0 ? void 0 : options.other));
    }
    async findOneStationById(id, options) {
        if (options) {
            options.where = Object.assign({ id }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { id } };
        }
        const station = await this.findOneStation(options);
        return station;
    }
    async findOneStationByCode(code, options) {
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        const station = await this.findOneStation(options);
        return station;
    }
    async getOneStationByCode(code, options) {
        const station = await this.findOneStationByCode(code, options);
        if (!station) {
            throw new common_1.NotFoundException('STATION_NOT_FOUND');
        }
        return station;
    }
    async getOneStationById(id, options) {
        const station = await this.findOneStationById(id, options);
        if (!station) {
            throw new common_1.NotFoundException('STATION_NOT_FOUND');
        }
        return station;
    }
    async createStation(dto, userId) {
        const { name, address, wardCode, images, code } = dto;
        const ward = await this.wardService.findOneByCode(wardCode, {
            select: {
                id: true,
                name: true,
                type: true,
                codename: true,
                code: true,
                districtCode: true,
            },
        });
        if (!ward) {
            throw new common_2.BadRequestException('WARD_NOT_FOUND');
        }
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: userId, isActive: true } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        const oldStation = await this.findOneStationByCode(code, {
            other: {
                withDeleted: true,
            },
        });
        if (oldStation) {
            throw new common_2.BadRequestException('STATION_CODE_EXISTED');
        }
        const station = new entities_1.Station();
        station.name = name;
        station.address = address;
        station.ward = ward;
        station.code = code;
        station.createdBy = adminExist.id;
        const district = await this.districtService.findOneByCode(station.ward.districtCode, {
            select: {
                id: true,
                name: true,
                type: true,
                codename: true,
                code: true,
                provinceCode: true,
            },
        });
        const province = await this.provinceService.findOneByCode(district.provinceCode, {
            select: {
                id: true,
                name: true,
                type: true,
                codename: true,
                code: true,
            },
        });
        station.fullAddress = `${station.address}, ${station.ward.name}, ${district.name}, ${province.name}`;
        const newStation = await this.stationRepository.save(station);
        newStation['district'] = district;
        newStation['province'] = province;
        if (images && images.length > 0) {
            const saveImages = await images.map(async (image) => {
                image.createdBy = adminExist.id;
                const saveImage = await this.imageResourceService.saveImageResource(image, adminExist.id, null, newStation.id);
                delete saveImage.station;
                delete saveImage.updatedBy;
                delete saveImage.updatedAt;
                delete saveImage.deletedAt;
                return saveImage;
            });
            newStation.images = await Promise.all(saveImages);
        }
        return newStation;
    }
    async findAll(dto, pagination) {
        const query = this.stationRepository.createQueryBuilder('q');
        const { keywords, sort } = dto;
        if (keywords) {
            const newKeywords = keywords.trim();
            const subQuery = this.stationRepository
                .createQueryBuilder('q2')
                .select('q2.id')
                .where('q2.code LIKE :code', { code: `%${newKeywords}%` })
                .orWhere('q2.name LIKE :name', { name: `%${newKeywords}%` })
                .where('q2.address LIKE :address', { address: `%${newKeywords}%` })
                .where('q2.fullAddress LIKE :fullAddress', {
                fullAddress: `%${newKeywords}%`,
            })
                .getQuery();
            query.andWhere(`q.id in (${subQuery})`, {
                code: `%${newKeywords}%`,
                name: `%${newKeywords}%`,
                address: `%${newKeywords}%`,
                fullAddress: `%${newKeywords}%`,
            });
        }
        if (sort) {
            query.orderBy('q.createdAt', sort);
        }
        else {
            query.orderBy('q.createdAt', enums_1.SortEnum.DESC);
        }
        const dataResult = await query
            .leftJoinAndSelect('q.ward', 'w')
            .select(this.selectFile)
            .offset(pagination.skip)
            .limit(pagination.take)
            .getMany();
        const total = await query.clone().getCount();
        if (dataResult.length > 0) {
            const newDataResult = dataResult.map(async (station) => {
                station.images =
                    await this.imageResourceService.findImageResourcesByStationId(station.id, {
                        select: {
                            id: true,
                            url: true,
                            createdAt: true,
                            createdBy: true,
                        },
                    });
                return station;
            });
            return {
                dataResult: await Promise.all(newDataResult),
                pagination,
                total,
            };
        }
        return { dataResult, pagination, total };
    }
    async updateStationById(userId, id, dto) {
        const { name, address, wardCode, images } = dto;
        const station = await this.getOneStationById(id);
        if (name) {
            station.name = name;
        }
        if (wardCode) {
            const ward = await this.dataSource
                .getRepository(entities_1.Ward)
                .findOne({ where: { code: wardCode } });
            station.ward = ward;
        }
        delete station.ward.createdAt;
        delete station.ward.updatedAt;
        delete station.ward.createdBy;
        delete station.ward.updatedBy;
        const district = await this.districtService.findOneByCode(station.ward.districtCode, {
            select: {
                id: true,
                name: true,
                type: true,
                codename: true,
                code: true,
                provinceCode: true,
            },
        });
        const province = await this.provinceService.findOneByCode(district.provinceCode, {
            select: {
                id: true,
                name: true,
                type: true,
                codename: true,
                code: true,
            },
        });
        if (address) {
            station.address = address;
        }
        station.fullAddress = `${station.address}, ${station.ward.name}, ${district.name}, ${province.name}`;
        station['district'] = district;
        station['province'] = province;
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: userId, isActive: true } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        station.updatedBy = adminExist.id;
        const updateStation = await this.stationRepository.save(station);
        delete updateStation.ward.deletedAt;
        if (images && images.length > 0) {
            await this.imageResourceService.removeImageResourcesByStationId(id);
            const newImages = images.map(async (image) => {
                const newImage = await this.imageResourceService.saveImageResource(image, adminExist.id, null, updateStation.id);
                delete newImage.station;
                delete newImage.updatedBy;
                delete newImage.updatedAt;
                delete newImage.deletedAt;
                return newImage;
            });
            updateStation.images = await Promise.all(newImages);
        }
        return updateStation;
    }
    async updateStationByCode(userId, currentCode, dto) {
        const { name, address, wardCode, images } = dto;
        const station = await this.getOneStationByCode(currentCode);
        if (wardCode) {
            const ward = await this.dataSource
                .getRepository(entities_1.Ward)
                .findOne({ where: { code: wardCode } });
            station.ward = ward;
        }
        delete station.ward.createdAt;
        delete station.ward.updatedAt;
        delete station.ward.createdBy;
        delete station.ward.updatedBy;
        if (name) {
            station.name = name;
        }
        const district = await this.districtService.findOneByCode(station.ward.districtCode, {
            select: {
                id: true,
                name: true,
                type: true,
                codename: true,
                code: true,
                provinceCode: true,
            },
        });
        const province = await this.provinceService.findOneByCode(district.provinceCode, {
            select: {
                id: true,
                name: true,
                type: true,
                codename: true,
                code: true,
            },
        });
        if (address) {
            station.address = address;
        }
        station.fullAddress = `${station.address}, ${station.ward.name}, ${district.name}, ${province.name}`;
        station['district'] = district;
        station['province'] = province;
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: userId, isActive: true } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        station.updatedBy = adminExist.id;
        const updateStation = await this.stationRepository.save(station);
        delete updateStation.deletedAt;
        if (images && images.length > 0) {
            await this.imageResourceService.removeImageResourcesByStationId(updateStation.id);
            const newImages = images.map(async (image) => {
                const newImage = await this.imageResourceService.saveImageResource(image, adminExist.id, null, updateStation.id);
                delete newImage.station;
                delete newImage.updatedBy;
                delete newImage.updatedAt;
                delete newImage.deletedAt;
                return newImage;
            });
            updateStation.images = await Promise.all(newImages);
        }
        return updateStation;
    }
    async deleteStationById(userId, id) {
        const station = await this.stationRepository.findOne({ where: { id } });
        if (!station) {
            throw new common_1.NotFoundException('STATION_NOT_FOUND');
        }
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: userId, isActive: true } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        station.deletedAt = new Date();
        station.updatedBy = adminExist.id;
        return await this.stationRepository.save(station);
    }
    async deleteStationByCode(userId, code) {
        const station = await this.stationRepository.findOne({ where: { code } });
        if (!station) {
            throw new common_1.NotFoundException('STATION_NOT_FOUND');
        }
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: userId, isActive: true } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        station.deletedAt = new Date();
        station.updatedBy = adminExist.id;
        return await this.stationRepository.save(station);
    }
    async deleteMultipleStationByIds(userId, dto) {
        try {
            const { ids } = dto;
            const list = await Promise.all(ids.map(async (id) => {
                await this.deleteStationById(userId, id);
            }));
            return list;
        }
        catch (err) {
            throw new common_2.BadRequestException(err.message);
        }
    }
    async deleteMultipleStationByCodes(userId, dto) {
        try {
            const { codes } = dto;
            const list = await Promise.all(codes.map(async (code) => {
                await this.deleteStationByCode(userId, code);
            }));
            return list;
        }
        catch (err) {
            throw new common_2.BadRequestException(err.message);
        }
    }
    async exportStation(dto, res) {
        try {
            const query = this.stationRepository.createQueryBuilder('r');
            if (dto === null || dto === void 0 ? void 0 : dto.keywords) {
                query
                    .orWhere('r.name LIKE :query')
                    .orWhere('r.address LIKE :query')
                    .setParameter('query', `%${dto === null || dto === void 0 ? void 0 : dto.keywords}%`);
            }
            const dataResult = await query
                .leftJoinAndSelect('r.ward', 'w')
                .select(['r', 'w.id', 'w.code'])
                .orderBy('r.createdAt', enums_1.SortEnum.ASC)
                .getMany();
            if (dataResult.length > 0) {
                const queryImage = this.dataSource
                    .getRepository(entities_1.ImageResource)
                    .createQueryBuilder('i');
                const images = await queryImage
                    .andWhere('i.station_id IN (:...ids)', {
                    ids: dataResult.map((station) => station.id),
                })
                    .leftJoinAndSelect('i.station', 's')
                    .select(['i.id', 'i.url', 'i.updatedAt', 'i.createdAt', 's.id'])
                    .getMany();
                dataResult.forEach((station) => {
                    station.images = images.filter((image) => image.station.id === station.id);
                });
            }
            const workBook = new excel.Workbook();
            const workSheet = workBook.addWorksheet('Thông tin bến xe');
            dataResult.map((item, index) => {
                workSheet.addRow([
                    index + 1,
                    item.id,
                    item.name,
                    item.address,
                    item.createdAt,
                ]);
            });
            const buffer = await workBook.xlsx.writeBuffer();
            const stream = new stream_1.Readable();
            stream.push(buffer);
            stream.push(null);
            res.set({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Length': buffer.byteLength,
            });
            stream.pipe(res);
        }
        catch (error) {
            throw new common_2.BadRequestException(error.message);
        }
    }
};
StationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(entities_1.Station)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        image_resource_service_1.ImageResourceService,
        ward_service_1.WardService,
        district_service_1.DistrictService,
        province_service_1.ProvinceService,
        typeorm_1.DataSource])
], StationService);
exports.StationService = StationService;
//# sourceMappingURL=station.service.js.map