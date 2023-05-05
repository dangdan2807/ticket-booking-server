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
exports.TripService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./../../database/entities");
const typeorm_2 = require("typeorm");
const enums_1 = require("./../../enums");
const moment = require("moment");
moment.locale('vi');
let TripService = class TripService {
    constructor(tripRepository, dataSource) {
        this.tripRepository = tripRepository;
        this.dataSource = dataSource;
        this.tripSelectFieldsWithQ = [
            'q.id',
            'q.code',
            'q.name',
            'q.note',
            'q.startDate',
            'q.endDate',
            'q.createdBy',
            'q.updatedBy',
            'q.status',
            'q.createdAt',
            'q.updatedAt',
            'fs.id',
            'fs.code',
            'fs.name',
            'ts.id',
            'ts.code',
            'ts.name',
        ];
    }
    async findOneTrip(options) {
        var _a, _b;
        const trip = await this.tripRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), relations: Object.assign({ fromStation: true, toStation: true }, options === null || options === void 0 ? void 0 : options.relations), select: Object.assign({ fromStation: Object.assign({ id: true, name: true, code: true }, (_a = options === null || options === void 0 ? void 0 : options.select) === null || _a === void 0 ? void 0 : _a.fromStation), toStation: Object.assign({ id: true, name: true, code: true }, (_b = options === null || options === void 0 ? void 0 : options.select) === null || _b === void 0 ? void 0 : _b.toStation) }, options === null || options === void 0 ? void 0 : options.select), order: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.order) }, options.other));
        return trip;
    }
    async findOneTripById(id, options) {
        if (options) {
            options.where = Object.assign({ id }, options.where);
        }
        else {
            options = { where: { id } };
        }
        return await this.findOneTrip(options);
    }
    async findOneTripByCode(code, options) {
        if (options) {
            options.where = Object.assign({ code }, options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOneTrip(options);
    }
    async getTripStatus() {
        return {
            dataResult: Object.keys(enums_1.ActiveStatusEnum).map((key) => enums_1.ActiveStatusEnum[key]),
        };
    }
    async createTrip(dto, userId) {
        const { code, name, note, startDate, endDate, fromStationId, toStationId, status, } = dto;
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: userId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const tripExist = await this.findOneTripById(code, {
            other: {
                withDeleted: true,
            },
        });
        if (tripExist) {
            throw new common_1.BadRequestException('TRIP_CODE_EXIST');
        }
        const trip = new entities_1.Trip();
        trip.code = code;
        trip.name = name;
        trip.note = note;
        const currentDate = moment().startOf('day').toDate();
        const newStartDate = moment(startDate).startOf('day').toDate();
        if (newStartDate <= currentDate) {
            throw new common_1.BadRequestException('START_DATE_GREATER_THAN_NOW');
        }
        trip.startDate = newStartDate;
        const newEndDate = moment(endDate).startOf('day').toDate();
        if (newEndDate < currentDate) {
            throw new common_1.BadRequestException('END_DATE_GREATER_THAN_NOW');
        }
        if (newEndDate <= startDate) {
            throw new common_1.BadRequestException('END_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_START_DATE');
        }
        trip.endDate = newEndDate;
        const fromStation = await this.dataSource
            .getRepository(entities_1.Station)
            .findOne({ where: { id: fromStationId } });
        if (!fromStation) {
            throw new common_1.BadRequestException('FROM_STATION_NOT_FOUND');
        }
        trip.fromStation = fromStation;
        const toStation = await this.dataSource
            .getRepository(entities_1.Station)
            .findOne({ where: { id: toStationId } });
        if (!toStation) {
            throw new common_1.BadRequestException('TO_STATION_NOT_FOUND');
        }
        trip.toStation = toStation;
        if (fromStationId === toStationId) {
            throw new common_1.BadRequestException('FROM_STATION_AND_TO_STATION_IS_SAME');
        }
        switch (status) {
            case enums_1.ActiveStatusEnum.ACTIVE:
            case enums_1.ActiveStatusEnum.INACTIVE:
                trip.status = status;
                break;
            default:
                throw new common_1.BadRequestException('TRIP_STATUS_IS_ENUM');
        }
        trip.createdBy = adminExist.id;
        const saveTrip = await this.tripRepository.save(trip);
        delete saveTrip.fromStation;
        delete saveTrip.toStation;
        delete saveTrip.deletedAt;
        return Object.assign(Object.assign({}, saveTrip), { fromStation: {
                id: fromStation.id,
                code: fromStation.code,
                name: fromStation.name,
            }, toStation: {
                id: toStation.id,
                code: toStation.code,
                name: toStation.name,
            } });
    }
    async findAllTrip(dto, pagination) {
        const { keywords, fromStationId, toStationId, status, startDate, endDate, toStationCode, fromStationCode, sort, } = dto;
        const query = this.tripRepository.createQueryBuilder('q');
        if (keywords) {
            const newKeywords = keywords.trim();
            const subQuery = this.tripRepository
                .createQueryBuilder('q')
                .select('q.id')
                .where('q.code LIKE :code', { code: `%${newKeywords}%` })
                .orWhere('q.name LIKE :name', { name: `%${newKeywords}%` })
                .orWhere('q.note LIKE :note', { note: `%${newKeywords}%` })
                .getQuery();
            query.andWhere(`q.id in (${subQuery})`, {
                code: `%${newKeywords}%`,
                name: `%${newKeywords}%`,
                note: `%${newKeywords}%`,
            });
        }
        if (startDate) {
            const newStartDate = moment(startDate).startOf('day').toDate();
            query.andWhere('q.startDate >= :startDate', { startDate: newStartDate });
        }
        if (endDate) {
            const newEndDate = moment(endDate).startOf('day').toDate();
            query.andWhere('q.endDate <= :endDate', { endDate: newEndDate });
        }
        if (fromStationId) {
            query.andWhere('fs.id = :fromStationId', { fromStationId });
        }
        if (toStationId) {
            query.andWhere('ts.id = :toStationId', { toStationId });
        }
        if (fromStationCode) {
            query.andWhere('fs.code = :fromStationCode', { fromStationCode });
        }
        if (toStationCode) {
            query.andWhere('ts.code = :toStationCode', { toStationCode });
        }
        switch (status) {
            case enums_1.ActiveStatusEnum.ACTIVE:
            case enums_1.ActiveStatusEnum.INACTIVE:
                query.andWhere('q.status = :status', { status });
                break;
            default:
                break;
        }
        const dataResult = await query
            .leftJoinAndSelect('q.fromStation', 'fs')
            .leftJoinAndSelect('q.toStation', 'ts')
            .select(this.tripSelectFieldsWithQ)
            .orderBy('q.name', enums_1.SortEnum.ASC)
            .addOrderBy('q.code', enums_1.SortEnum.ASC)
            .addOrderBy('q.createdAt', sort || enums_1.SortEnum.DESC)
            .offset(pagination.skip)
            .limit(pagination.take)
            .getMany();
        const total = await query.getCount();
        return { dataResult, pagination, total };
    }
    async getTripById(id, options) {
        const trip = await this.findOneTripById(id, options);
        if (!trip) {
            throw new common_1.BadRequestException('TRIP_NOT_FOUND');
        }
        return trip;
    }
    async getTripByCode(code, options) {
        const trip = await this.findOneTripByCode(code, options);
        if (!trip) {
            throw new common_1.BadRequestException('TRIP_NOT_FOUND');
        }
        return trip;
    }
    async updateTripByIdOrCode(dto, userId, id, code) {
        const { name, note, startDate, endDate, fromStationId, toStationId, status, } = dto;
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: userId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        if (!id && !code) {
            throw new common_1.BadRequestException('ID_OR_CODE_IS_REQUIRED');
        }
        let trip;
        if (id) {
            trip = await this.getTripById(id);
        }
        else if (code) {
            trip = await this.getTripByCode(code);
        }
        if (!trip) {
            throw new common_1.BadRequestException('TRIP_NOT_FOUND');
        }
        if (trip.status === enums_1.ActiveStatusEnum.ACTIVE) {
            throw new common_1.BadRequestException('TRIP_IS_ACTIVE');
        }
        if (name) {
            trip.name = name;
        }
        if (note) {
            trip.note = note;
        }
        const currentDate = moment().startOf('day').toDate();
        if (startDate) {
            const newStartDate = moment(startDate).startOf('day').toDate();
            if (newStartDate <= currentDate) {
                throw new common_1.BadRequestException('START_DATE_GREATER_THAN_NOW');
            }
            if ((endDate && newStartDate > endDate) ||
                (!endDate && newStartDate > trip.endDate)) {
                throw new common_1.BadRequestException('END_DATE_MUST_BE_GREATER_THAN_START_DATE');
            }
            trip.startDate = newStartDate;
        }
        if (endDate) {
            const newEndDate = moment(endDate).startOf('day').toDate();
            if (newEndDate <= currentDate) {
                throw new common_1.BadRequestException('END_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_NOW');
            }
            if ((startDate && newEndDate < startDate) ||
                (!startDate && newEndDate < trip.startDate)) {
                throw new common_1.BadRequestException('END_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_START_DATE');
            }
            trip.endDate = newEndDate;
        }
        if (fromStationId) {
            const fromStation = await this.dataSource
                .getRepository(entities_1.Station)
                .findOne({ where: { id: fromStationId } });
            if (!fromStation) {
                throw new common_1.BadRequestException('FROM_STATION_NOT_FOUND');
            }
            trip.fromStation = fromStation;
        }
        if (toStationId) {
            const toStation = await this.dataSource
                .getRepository(entities_1.Station)
                .findOne({ where: { id: toStationId } });
            if (!toStation) {
                throw new common_1.BadRequestException('TO_STATION_NOT_FOUND');
            }
            trip.toStation = toStation;
        }
        if (fromStationId === toStationId) {
            throw new common_1.BadRequestException('FROM_STATION_AND_TO_STATION_IS_SAME');
        }
        switch (status) {
            case enums_1.ActiveStatusEnum.ACTIVE:
            case enums_1.ActiveStatusEnum.INACTIVE:
                trip.status = status;
                break;
            default:
                break;
        }
        trip.updatedBy = adminExist.id;
        const updateTrip = await this.tripRepository.save(trip);
        return {
            id: updateTrip.id,
            name: updateTrip.name,
            note: updateTrip.note,
            startDate: updateTrip.startDate,
            endDate: updateTrip.endDate,
            isActive: updateTrip.status,
            createdBy: updateTrip.createdBy,
            updatedBy: updateTrip.updatedBy,
            createdAt: updateTrip.createdAt,
            updatedAt: updateTrip.updatedAt,
            fromStation: {
                id: updateTrip.fromStation.id,
                code: updateTrip.fromStation.code,
                name: updateTrip.fromStation.name,
            },
            toStation: {
                id: updateTrip.toStation.id,
                code: updateTrip.toStation.code,
                name: updateTrip.toStation.name,
            },
        };
    }
    async deleteTripByIdOrCode(adminId, id, code) {
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: adminId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        if (!id && !code) {
            throw new common_1.BadRequestException('ID_OR_CODE_IS_REQUIRED');
        }
        let trip;
        if (id) {
            trip = await this.getTripById(id);
        }
        else if (code) {
            trip = await this.getTripByCode(code);
        }
        if (!trip) {
            throw new common_1.BadRequestException('TRIP_NOT_FOUND');
        }
        trip.deletedAt = new Date();
        trip.updatedBy = adminExist.id;
        const saveTrip = await this.tripRepository.save(trip);
        return {
            id: saveTrip.id,
            code: saveTrip.code,
            message: 'Xoá tuyến xe thành công',
        };
    }
    async deleteMultipleTripByIdsOrCodes(userId, dto, type) {
        try {
            const adminExist = await this.dataSource
                .getRepository(entities_1.Staff)
                .findOne({ where: { id: userId } });
            if (!adminExist) {
                throw new common_1.UnauthorizedException('UNAUTHORIZED');
            }
            if (!adminExist.isActive) {
                throw new common_1.BadRequestException('USER_NOT_ACTIVE');
            }
            const { ids } = dto;
            const list = await Promise.all(ids.map(async (data) => {
                if (!data) {
                    return {
                        id: type === enums_1.DeleteDtoTypeEnum.ID ? data : undefined,
                        code: type === enums_1.DeleteDtoTypeEnum.CODE ? data : undefined,
                        message: `${type} không được để trống`,
                    };
                }
                let trip;
                if (type === enums_1.DeleteDtoTypeEnum.ID) {
                    trip = await this.getTripById(data);
                }
                else if (type === enums_1.DeleteDtoTypeEnum.CODE) {
                    trip = await this.getTripByCode(data);
                }
                if (!trip) {
                    return {
                        id: type === enums_1.DeleteDtoTypeEnum.ID ? data : undefined,
                        code: type === enums_1.DeleteDtoTypeEnum.CODE ? data : undefined,
                        message: 'Không tìm thấy tuyến xe',
                    };
                }
                trip.deletedAt = new Date();
                trip.updatedBy = adminExist.id;
                const saveTrip = await this.tripRepository.softRemove(trip);
                return {
                    id: saveTrip.id,
                    code: saveTrip.code,
                    message: 'Xoá tuyến xe thành công',
                };
            }));
            return list;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
};
TripService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Trip)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], TripService);
exports.TripService = TripService;
//# sourceMappingURL=trip.service.js.map