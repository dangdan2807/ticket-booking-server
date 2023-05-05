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
exports.TripDetailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./../../database/entities");
const typeorm_2 = require("typeorm");
const enums_1 = require("./../../enums");
const ticket_service_1 = require("../ticket/ticket.service");
const moment = require("moment");
moment.locale('vi');
let TripDetailService = class TripDetailService {
    constructor(tripDetailRepository, ticketService, dataSource) {
        this.tripDetailRepository = tripDetailRepository;
        this.ticketService = ticketService;
        this.dataSource = dataSource;
        this.tripDetailSelect = [
            'q',
        ];
    }
    async validateTripDetailExistTime(date, vehicleId) {
        const tripDetailExist = await this.dataSource
            .getRepository(entities_1.TripDetail)
            .findOne({
            where: {
                departureTime: (0, typeorm_2.LessThanOrEqual)(date),
                expectedTime: (0, typeorm_2.MoreThanOrEqual)(date),
                vehicle: {
                    id: vehicleId,
                },
            },
        });
        if (tripDetailExist) {
            const tripDetailCodeErr = tripDetailExist.code;
            throw new common_1.BadRequestException(`VEHICLE_HAS_BEEN_USED_IN_OTHER_TRIP_DETAIL`, {
                description: `Xe này đã được sử dụng trong chuyến khác có mã ${tripDetailCodeErr}`,
            });
        }
    }
    async findOneTripDetail(options) {
        return await this.tripDetailRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), relations: Object.assign({ vehicle: { images: true }, trip: {
                    fromStation: true,
                    toStation: true,
                } }, options === null || options === void 0 ? void 0 : options.relations), select: Object.assign({ deletedAt: false, vehicle: {
                    id: true,
                    code: true,
                    name: true,
                    description: true,
                    type: true,
                    licensePlate: true,
                    floorNumber: true,
                    totalSeat: true,
                    images: {
                        id: true,
                        url: true,
                    },
                }, trip: {
                    id: true,
                    code: true,
                    name: true,
                    note: true,
                    startDate: true,
                    endDate: true,
                    status: true,
                    fromStation: {
                        id: true,
                        code: true,
                        name: true,
                        address: true,
                        fullAddress: true,
                    },
                    toStation: {
                        id: true,
                        code: true,
                        name: true,
                        address: true,
                        fullAddress: true,
                    },
                } }, options === null || options === void 0 ? void 0 : options.select) }, options.other));
    }
    async findTripDetailById(id, options) {
        if (options) {
            options.where = Object.assign({ id }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { id } };
        }
        return await this.findOneTripDetail(options);
    }
    async findTripDetailByCode(code, options) {
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOneTripDetail(options);
    }
    async getTripDetailById(id, options) {
        const tripDetail = await this.findTripDetailById(id, options);
        if (!tripDetail) {
            throw new common_1.NotFoundException('TRIP_DETAIL_NOT_FOUND');
        }
        return tripDetail;
    }
    async getTripDetailByCode(code, options) {
        const tripDetail = await this.findTripDetailByCode(code, options);
        if (!tripDetail) {
            throw new common_1.NotFoundException('TRIP_DETAIL_NOT_FOUND');
        }
        return tripDetail;
    }
    async findAllTripDetail(dto, pagination) {
        const { minDepartureTime, departureTime, maxDepartureTime, status, tripId, tripCode, fromProvinceCode, toProvinceCode, sort, } = dto;
        const query = this.tripDetailRepository.createQueryBuilder('q');
        if (minDepartureTime) {
            query.andWhere('q.departureTime > :minDepartureTime', {
                minDepartureTime,
            });
        }
        if (departureTime) {
            const minTime = moment(departureTime).startOf('day').toDate();
            const maxTime = moment(departureTime).endOf('day').toDate();
            query
                .andWhere('q.departureTime >= :minTime', { minTime })
                .andWhere('q.departureTime <= :maxTime', { maxTime });
        }
        if (maxDepartureTime) {
            query.andWhere('q.departureTime <= :maxDepartureTime', {
                maxDepartureTime,
            });
        }
        switch (status) {
            case enums_1.TripDetailStatusEnum.NOT_SOLD_OUT:
            case enums_1.TripDetailStatusEnum.SOLD_OUT:
                query.andWhere('q.status = :status', { status });
                break;
            default:
                break;
        }
        if (tripId) {
            query.andWhere('t.id = :tripId', { tripId: tripId });
        }
        else if (tripCode) {
            query.andWhere('t.code = :tripCode', { tripCode: tripCode });
        }
        if (fromProvinceCode) {
            query
                .leftJoinAndSelect('q.fromProvince', 'fp')
                .andWhere('fp.code = :fromProvinceCode', {
                fromProvinceCode,
            });
        }
        if (toProvinceCode) {
            query
                .leftJoinAndSelect('q.toProvince', 'tp')
                .andWhere('tp.code = :toProvinceCode', { toProvinceCode });
        }
        const dataResult = await query
            .leftJoinAndSelect('q.trip', 't')
            .select(this.tripDetailSelect)
            .orderBy('q.departureTime', sort || enums_1.SortEnum.ASC)
            .addOrderBy('q.createdAt', enums_1.SortEnum.ASC)
            .addOrderBy('q.code', enums_1.SortEnum.ASC)
            .offset(pagination.skip || 0)
            .limit(pagination.take || 10)
            .getMany();
        const total = await query.getCount();
        return { dataResult, pagination, total };
    }
    async createTripDetail(dto, userId) {
        const { code, departureTime, expectedTime, status, tripId, tripCode, vehicleId, vehicleCode, } = dto;
        const tripDetailCodeExist = await this.findTripDetailByCode(code);
        if (tripDetailCodeExist) {
            throw new common_1.BadRequestException('TRIP_DETAIL_CODE_EXIST');
        }
        const tripDetail = new entities_1.TripDetail();
        tripDetail.code = code;
        let trip;
        const relations = {
            fromStation: { ward: { district: { province: true } } },
            toStation: { ward: { district: { province: true } } },
        };
        if (!tripId && !tripCode) {
            throw new common_1.NotFoundException('TRIP_ID_OR_CODE_REQUIRED');
        }
        if (tripId) {
            trip = await this.dataSource.getRepository(entities_1.Trip).findOne({
                where: { id: tripId },
                relations,
            });
        }
        else {
            trip = await this.dataSource.getRepository(entities_1.Trip).findOne({
                where: { code: tripCode },
                relations,
            });
        }
        if (!trip) {
            throw new common_1.BadRequestException('TRIP_NOT_FOUND');
        }
        const fromProvince = trip.fromStation.ward.district.province;
        const toProvince = trip.toStation.ward.district.province;
        tripDetail.trip = trip;
        tripDetail.fromProvince = fromProvince;
        tripDetail.toProvince = toProvince;
        const currentDate = new Date(moment().format('YYYY-MM-DD HH:mm'));
        if (trip.endDate < currentDate) {
            throw new common_1.BadRequestException('TRIP_HAS_ENDED');
        }
        if (!departureTime) {
            throw new common_1.BadRequestException('DEPARTURE_TIME_REQUIRED');
        }
        const tomorrowDate = new Date(moment().add(1, 'days').format('YYYY-MM-DD'));
        if (departureTime < tomorrowDate) {
            throw new common_1.BadRequestException('DEPARTURE_DATE_GREATER_THAN_OR_EQUAL_TO_TOMORROW');
        }
        if (departureTime < trip.startDate) {
            throw new common_1.BadRequestException('DEPARTURE_DATE_GREATER_THAN_OR_EQUAL_TO_TRIP_START_DATE');
        }
        if (departureTime > trip.endDate) {
            throw new common_1.BadRequestException('DEPARTURE_DATE_LESS_THAN_OR_EQUAL_TO_TRIP_END_DATE');
        }
        tripDetail.departureTime = departureTime;
        if (!expectedTime) {
            throw new common_1.BadRequestException('EXPECTED_TIME_REQUIRED');
        }
        const expectedDate = new Date(moment(departureTime).add(2, 'hours').format('YYYY-MM-DD HH:mm'));
        if (expectedTime < expectedDate) {
            throw new common_1.BadRequestException('EXPECTED_DATE_GREATER_THAN_OR_EQUAL_TO_DEPARTURE_DATE_PLUS_2_HOURS');
        }
        if (expectedTime < trip.startDate) {
            throw new common_1.BadRequestException('EXPECTED_DATE_GREATER_THAN_OR_EQUAL_TO_TRIP_START_DATE');
        }
        tripDetail.expectedTime = expectedTime;
        switch (status) {
            case enums_1.TripDetailStatusEnum.SOLD_OUT:
                tripDetail.status = status;
                break;
            default:
                tripDetail.status = enums_1.TripDetailStatusEnum.NOT_SOLD_OUT;
                break;
        }
        if (!vehicleId && !vehicleCode) {
            throw new common_1.NotFoundException('ID_OR_CODE_REQUIRED');
        }
        let vehicle;
        if (vehicleId) {
            vehicle = await this.dataSource
                .getRepository(entities_1.Vehicle)
                .findOne({ where: { id: vehicleId } });
        }
        else if (vehicleCode) {
            vehicle = await this.dataSource
                .getRepository(entities_1.Vehicle)
                .findOne({ where: { code: vehicleCode } });
        }
        if (!vehicle) {
            throw new common_1.BadRequestException('VEHICLE_NOT_FOUND');
        }
        await this.validateTripDetailExistTime(departureTime, vehicle.id);
        await this.validateTripDetailExistTime(expectedTime, vehicle.id);
        tripDetail.vehicle = vehicle;
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: userId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('USER_NOT_FOUND');
        }
        if (!adminExist.isActive) {
            throw new common_1.UnauthorizedException('USER_NOT_ACTIVE');
        }
        tripDetail.createdBy = adminExist.id;
        const saveTripDetail = await this.tripDetailRepository.save(tripDetail);
        await this.ticketService.createTicket({
            code: saveTripDetail.code,
            note: '',
            startDate: new Date(),
            endDate: departureTime,
            tripDetailId: saveTripDetail.id,
        }, adminExist.id);
        return {
            id: saveTripDetail.id,
            code: saveTripDetail.code,
            departureTime: saveTripDetail.departureTime,
            expectedTime: saveTripDetail.expectedTime,
            status: saveTripDetail.status,
            createdBy: saveTripDetail.createdBy,
            updatedBy: saveTripDetail.updatedBy,
            createdAt: saveTripDetail.createdAt,
            updatedAt: saveTripDetail.updatedAt,
            trip: {
                id: trip.id,
                code: trip.code,
            },
            vehicle: {
                id: vehicle.id,
                code: vehicle.code,
            },
        };
    }
    async updateTripDetailByIdOrCode(dto, userId, id, code) {
        const { status, vehicleId, departureTime, expectedTime, vehicleCode } = dto;
        let tripDetail;
        if (!id && !code) {
            throw new common_1.BadRequestException('ID_OR_CODE_REQUIRED');
        }
        if (id) {
            tripDetail = await this.findTripDetailById(id, {
                relations: { trip: true },
            });
        }
        else {
            tripDetail = await this.findTripDetailByCode(code, {
                relations: { trip: true },
            });
        }
        if (!tripDetail) {
            throw new common_1.NotFoundException('TRIP_DETAIL_NOT_FOUND');
        }
        const trip = tripDetail.trip;
        const currentDate = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
        if (trip.endDate < currentDate) {
            throw new common_1.BadRequestException('TRIP_HAS_ENDED_NOT_UPDATE');
        }
        if (tripDetail.departureTime < currentDate) {
            throw new common_1.BadRequestException('TRIP_DETAIL_HAS_ENDED_NOT_UPDATE');
        }
        const currentDatePlus15M = new Date(moment().add(15, 'minutes').format('YYYY-MM-DD HH:mm'));
        if (departureTime) {
            if (departureTime < currentDatePlus15M) {
                throw new common_1.BadRequestException('DEPARTURE_DATE_GREATER_THAN_OR_EQUAL_TO_CURRENT_DATE_PLUS_15_MINUTES');
            }
            if (departureTime < trip.startDate) {
                throw new common_1.BadRequestException('DEPARTURE_DATE_GREATER_THAN_OR_EQUAL_TO_TRIP_START_DATE');
            }
            if (departureTime > trip.endDate) {
                throw new common_1.BadRequestException('DEPARTURE_DATE_LESS_THAN_OR_EQUAL_TO_TRIP_END_DATE');
            }
            if ((expectedTime && departureTime >= expectedTime) ||
                (!expectedTime && departureTime >= tripDetail.expectedTime)) {
                throw new common_1.BadRequestException('EXPECTED_DATE_GREATER_THAN_DEPARTURE_DATE');
            }
            tripDetail.departureTime = departureTime;
        }
        if (expectedTime) {
            const departureTime2 = departureTime || tripDetail.departureTime;
            const expectedDate = new Date(moment(departureTime2).add(2, 'hours').format('YYYY-MM-DD HH:mm'));
            if (expectedTime < expectedDate) {
                throw new common_1.BadRequestException('EXPECTED_DATE_GREATER_THAN_OR_EQUAL_TO_DEPARTURE_DATE_PLUS_2_HOURS');
            }
            if (expectedTime < trip.startDate) {
                throw new common_1.BadRequestException('EXPECTED_DATE_GREATER_THAN_OR_EQUAL_TO_TRIP_START_DATE');
            }
            tripDetail.expectedTime = expectedTime;
        }
        switch (status) {
            case enums_1.TripDetailStatusEnum.NOT_SOLD_OUT:
            case enums_1.TripDetailStatusEnum.SOLD_OUT:
                tripDetail.status = status;
                break;
            default:
                break;
        }
        if (vehicleId) {
            const vehicle = await this.dataSource
                .getRepository(entities_1.Vehicle)
                .findOne({ where: { id: vehicleId } });
            if (!vehicle) {
                throw new common_1.BadRequestException('VEHICLE_NOT_FOUND');
            }
            tripDetail.vehicle = vehicle;
        }
        else if (vehicleCode) {
            const vehicle = await this.dataSource
                .getRepository(entities_1.Vehicle)
                .findOne({ where: { code: vehicleCode } });
            if (!vehicle) {
                throw new common_1.BadRequestException('VEHICLE_NOT_FOUND');
            }
            tripDetail.vehicle = vehicle;
        }
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: userId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('USER_NOT_FOUND');
        }
        if (!adminExist.isActive) {
            throw new common_1.UnauthorizedException('USER_NOT_ACTIVE');
        }
        tripDetail.updatedBy = adminExist.id;
        const saveTripDetail = await this.tripDetailRepository.save(tripDetail);
        const vehicle = tripDetail.vehicle;
        return {
            id: saveTripDetail.id,
            code: saveTripDetail.code,
            departureTime: saveTripDetail.departureTime,
            expectedTime: saveTripDetail.expectedTime,
            status: saveTripDetail.status,
            createdBy: saveTripDetail.createdBy,
            updatedBy: saveTripDetail.updatedBy,
            createdAt: saveTripDetail.createdAt,
            updatedAt: saveTripDetail.updatedAt,
            trip: {
                id: trip.id,
                code: trip.code,
            },
            vehicle: {
                id: vehicle.id,
                code: vehicle.code,
            },
        };
    }
    async deleteTripDetailByIdOrCode(userId, id, code) {
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: userId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('USER_NOT_FOUND');
        }
        if (!adminExist.isActive) {
            throw new common_1.UnauthorizedException('USER_NOT_ACTIVE');
        }
        let tripDetail;
        if (!id && !code) {
            throw new common_1.BadRequestException('ID_OR_CODE_REQUIRED');
        }
        if (id) {
            tripDetail = await this.findTripDetailById(id, {
                relations: { trip: true },
            });
        }
        else {
            tripDetail = await this.findTripDetailByCode(code, {
                relations: { trip: true },
            });
        }
        if (!tripDetail) {
            throw new common_1.BadRequestException('TRIP_DETAIL_NOT_FOUND');
        }
        const currentDate = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
        if (tripDetail.trip.endDate < currentDate) {
            throw new common_1.BadRequestException('TRIP_HAS_ENDED');
        }
        if (tripDetail.departureTime < currentDate) {
            throw new common_1.BadRequestException('TRIP_DETAIL_HAS_ENDED_NOT_DELETE');
        }
        tripDetail.deletedAt = new Date();
        tripDetail.updatedBy = adminExist.id;
        const saveTripDetail = await this.tripDetailRepository.save(tripDetail);
        return await {
            id: saveTripDetail.id,
            code: saveTripDetail.code,
            message: 'Xoá thành công',
        };
    }
    async deleteMultipleTripDetailByIdsOrCodes(userId, dto, type) {
        try {
            const { ids } = dto;
            const adminExist = await this.dataSource
                .getRepository(entities_1.Staff)
                .findOne({ where: { id: userId } });
            if (!adminExist) {
                throw new common_1.UnauthorizedException('USER_NOT_FOUND');
            }
            if (!adminExist.isActive) {
                throw new common_1.UnauthorizedException('USER_NOT_ACTIVE');
            }
            const list = await Promise.all(ids.map(async (data) => {
                if (!data) {
                    return {
                        id: type === enums_1.DeleteDtoTypeEnum.ID ? data : undefined,
                        code: type === enums_1.DeleteDtoTypeEnum.CODE ? data : undefined,
                        message: `${type} không được để trống`,
                    };
                }
                let tripDetail;
                if (type === enums_1.DeleteDtoTypeEnum.ID) {
                    tripDetail = await this.findTripDetailById(data, {
                        relations: { trip: true },
                    });
                }
                else if (type === enums_1.DeleteDtoTypeEnum.CODE) {
                    tripDetail = await this.findTripDetailByCode(data, {
                        relations: { trip: true },
                    });
                }
                if (!tripDetail) {
                    return {
                        id: type === enums_1.DeleteDtoTypeEnum.ID ? data : undefined,
                        code: type === enums_1.DeleteDtoTypeEnum.CODE ? data : undefined,
                        message: 'TRIP_DETAIL_NOT_FOUND',
                    };
                }
                const currentDate = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
                if (tripDetail.trip.endDate < currentDate) {
                    throw new common_1.BadRequestException('TRIP_HAS_ENDED');
                }
                if (tripDetail.departureTime < currentDate) {
                    throw new common_1.BadRequestException('TRIP_DETAIL_HAS_ENDED_NOT_DELETE');
                }
                tripDetail.deletedAt = new Date();
                tripDetail.updatedBy = adminExist.id;
                const saveTripDetail = await this.tripDetailRepository.save(tripDetail);
                return {
                    id: saveTripDetail.id,
                    code: saveTripDetail.code,
                    message: 'Xoá thành công',
                };
            }));
            return list;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async getBusSchedule(dto, userId) {
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: userId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('USER_NOT_FOUND');
        }
        if (!adminExist.isActive) {
            throw new common_1.UnauthorizedException('USER_NOT_ACTIVE');
        }
        const { startDate, endDate, status, tripCode } = dto;
        if (!startDate) {
            throw new common_1.BadRequestException('START_DATE_IS_REQUIRED');
        }
        if (!endDate) {
            throw new common_1.BadRequestException('END_DATE_IS_REQUIRED');
        }
        if (startDate > endDate) {
            throw new common_1.BadRequestException('START_DATE_MUST_BE_BEFORE_END_DATE');
        }
        const newStartDate = moment(startDate).startOf('day').toDate();
        const newEndDate = moment(endDate).endOf('day').toDate();
        if (moment(newEndDate).diff(moment(newStartDate), 'days') > 7) {
            throw new common_1.BadRequestException('START_DATE_NOT_MORE_THAN_7_DAYS_FROM_END_DATE');
        }
        const trips = await this.tripDetailRepository
            .createQueryBuilder('q')
            .leftJoinAndSelect('q.trip', 'trip')
            .leftJoinAndSelect('q.vehicle', 'vehicle')
            .where('q.departureTime BETWEEN :startDate AND :endDate', {
            startDate: newStartDate,
            endDate: newEndDate,
        });
        if (tripCode) {
            trips.andWhere('trip.code = :tripCode', { tripCode });
        }
        if (status) {
            trips.andWhere('q.status = :status', { status });
        }
        const data = await trips.getMany();
        const dataResult = data.map((item) => {
            return {
                id: item.id,
                code: item.code,
                departureTime: item.departureTime,
                expectedTime: item.expectedTime,
                status: item.status,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                trip: {
                    id: item.trip.id,
                    code: item.trip.code,
                    name: item.trip.name,
                    status: item.trip.status,
                },
                vehicle: {
                    id: item.vehicle.id,
                    code: item.vehicle.code,
                    name: item.vehicle.name,
                    status: item.vehicle.status,
                    type: item.vehicle.type,
                    licensePlate: item.vehicle.licensePlate,
                    floorNumber: item.vehicle.floorNumber,
                    totalSeat: item.vehicle.totalSeat,
                },
            };
        });
        return { dataResult, total: dataResult.length };
    }
};
TripDetailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.TripDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ticket_service_1.TicketService,
        typeorm_2.DataSource])
], TripDetailService);
exports.TripDetailService = TripDetailService;
//# sourceMappingURL=trip-detail.service.js.map