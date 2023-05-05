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
exports.PriceListService = void 0;
const enums_1 = require("./../../enums");
const entities_1 = require("./../../database/entities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment = require("moment");
moment.locale('vi');
let PriceListService = class PriceListService {
    constructor(priceListRepository, priceDetailRepository, dataSource) {
        this.priceListRepository = priceListRepository;
        this.priceDetailRepository = priceDetailRepository;
        this.dataSource = dataSource;
        this.selectFieldsPriceDetailWithQ = [
            'q.id',
            'q.code',
            'q.price',
            'q.seatType',
            'q.note',
            'q.priceListCode',
            'q.createdBy',
            'q.updatedBy',
            'q.createdAt',
            'q.updatedAt',
            't.id',
            't.code',
            't.name',
            't.note',
            't.startDate',
            't.endDate',
            't.status',
        ];
        this.selectFieldsPriceListWithQ = [
            'q.id',
            'q.code',
            'q.name',
            'q.note',
            'q.startDate',
            'q.endDate',
            'q.status',
            'q.createdAt',
            'q.updatedAt',
            'q.createdBy',
            'q.updatedBy',
        ];
    }
    async validOverlappingPriceList(date) {
        const priceListExist = await this.findOnePriceList({
            where: {
                status: enums_1.ActiveStatusEnum.ACTIVE,
                startDate: (0, typeorm_2.LessThanOrEqual)(date),
                endDate: (0, typeorm_2.MoreThanOrEqual)(date),
            },
        });
        if (priceListExist) {
            const code = priceListExist.code;
            throw new common_1.BadRequestException('ANOTHER_PRICE_LIST_IS_EXIST_IN_THIS_DATE', {
                description: `Bảng giá có mã ${code} đã tồn tại trong khoảng thời gian này`,
            });
        }
    }
    async validOverlappingPriceDetail(date, seatType, tripCode) {
        const priceDetail = await this.findOnePriceDetail({
            where: {
                seatType,
                priceList: {
                    startDate: (0, typeorm_2.LessThanOrEqual)(date),
                    endDate: (0, typeorm_2.MoreThanOrEqual)(date),
                    status: enums_1.ActiveStatusEnum.ACTIVE,
                },
                trip: {
                    code: tripCode,
                },
            },
            relations: {
                priceList: true,
                trip: true,
            },
        });
        if (priceDetail) {
            const priceList = priceDetail.priceList;
            throw new common_1.BadRequestException('TRIP_EXISTED_IN_PRICE_LIST', {
                description: `Loại ghế ${seatType} của tuyến có mã ${tripCode} đã tồn tại trong bảng giá đang hoạt động khác có mã ${priceList === null || priceList === void 0 ? void 0 : priceList.code}`,
            });
        }
    }
    async findOnePriceList(options) {
        const priceList = await this.priceListRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), select: Object.assign({ deletedAt: false }, options === null || options === void 0 ? void 0 : options.select), relations: Object.assign({}, options === null || options === void 0 ? void 0 : options.relations), order: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.order) }, options === null || options === void 0 ? void 0 : options.other));
        return priceList;
    }
    async findOnePriceListById(id, options) {
        if (options) {
            options.where = Object.assign({ id }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { id } };
        }
        return this.findOnePriceList(options);
    }
    async findOnePriceListByCode(code, options) {
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        return this.findOnePriceList(options);
    }
    async getPriceListById(id, options) {
        const priceList = await this.findOnePriceListById(id, options);
        if (!priceList) {
            throw new common_1.BadRequestException('PRICE_LIST_NOT_FOUND');
        }
        return priceList;
    }
    async getPriceListByCode(code, options) {
        const priceList = await this.findOnePriceListByCode(code, options);
        if (!priceList) {
            throw new common_1.BadRequestException('PRICE_LIST_NOT_FOUND');
        }
        return priceList;
    }
    async getPriceListStatus() {
        return {
            dataResult: Object.keys(enums_1.ActiveStatusEnum).map((key) => enums_1.ActiveStatusEnum[key]),
        };
    }
    async createPriceList(dto, adminId) {
        const { code, name, note, startDate, endDate, status } = dto;
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: adminId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const priceListCodeExist = await this.findOnePriceListByCode(code, {
            other: {
                withDeleted: true,
            },
        });
        if (priceListCodeExist) {
            throw new common_1.BadRequestException('PRICE_LIST_CODE_IS_EXIST');
        }
        const priceList = new entities_1.PriceList();
        if (!name) {
            throw new common_1.BadRequestException('NAME_IS_REQUIRED');
        }
        priceList.code = code;
        priceList.name = name;
        priceList.note = note;
        switch (status) {
            case enums_1.ActiveStatusEnum.ACTIVE:
                priceList.status = enums_1.ActiveStatusEnum.ACTIVE;
                break;
            default:
                priceList.status = enums_1.ActiveStatusEnum.INACTIVE;
                break;
        }
        priceList.createdBy = adminExist.id;
        if (!startDate) {
            throw new common_1.BadRequestException('START_DATE_IS_REQUIRED');
        }
        const newStartDate = moment(startDate).startOf('day').toDate();
        const currentDate = moment().startOf('day').toDate();
        if (newStartDate <= currentDate) {
            throw new common_1.BadRequestException('START_DATE_GREATER_THAN_NOW');
        }
        priceList.startDate = newStartDate;
        if (!endDate) {
            throw new common_1.BadRequestException('END_DATE_IS_REQUIRED');
        }
        const newEndDate = moment(endDate).endOf('day').toDate();
        if (newEndDate < currentDate) {
            throw new common_1.BadRequestException('END_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_NOW');
        }
        if (startDate > newEndDate) {
            throw new common_1.BadRequestException('START_DATE_MUST_BE_LESS_THAN_END_DATE');
        }
        priceList.endDate = newEndDate;
        const savePriceList = await this.priceListRepository.save(priceList);
        delete savePriceList.deletedAt;
        return savePriceList;
    }
    async findAllPriceList(dto, pagination) {
        var _a, _b;
        const { keywords, startDate, endDate, status, sort } = dto;
        const query = this.priceListRepository.createQueryBuilder('q');
        if (keywords) {
            const newKeywords = keywords.trim();
            const subQuery = this.priceListRepository
                .createQueryBuilder('q2')
                .select('q2.id')
                .where('q2.code LIKE :code', { code: `%${newKeywords}%` })
                .orWhere('q2.name LIKE :name', { name: `%${newKeywords}%` })
                .orWhere('q2.note LIKE :note', { note: `%${newKeywords}%` })
                .getQuery();
            query.andWhere(`q.id in (${subQuery})`, {
                code: `%${newKeywords}%`,
                name: `%${newKeywords}%`,
                note: `%${newKeywords}%`,
            });
        }
        if (status) {
            query.where('q.status = :status', { status });
        }
        if (startDate) {
            const newStartDate = moment(startDate).startOf('day').toDate();
            query.andWhere('q.startDate >= :startDate', { startDate: newStartDate });
        }
        if (endDate) {
            const newEndDate = moment(endDate).endOf('day').toDate();
            query.andWhere('q.endDate <= :endDate', { endDate: newEndDate });
        }
        query.orderBy('q.createdAt', sort || enums_1.SortEnum.DESC);
        const dataResult = await query
            .select(this.selectFieldsPriceListWithQ)
            .offset((_a = pagination.skip) !== null && _a !== void 0 ? _a : 0)
            .limit((_b = pagination.take) !== null && _b !== void 0 ? _b : 10)
            .getMany();
        const total = await query.clone().getCount();
        return { dataResult, total, pagination };
    }
    async updatePriceListByIdOrCode(adminId, dto, id, code) {
        const { name, note, startDate, endDate, status } = dto;
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: adminId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        let priceList;
        if (id) {
            priceList = await this.findOnePriceListById(id);
        }
        else if (code) {
            priceList = await this.findOnePriceListByCode(code);
        }
        if (!priceList) {
            throw new common_1.BadRequestException('PRICE_LIST_NOT_FOUND');
        }
        const currentDate = moment().startOf('day').toDate();
        if (priceList.endDate <= currentDate) {
            throw new common_1.BadRequestException('PRICE_LIST_IS_EXPIRED');
        }
        if (name) {
            priceList.name = name;
        }
        if (note) {
            priceList.note = note;
        }
        if (startDate) {
            const newStartDate = moment(startDate).startOf('day').toDate();
            if (newStartDate.getTime() !== priceList.startDate.getTime()) {
                if (newStartDate <= currentDate) {
                    throw new common_1.BadRequestException('START_DATE_GREATER_THAN_NOW');
                }
                if (!endDate && newStartDate >= priceList.endDate) {
                    throw new common_1.BadRequestException('END_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_START_DATE');
                }
                if (priceList.status === enums_1.ActiveStatusEnum.ACTIVE &&
                    currentDate >= priceList.startDate &&
                    currentDate <= priceList.endDate) {
                    throw new common_1.BadRequestException('PRICE_LIST_IS_ACTIVE_AND_IN_USE');
                }
                await this.validOverlappingPriceList(newStartDate);
                priceList.startDate = newStartDate;
            }
        }
        if (endDate) {
            const newEndDate = moment(endDate).endOf('day').toDate();
            const newStartDate = moment(startDate).startOf('day').toDate();
            if (newEndDate.getTime() !== priceList.endDate.getTime()) {
                if (newEndDate < currentDate) {
                    throw new common_1.BadRequestException('END_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_NOW');
                }
                if ((!startDate && priceList.startDate > newEndDate) ||
                    (startDate && newStartDate > newEndDate)) {
                    throw new common_1.BadRequestException('END_DATE_MUST_BE_GREATER_THAN_START_DATE');
                }
                await this.validOverlappingPriceList(newEndDate);
                priceList.endDate = newEndDate;
            }
        }
        switch (status) {
            case enums_1.ActiveStatusEnum.ACTIVE:
                priceList.status = status;
                const priceDetails = await this.priceDetailRepository.find({
                    where: {
                        priceListCode: priceList.code,
                    },
                    relations: { trip: true },
                });
                if (priceDetails && priceDetails.length > 0) {
                    const priceDetailsExist = await priceDetails.map(async (priceDetail) => {
                        return await this.validOverlappingPriceDetail(priceList.startDate, priceDetail.seatType, priceDetail.trip.code);
                    });
                    await Promise.all(priceDetailsExist);
                }
                break;
            case enums_1.ActiveStatusEnum.INACTIVE:
                priceList.status = status;
                break;
            default:
                break;
        }
        priceList.updatedBy = adminExist.id;
        const updateTrip = await this.priceListRepository.save(priceList);
        delete updateTrip.deletedAt;
        return updateTrip;
    }
    async deletePriceListByIdOrCode(adminId, id, code) {
        var _a;
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: adminId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        let priceList;
        if (id) {
            priceList = await this.findOnePriceListById(id, {
                relations: { priceDetails: true },
            });
        }
        else if (code) {
            priceList = await this.findOnePriceListByCode(id, {
                relations: { priceDetails: true },
            });
        }
        if (!priceList) {
            throw new common_1.BadRequestException('PRICE_LIST_NOT_FOUND');
        }
        const currentDate = moment().startOf('day').toDate();
        if (priceList.endDate <= currentDate) {
            throw new common_1.BadRequestException('PRICE_LIST_IS_EXPIRED');
        }
        if (priceList.status === enums_1.ActiveStatusEnum.ACTIVE &&
            currentDate >= priceList.startDate &&
            currentDate <= priceList.endDate) {
            throw new common_1.BadRequestException('PRICE_LIST_IS_ACTIVE_AND_IN_USE');
        }
        if (((_a = priceList === null || priceList === void 0 ? void 0 : priceList.priceDetails) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            throw new common_1.BadRequestException('PRICE_LIST_HAS_PRICE_DETAIL');
        }
        priceList.updatedBy = adminExist.id;
        priceList.deletedAt = new Date();
        await this.priceListRepository.save(priceList);
        return {
            id: priceList.id,
            code: priceList.code,
            message: 'Xoá thành công',
        };
    }
    async deleteMultiPriceListByIdsOrCodes(adminId, dto, type) {
        try {
            const { ids } = dto;
            const adminExist = await this.dataSource
                .getRepository(entities_1.Staff)
                .findOne({ where: { id: adminId } });
            if (!adminExist) {
                throw new common_1.UnauthorizedException('UNAUTHORIZED');
            }
            if (!adminExist.isActive) {
                throw new common_1.BadRequestException('USER_NOT_ACTIVE');
            }
            const list = await Promise.all(ids.map(async (data) => {
                var _a;
                let priceList;
                if (type === 'id') {
                    priceList = await this.findOnePriceListById(data, {
                        relations: { priceDetails: true },
                    });
                }
                else if (type === 'code') {
                    priceList = await this.findOnePriceListByCode(data, {
                        relations: { priceDetails: true },
                    });
                }
                if (!priceList) {
                    return {
                        id: type === 'id' ? priceList.id : undefined,
                        code: type === 'code' ? priceList.code : undefined,
                        message: 'Không tìm thấy bảng giá',
                    };
                }
                const currentDate = moment().startOf('day').toDate();
                if (priceList.endDate < currentDate) {
                    return {
                        id: priceList.id,
                        code: priceList.code,
                        message: 'Bảng giá này đã hết hạn',
                    };
                }
                if (priceList.status === enums_1.ActiveStatusEnum.ACTIVE &&
                    currentDate >= priceList.startDate &&
                    currentDate <= priceList.endDate) {
                    return {
                        id: priceList.id,
                        code: priceList.code,
                        message: 'Bảng giá này đang được kích hoạt và đang được sử dụng',
                    };
                }
                if (((_a = priceList === null || priceList === void 0 ? void 0 : priceList.priceDetails) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    return {
                        id: priceList.id,
                        code: priceList.code,
                        message: 'Bảng giá này vẫn còn có chi tiết bảng giá',
                    };
                }
                priceList.updatedBy = adminExist.id;
                priceList.deletedAt = new Date();
                await this.priceListRepository.save(priceList);
                return {
                    id: priceList.id,
                    code: priceList.code,
                    message: 'Xoá thành công',
                };
            }));
            return list;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async findOnePriceDetail(options) {
        return await this.priceDetailRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), relations: Object.assign({}, options === null || options === void 0 ? void 0 : options.relations), select: Object.assign({}, options === null || options === void 0 ? void 0 : options.select), order: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.order) }, options === null || options === void 0 ? void 0 : options.other));
    }
    async findOnePriceDetailById(id, options) {
        if (options) {
            options.where = Object.assign({ id: id }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { id: id } };
        }
        return await this.findOnePriceDetail(options);
    }
    async findOnePriceDetailByCode(code, options) {
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOnePriceDetail(options);
    }
    async getPriceDetailById(id, options) {
        const priceDetail = await this.findOnePriceDetailById(id, options);
        if (!priceDetail) {
            throw new common_1.BadRequestException('PRICE_DETAIL_NOT_FOUND');
        }
        return priceDetail;
    }
    async getPriceDetailByCode(code, options) {
        const priceDetail = await this.findOnePriceDetailByCode(code, options);
        if (!priceDetail) {
            throw new common_1.BadRequestException('PRICE_DETAIL_NOT_FOUND');
        }
        return priceDetail;
    }
    async getPriceDetailSeatType() {
        return {
            dataResult: Object.keys(enums_1.VehicleTypeEnum).map((key) => enums_1.VehicleTypeEnum[key]),
        };
    }
    async findPriceDetailForBooking(dto) {
        const { applyDate, seatType, tripDetailCode, tripCode } = dto;
        const newApplyDate = moment(applyDate).startOf('day').toDate();
        const priceDetail = await this.findOnePriceDetail({
            where: {
                seatType,
                trip: {
                    code: tripCode,
                    tripDetails: {
                        code: tripDetailCode,
                    },
                },
                priceList: {
                    startDate: (0, typeorm_2.LessThanOrEqual)(newApplyDate),
                    endDate: (0, typeorm_2.MoreThanOrEqual)(newApplyDate),
                    status: enums_1.ActiveStatusEnum.ACTIVE,
                },
            },
            relations: {
                priceList: true,
                trip: { priceDetails: true },
            },
        });
        if (!priceDetail) {
            return { dataResult: null };
        }
        delete priceDetail.priceList;
        delete priceDetail.trip.priceDetails;
        return { dataResult: priceDetail };
    }
    async findAllPriceDetail(dto, pagination) {
        const { maxPrice, minPrice, keywords, priceListCode, sort, seatType } = dto;
        const query = this.priceDetailRepository.createQueryBuilder('q');
        if (keywords) {
            const newKeywords = keywords.trim();
            const subQuery = this.priceDetailRepository
                .createQueryBuilder('q2')
                .select('q2.id')
                .where('q2.code LIKE :code', { code: `%${newKeywords}%` })
                .orWhere('q2.note LIKE :note', { note: `%${newKeywords}%` })
                .getQuery();
            query.andWhere(`q.id in (${subQuery})`, {
                code: `%${newKeywords}%`,
                note: `%${newKeywords}%`,
            });
        }
        if (maxPrice) {
            query.andWhere('q.price <= :maxPrice', { maxPrice });
        }
        if (minPrice) {
            query.andWhere('q.price >= :minPrice', { minPrice });
        }
        if (priceListCode) {
            query
                .leftJoinAndSelect('q.priceList', 'p')
                .andWhere('q.priceListCode = :priceListCode', { priceListCode });
        }
        switch (seatType) {
            case enums_1.VehicleTypeEnum.LIMOUSINE:
            case enums_1.VehicleTypeEnum.SLEEPER_BUS:
            case enums_1.VehicleTypeEnum.SEAT_BUS:
                query.andWhere('q.seatType = :seatType', { seatType });
                break;
            default:
                break;
        }
        query
            .orderBy('q.price', sort || enums_1.SortEnum.ASC)
            .addOrderBy('q.code', sort || enums_1.SortEnum.DESC)
            .addOrderBy('q.note', sort || enums_1.SortEnum.DESC);
        const dataResult = await query
            .leftJoinAndSelect('q.trip', 't')
            .select(this.selectFieldsPriceDetailWithQ)
            .skip(pagination.skip)
            .take(pagination.take)
            .getMany();
        const total = await query.clone().getCount();
        return { dataResult, pagination, total };
    }
    async createPriceDetail(dto, adminId) {
        const { code, price, note, priceListId, priceListCode, tripCode, seatType, } = dto;
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: adminId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const priceDetailCodeExist = await this.findOnePriceDetailByCode(code);
        if (priceDetailCodeExist) {
            throw new common_1.BadRequestException('PRICE_DETAIL_CODE_EXISTED');
        }
        if (!priceListId && !priceListCode) {
            throw new common_1.BadRequestException('PRICE_LIST_ID_OR_CODE_REQUIRED');
        }
        let priceList;
        if (priceListId) {
            priceList = await this.findOnePriceListById(priceListId);
        }
        else {
            priceList = await this.findOnePriceListByCode(priceListCode);
        }
        if (!priceList) {
            throw new common_1.BadRequestException('PRICE_LIST_NOT_FOUND');
        }
        const currentDate = moment().startOf('day').toDate();
        if (priceList.endDate <= currentDate) {
            throw new common_1.BadRequestException('PRICE_LIST_IS_EXPIRED');
        }
        const priceDetail = new entities_1.PriceDetail();
        priceDetail.priceList = priceList;
        priceDetail.priceListCode = priceList.code;
        const trip = await this.dataSource.getRepository(entities_1.Trip).findOne({
            where: { code: tripCode },
        });
        if (!trip) {
            throw new common_1.BadRequestException('TRIP_NOT_FOUND');
        }
        priceDetail.trip = trip;
        switch (seatType) {
            case enums_1.VehicleTypeEnum.LIMOUSINE:
            case enums_1.VehicleTypeEnum.SEAT_BUS:
            case enums_1.VehicleTypeEnum.SLEEPER_BUS:
                priceDetail.seatType = seatType;
                break;
            default:
                throw new common_1.BadRequestException('SEAT_TYPE_NOT_FOUND');
        }
        await this.validOverlappingPriceDetail(priceList.startDate, seatType, tripCode);
        await this.validOverlappingPriceDetail(priceList.endDate, seatType, tripCode);
        const priceDetailExist = await this.findOnePriceDetailByCode(code);
        if (priceDetailExist) {
            throw new common_1.BadRequestException('PRICE_DETAIL_CODE_EXISTED');
        }
        priceDetail.code = code;
        if (price < 0 || isNaN(price)) {
            throw new common_1.BadRequestException('PRICE_MUST_GREATER_THAN_ZERO');
        }
        priceDetail.price = price;
        priceDetail.note = note;
        priceDetail.createdBy = adminExist.id;
        const savePriceDetail = await this.priceDetailRepository.save(priceDetail);
        delete savePriceDetail.deletedAt;
        return savePriceDetail;
    }
    async updatePriceDetailByIdOrCode(adminId, dto, id, code) {
        const { price, note, tripCode, seatType } = dto;
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: adminId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        let priceDetail;
        if (!id && !code) {
            throw new common_1.BadRequestException('ID_OR_CODE_IS_REQUIRED');
        }
        if (id) {
            priceDetail = await this.getPriceDetailById(id, {
                relations: {
                    priceList: true,
                    trip: true,
                },
            });
        }
        else if (code) {
            priceDetail = await this.getPriceDetailByCode(code, {
                relations: {
                    priceList: true,
                    trip: true,
                },
            });
        }
        if (!priceDetail) {
            throw new common_1.BadRequestException('PRICE_DETAIL_NOT_FOUND');
        }
        const priceList = priceDetail.priceList;
        const currentDate = moment().startOf('day').toDate();
        if (priceList.endDate <= currentDate) {
            throw new common_1.BadRequestException('PRICE_LIST_IS_EXPIRED');
        }
        if (priceList.status === enums_1.ActiveStatusEnum.ACTIVE &&
            currentDate >= priceList.startDate &&
            currentDate <= priceList.endDate) {
            throw new common_1.BadRequestException('PRICE_LIST_IS_ACTIVE_AND_IN_USE');
        }
        switch (seatType) {
            case enums_1.VehicleTypeEnum.LIMOUSINE:
            case enums_1.VehicleTypeEnum.SEAT_BUS:
            case enums_1.VehicleTypeEnum.SLEEPER_BUS:
                priceDetail.seatType = seatType;
                break;
            default:
                throw new common_1.BadRequestException('SEAT_TYPE_NOT_FOUND');
        }
        if (tripCode) {
            const trip = await this.dataSource.getRepository(entities_1.Trip).findOne({
                where: { code: tripCode },
            });
            if (!trip) {
                throw new common_1.BadRequestException('TRIP_NOT_FOUND');
            }
            priceDetail.trip = trip;
        }
        await this.validOverlappingPriceDetail(priceList.startDate, seatType, tripCode);
        await this.validOverlappingPriceDetail(priceList.endDate, seatType, tripCode);
        if (price) {
            if (price < 0 || isNaN(price)) {
                throw new common_1.BadRequestException('PRICE_MUST_GREATER_THAN_ZERO');
            }
            if (price > Number.MAX_VALUE) {
                throw new common_1.BadRequestException('PRICE_IS_TOO_BIG');
            }
            priceDetail.price = price;
        }
        if (note) {
            priceDetail.note = note;
        }
        priceDetail.updatedBy = adminExist.id;
        const updatePriceDetail = await this.priceDetailRepository.save(priceDetail);
        delete updatePriceDetail.deletedAt;
        return updatePriceDetail;
    }
    async deletePriceDetailByIdOrCode(adminId, id, code) {
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: adminId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        let priceDetail;
        if (!id && !code) {
            throw new common_1.BadRequestException('ID_OR_CODE_IS_REQUIRED');
        }
        if (id) {
            priceDetail = await this.getPriceDetailById(id, {
                relations: { priceList: true },
            });
        }
        if (code) {
            priceDetail = await this.getPriceDetailByCode(code, {
                relations: { priceList: true },
            });
        }
        if (!priceDetail) {
            throw new common_1.BadRequestException('PRICE_DETAIL_NOT_FOUND');
        }
        const priceList = priceDetail.priceList;
        const currentDate = moment().startOf('day').toDate();
        if (priceList.endDate <= currentDate) {
            throw new common_1.BadRequestException('PRICE_LIST_IS_EXPIRED');
        }
        priceDetail.updatedBy = adminExist.id;
        priceDetail.deletedAt = new Date();
        await this.priceDetailRepository.save(priceDetail);
        return {
            id: priceDetail.id,
            code: priceDetail.code,
            message: 'Xoá thành công',
        };
    }
    async deleteMultiPriceDetailByIdsOrCodes(adminId, dto, type) {
        try {
            const { list } = dto;
            const adminExist = await this.dataSource
                .getRepository(entities_1.Staff)
                .findOne({ where: { id: adminId } });
            if (!adminExist) {
                throw new common_1.UnauthorizedException('UNAUTHORIZED');
            }
            if (!adminExist.isActive) {
                throw new common_1.BadRequestException('USER_NOT_ACTIVE');
            }
            const newList = await Promise.all(list.map(async (data) => {
                if (!data) {
                    return {
                        id: type === 'id' ? data : undefined,
                        code: type === 'code' ? data : undefined,
                        message: `${type} không được để trống`,
                    };
                }
                let priceDetail;
                if (type === enums_1.DeleteDtoTypeEnum.ID) {
                    priceDetail = await this.getPriceDetailById(data, {
                        relations: { priceList: true },
                    });
                }
                else {
                    priceDetail = await this.getPriceDetailByCode(data, {
                        relations: { priceList: true },
                    });
                }
                if (!priceDetail) {
                    return {
                        id: type === 'id' ? data : undefined,
                        code: type === 'code' ? data : undefined,
                        message: 'Không tìm thấy chi tiết bảng giá',
                    };
                }
                const priceList = priceDetail.priceList;
                const currentDate = moment().startOf('day').toDate();
                if (priceList.endDate <= currentDate) {
                    throw new common_1.BadRequestException('PRICE_LIST_IS_EXPIRED');
                }
                priceDetail.updatedBy = adminExist.id;
                priceDetail.deletedAt = new Date();
                await this.priceDetailRepository.save(priceDetail);
                return {
                    id: type === 'id' ? data : undefined,
                    code: type === 'code' ? data : undefined,
                    message: 'Xoá thành công',
                };
            }));
            return newList;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
};
PriceListService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.PriceList)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.PriceDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], PriceListService);
exports.PriceListService = PriceListService;
//# sourceMappingURL=price-list.service.js.map