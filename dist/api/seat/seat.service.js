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
exports.SeatService = void 0;
const enums_1 = require("./../../enums");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./../../database/entities");
const typeorm_2 = require("typeorm");
let SeatService = class SeatService {
    constructor(seatRepository, dataSource) {
        this.seatRepository = seatRepository;
        this.dataSource = dataSource;
    }
    async findOneSeat(options) {
        return await this.seatRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), relations: Object.assign({}, options === null || options === void 0 ? void 0 : options.relations), select: Object.assign({ deletedAt: false }, options === null || options === void 0 ? void 0 : options.select), order: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.orderBy) }, options));
    }
    async findOneSeatById(id, options) {
        if (options) {
            options.where = Object.assign({ id }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { id } };
        }
        return await this.findOneSeat(options);
    }
    async findOneSeatByCode(code, options) {
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOneSeat(options);
    }
    async getSeatById(id, options) {
        const seat = await this.findOneSeatById(id, options);
        if (!seat) {
            throw new common_1.NotFoundException('SEAT_NOT_FOUND');
        }
        return seat;
    }
    async getSeatByCode(code, options) {
        const seat = await this.findOneSeatByCode(code, options);
        if (!seat) {
            throw new common_1.NotFoundException('SEAT_NOT_FOUND');
        }
        return seat;
    }
    async createSeat(dto, userId) {
        const { code, name, floor, vehicleId } = dto;
        const vehicle = await this.dataSource
            .getRepository(entities_1.Vehicle)
            .findOne({ where: { id: vehicleId } });
        if (!vehicle) {
            throw new common_1.BadRequestException('VEHICLE_NOT_FOUND');
        }
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: userId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.UnauthorizedException('USER_NOT_ACTIVE');
        }
        const seatExist = await this.findOneSeatByCode(code);
        if (seatExist) {
            throw new common_1.BadRequestException('SEAT_CODE_ALREADY_EXIST');
        }
        const seat = new entities_1.Seat();
        seat.code = code;
        seat.name = name;
        if (floor < 1 || floor > 2 || !floor) {
            seat.floor = 1;
        }
        else {
            seat.floor = floor;
        }
        seat.createdBy = adminExist.id;
        seat.vehicle = vehicle;
        const saveSeat = await this.seatRepository.save(seat);
        delete seat.vehicle;
        delete seat.deletedAt;
        return saveSeat;
    }
    async searchSeat(dto, pagination) {
        const { keywords, floor } = dto;
        const query = this.seatRepository.createQueryBuilder('q');
        if (keywords) {
            query
                .orWhere('q.code LIKE :keywords', { keywords: `%${keywords}%` })
                .orWhere('q.name LIKE :keywords', { keywords: `%${keywords}%` });
            const newKeywords = keywords.trim();
            const subQuery = this.seatRepository
                .createQueryBuilder('q2')
                .select('q2.id')
                .where('q2.code LIKE :code', { code: `%${newKeywords}%` })
                .orWhere('q2.name LIKE :name', { name: `%${newKeywords}%` })
                .getQuery();
            query.andWhere(`q.id IN (${subQuery})`, {
                code: `%${newKeywords}%`,
                name: `%${newKeywords}%`,
            });
        }
        if (floor && floor > 0 && floor < 3) {
            query.andWhere('q.floor = :floor', { floor });
        }
        const total = await query.clone().getCount();
        const dataResult = await query
            .select([
            'q.id',
            'q.name',
            'q.type',
            'q.floor',
            'q.createdBy',
            'q.updatedBy',
            'q.createdAt',
            'q.updatedAt',
        ])
            .orderBy('q.createdAt', enums_1.SortEnum.ASC)
            .offset(pagination.skip)
            .limit(pagination.take)
            .getMany();
        return { dataResult, pagination, total };
    }
    async searchSeatWithVehicleId(dto, vehicleId, pagination) {
        const { keywords, floor } = dto;
        const query = this.seatRepository.createQueryBuilder('q');
        query.where('q.vehicle = :vehicleId', { vehicleId });
        if (keywords) {
            query
                .orWhere('q.code LIKE :keywords', { keywords: `%${keywords}%` })
                .orWhere('q.name LIKE :keywords', { keywords: `%${keywords}%` });
        }
        if (floor && floor > 0 && floor < 3) {
            query.andWhere('q.floor = :floor', { floor });
        }
        const total = await query.clone().getCount();
        const dataResult = await query
            .select([
            'q.id',
            'q.name',
            'q.type',
            'q.floor',
            'q.createdBy',
            'q.updatedBy',
            'q.createdAt',
            'q.updatedAt',
        ])
            .orderBy('q.createdAt', enums_1.SortEnum.ASC)
            .offset(pagination.skip)
            .limit(pagination.take)
            .getMany();
        return { dataResult, pagination, total };
    }
    async findAllSeatByVehicleId(vehicleId, pagination) {
        const query = this.seatRepository.createQueryBuilder('q');
        query.where('q.vehicle = :vehicleId', { vehicleId });
        const total = await query.clone().getCount();
        const dataResult = await query
            .select([
            'q.id',
            'q.name',
            'q.type',
            'q.floor',
            'q.createdBy',
            'q.updatedBy',
            'q.createdAt',
            'q.updatedAt',
        ])
            .orderBy('q.createdAt', enums_1.SortEnum.ASC)
            .offset(pagination.skip)
            .limit(pagination.take)
            .getMany();
        return { dataResult, pagination, total };
    }
    async updateSeatByIdOrCode(dto, userId, id, code, manager) {
        const { name, floor, vehicleId } = dto;
        if (!id && !code) {
            throw new common_1.BadRequestException('ID_OR_CODE_REQUIRED');
        }
        let seat;
        if (id) {
            seat = await this.getSeatById(id);
        }
        else if (code) {
            seat = await this.getSeatByCode(code);
        }
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: userId } });
        const customerExist = await this.dataSource
            .getRepository(entities_1.Customer)
            .findOne({ where: { id: userId } });
        if (!adminExist && !customerExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if ((adminExist && !adminExist.isActive) ||
            (customerExist && customerExist.status === enums_1.UserStatusEnum.INACTIVATE)) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        if (name) {
            seat.name = name;
        }
        if (floor < 1 || floor > 2 || !floor) {
            seat.floor = 1;
        }
        else {
            seat.floor = floor;
        }
        if (vehicleId) {
            const vehicle = await this.dataSource
                .getRepository(entities_1.Vehicle)
                .findOne({ where: { id: vehicleId } });
            if (!vehicle) {
                throw new common_1.BadRequestException('VEHICLE_NOT_FOUND');
            }
            seat.vehicle = vehicle;
        }
        seat.updatedBy = adminExist.id;
        delete seat.vehicle;
        let saveSeat;
        if (manager) {
            try {
                saveSeat = await manager.save(seat);
            }
            catch (error) {
                throw new common_1.BadRequestException('UPDATE_SEAT_FAILED');
            }
        }
        else {
            saveSeat = await this.seatRepository.save(seat);
        }
        return saveSeat;
    }
    async deleteSeatByIdOrCode(userId, id, code) {
        if (!id && !code) {
            throw new common_1.BadRequestException('ID_OR_CODE_REQUIRED');
        }
        let seat;
        if (id) {
            seat = await this.getSeatById(id);
        }
        else if (code) {
            seat = await this.getSeatByCode(code);
        }
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: userId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        seat.updatedBy = adminExist.id;
        seat.deletedAt = new Date();
        return await this.seatRepository.save(seat);
    }
    async deleteMultipleTripById(userId, dto) {
        try {
            const { data: ids } = dto;
            const adminExist = await this.dataSource
                .getRepository(entities_1.Staff)
                .findOne({ where: { id: userId } });
            if (!adminExist) {
                throw new common_1.UnauthorizedException('UNAUTHORIZED');
            }
            if (!adminExist.isActive) {
                throw new common_1.BadRequestException('USER_NOT_ACTIVE');
            }
            const list = await Promise.all(ids.map(async (id) => {
                const seat = await this.findOneSeatById(id);
                if (!seat) {
                    return {
                        id: id,
                        message: 'Không tìm thấy ghế',
                    };
                }
                seat.updatedBy = adminExist.id;
                seat.deletedAt = new Date();
                const saveSeat = await this.seatRepository.save(seat);
                return {
                    id: saveSeat.id,
                    message: 'Xoá ghế thành công',
                };
            }));
            return list;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async deleteMultipleTripByCode(userId, dto) {
        try {
            const { data: codes } = dto;
            const adminExist = await this.dataSource
                .getRepository(entities_1.Staff)
                .findOne({ where: { id: userId } });
            if (!adminExist) {
                throw new common_1.UnauthorizedException('UNAUTHORIZED');
            }
            if (!adminExist.isActive) {
                throw new common_1.BadRequestException('USER_NOT_ACTIVE');
            }
            const list = await Promise.all(codes.map(async (code) => {
                const seat = await this.findOneSeatByCode(code);
                if (!seat) {
                    return {
                        code: code,
                        message: 'Không tìm thấy ghế',
                    };
                }
                seat.updatedBy = adminExist.id;
                seat.deletedAt = new Date();
                const saveSeat = await this.seatRepository.save(seat);
                return {
                    id: saveSeat.id,
                    message: 'Xoá ghế thành công',
                };
            }));
            return list;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
};
SeatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Seat)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], SeatService);
exports.SeatService = SeatService;
//# sourceMappingURL=seat.service.js.map