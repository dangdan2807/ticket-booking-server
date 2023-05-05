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
exports.TicketService = void 0;
const enums_1 = require("./../../enums");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./../../database/entities");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const seat_service_1 = require("../seat/seat.service");
const moment = require("moment");
moment.locale('vi');
let TicketService = class TicketService {
    constructor(ticketRepository, ticketDetailRepository, seatService, dataSource) {
        this.ticketRepository = ticketRepository;
        this.ticketDetailRepository = ticketDetailRepository;
        this.seatService = seatService;
        this.dataSource = dataSource;
        this.selectTicketFieldsWithQ = [
            'q.id',
            'q.code',
            'q.note',
            'q.startDate',
            'q.endDate',
            'q.tripDetailCode',
            'q.createdBy',
            'q.updatedBy',
            'q.createdAt',
            'q.updatedAt',
            't.id',
            't.code',
            's.id',
            's.code',
            's.name',
            's.floor',
        ];
        this.selectTicketDetailFieldsWithQ = [
            'q.id',
            'q.code',
            'q.status',
            'q.note',
            'q.createdAt',
            'q.updatedAt',
            't.id',
            't.code',
            's.id',
            's.code',
            's.name',
            's.floor',
        ];
    }
    async getTripDetailById(id) {
        return await this.dataSource.getRepository(entities_1.TripDetail).findOne({
            where: { id },
            relations: {
                vehicle: { seats: true },
            },
            select: {
                deletedAt: false,
                vehicle: {
                    id: true,
                    name: true,
                    description: true,
                    type: true,
                    licensePlate: true,
                    floorNumber: true,
                    totalSeat: true,
                },
            },
        });
    }
    async findOneTicket(options) {
        return await this.ticketRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), relations: Object.assign({ ticketDetails: { seat: true } }, options === null || options === void 0 ? void 0 : options.relations), select: Object.assign({ deletedAt: false }, options === null || options === void 0 ? void 0 : options.select), orderBy: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.orderBy) }, options));
    }
    async findOneTicketByCode(code, options) {
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOneTicket(options);
    }
    async findOneTicketById(id, options) {
        if (options) {
            options.where = Object.assign({ id }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { id } };
        }
        return await this.findOneTicket(options);
    }
    async createTicket(dto, adminId) {
        var _a;
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: adminId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('USER_NOT_FOUND');
        }
        if (!adminExist.isActive) {
            throw new common_1.UnauthorizedException('USER_NOT_ACTIVE');
        }
        const { code, note, startDate, endDate, tripDetailId } = dto;
        const ticketExist = await this.findOneTicketByCode(code);
        if (ticketExist) {
            throw new common_1.BadRequestException('TICKET_CODE_EXISTED');
        }
        const ticket = new entities_1.Ticket();
        ticket.code = code;
        ticket.note = note;
        if (!startDate) {
            throw new common_1.BadRequestException('TICKET_START_DATE_IS_REQUIRED');
        }
        ticket.startDate = startDate;
        if (!endDate) {
            throw new common_1.BadRequestException('TICKET_END_DATE_IS_REQUIRED');
        }
        if (endDate <= startDate) {
            throw new common_1.BadRequestException('TICKET_END_DATE_GREATER_THAN_TICKET_START_DATE');
        }
        ticket.endDate = endDate;
        const tripDetail = await this.getTripDetailById(tripDetailId);
        if (!tripDetail) {
            throw new common_1.NotFoundException('TRIP_DETAIL_NOT_FOUND');
        }
        const seats = (_a = tripDetail === null || tripDetail === void 0 ? void 0 : tripDetail.vehicle) === null || _a === void 0 ? void 0 : _a.seats;
        ticket.tripDetail = tripDetail;
        ticket.tripDetailCode = tripDetail.code;
        ticket.createdBy = adminExist.id;
        const saveTicket = await this.ticketRepository.save(ticket);
        delete saveTicket.deletedAt;
        delete saveTicket.tripDetail;
        if (seats && seats.length > 0) {
            for (const seat of seats) {
                await this.createTicketDetail(saveTicket.id, seat.id, adminId);
            }
        }
        return saveTicket;
    }
    async getTicketById(id, options) {
        const ticket = await this.findOneTicketById(id, options);
        if (!ticket) {
            throw new common_1.BadRequestException('TICKET_NOT_FOUND');
        }
        return ticket;
    }
    async getTicketByCode(code, options) {
        const ticket = await this.findOneTicketByCode(code, options);
        if (!ticket) {
            throw new common_1.BadRequestException('TICKET_NOT_FOUND');
        }
        return ticket;
    }
    async findAllTicket(dto, pagination) {
        const { keywords, sort } = dto;
        let { startDate, endDate } = dto;
        const query = this.ticketRepository.createQueryBuilder('q');
        if (keywords) {
            const newKeywords = keywords.trim();
            const subQuery = this.ticketRepository
                .createQueryBuilder('q2')
                .where('q2.code LIKE :code', { code: `%${newKeywords}%` })
                .orWhere('q2.note LIKE :note', { note: `%${newKeywords}%` })
                .select('q2.id');
            query.andWhere('q.id IN (' + subQuery.getQuery() + ')', {
                code: `%${newKeywords}%`,
                note: `%${newKeywords}%`,
            });
        }
        if (startDate) {
            startDate = new Date(startDate);
            query.andWhere('q.startDate >= :startDate', { startDate });
        }
        if (endDate) {
            endDate = new Date(endDate);
            query.andWhere('q.endDate <= :endDate', { endDate });
        }
        query.orderBy('q.createdAt', sort || enums_1.SortEnum.DESC);
        const total = await query.getCount();
        const dataResult = await query
            .leftJoinAndSelect('q.ticketDetails', 't')
            .leftJoinAndSelect('t.seat', 's')
            .select(this.selectTicketFieldsWithQ)
            .offset(pagination.skip)
            .limit(pagination.take)
            .getMany();
        return { dataResult, pagination, total };
    }
    async updateTicketByIdOrCode(dto, adminId, id, code) {
        if (!id && !code) {
            throw new common_1.BadRequestException('ID_OR_CODE_IS_REQUIRED');
        }
        let ticket;
        if (id) {
            ticket = await this.getTicketById(id);
        }
        else if (code) {
            ticket = await this.getTicketByCode(code);
        }
        const { note, startDate, endDate, tripDetailId } = dto;
        if (note) {
            ticket.note = note;
        }
        if (tripDetailId) {
            const tripDetail = await this.getTripDetailById(tripDetailId);
            if (!tripDetail) {
                throw new common_1.NotFoundException('TRIP_DETAIL_NOT_FOUND');
            }
            ticket.tripDetailCode = tripDetail.code;
            ticket.tripDetail = tripDetail;
        }
        const currentDate = moment().toDate();
        if (startDate) {
            if (startDate <= currentDate) {
                throw new common_1.BadRequestException('TICKET_START_DATE_GREATER_THAN_CURRENT_DATE');
            }
            ticket.startDate = startDate;
        }
        if (endDate) {
            if (endDate <= startDate) {
                throw new common_1.BadRequestException('TICKET_END_DATE_GREATER_THAN_TICKET_START_DATE');
            }
            ticket.endDate = endDate;
        }
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: adminId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('USER_NOT_FOUND');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        ticket.updatedBy = adminExist.id;
        const saveTicket = await this.ticketRepository.save(ticket);
        delete saveTicket.deletedAt;
        return saveTicket;
    }
    async findOneTicketDetail(options) {
        return await this.ticketDetailRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), relations: Object.assign({ ticket: true, seat: true }, options === null || options === void 0 ? void 0 : options.relations), select: Object.assign({ deletedAt: false }, options === null || options === void 0 ? void 0 : options.select), orderBy: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.orderBy) }, options));
    }
    async findOneTicketDetailByCode(code, options) {
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOneTicketDetail(options);
    }
    async findOneTicketDetailById(id, options) {
        if (options) {
            options.where = Object.assign({ id }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { id } };
        }
        return await this.findOneTicketDetail(options);
    }
    async getTicketDetailById(id, options) {
        const ticketDetail = await this.findOneTicketDetailById(id, options);
        if (!ticketDetail) {
            throw new common_1.BadRequestException('TICKET_DETAIL_NOT_FOUND');
        }
        return ticketDetail;
    }
    async getTicketDetailByCode(code, options) {
        const ticketDetail = await this.findOneTicketDetailByCode(code, options);
        if (!ticketDetail) {
            throw new common_1.BadRequestException('TICKET_DETAIL_NOT_FOUND');
        }
        return ticketDetail;
    }
    async getTicketDetailStatus() {
        return {
            dataResult: Object.keys(enums_1.TicketStatusEnum).map((key) => enums_1.TicketStatusEnum[key]),
        };
    }
    async findAllTicketDetail(dto, pagination) {
        const { keywords, status, sort, ticketCode, tripDetailCode } = dto;
        const query = this.ticketDetailRepository.createQueryBuilder('q');
        if (keywords) {
            const newKeywords = keywords.trim();
            const subQuery = this.ticketDetailRepository
                .createQueryBuilder('q2')
                .where('q2.code LIKE :code', { code: `%${newKeywords}%` })
                .orWhere('q2.note LIKE :note', { note: `%${newKeywords}%` })
                .select('q2.id')
                .getQuery();
            query.andWhere(`q.id in (${subQuery})`, {
                code: `%${newKeywords}%`,
                note: `%${newKeywords}%`,
            });
        }
        if (status) {
            query.andWhere('q.status = :status', { status: status });
        }
        query.leftJoinAndSelect('q.ticket', 't');
        if (ticketCode) {
            query.andWhere('t.code = :ticketCode', { ticketCode });
        }
        if (tripDetailCode) {
            query.andWhere('t.tripDetailCode = :tripDetailCode', { tripDetailCode });
        }
        query
            .orderBy('q.createdAt', sort || enums_1.SortEnum.DESC)
            .addOrderBy('q.code', enums_1.SortEnum.DESC);
        const dataResult = await query
            .leftJoinAndSelect('q.seat', 's')
            .select(this.selectTicketDetailFieldsWithQ)
            .offset(pagination.skip)
            .limit(pagination.take)
            .getMany();
        const total = await query.getCount();
        return { dataResult, pagination, total };
    }
    async createTicketDetail(ticketId, seatId, adminId) {
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: adminId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('USER_NOT_FOUND');
        }
        if (!adminExist.isActive) {
            throw new common_1.UnauthorizedException('USER_NOT_ACTIVE');
        }
        const ticketExist = await this.getTicketById(ticketId);
        const seatExist = await this.seatService.getSeatById(seatId);
        const ticketDetail = new entities_1.TicketDetail();
        ticketDetail.ticket = ticketExist;
        ticketDetail.seat = seatExist;
        ticketDetail.note = '';
        ticketDetail.status = enums_1.TicketStatusEnum.NON_SOLD;
        ticketDetail.code = `${ticketExist.code}-${seatExist.name}`;
        const saveTicketDetail = await this.ticketDetailRepository.save(ticketDetail);
        delete saveTicketDetail.deletedAt;
        return saveTicketDetail;
    }
    async updateTicketDetailById(id, dto, userId, manager) {
        const { note, status } = dto;
        const ticketDetail = await this.getTicketDetailById(id);
        if (note) {
            ticketDetail.note = note;
        }
        switch (status) {
            case enums_1.TicketStatusEnum.NON_SOLD:
            case enums_1.TicketStatusEnum.PENDING:
            case enums_1.TicketStatusEnum.SOLD:
                ticketDetail.status = status;
                break;
            default:
                break;
        }
        const admin = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: userId } });
        const customer = await this.dataSource
            .getRepository(entities_1.Customer)
            .findOne({ where: { id: userId } });
        if (!admin && !customer) {
            throw new common_1.UnauthorizedException('USER_NOT_FOUND');
        }
        if ((customer && customer.status === enums_1.UserStatusEnum.INACTIVATE) ||
            (admin && !admin.isActive)) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        let saveTicketDetail;
        if (manager) {
            try {
                saveTicketDetail = await manager.save(ticketDetail);
            }
            catch (error) {
                await manager.query('ROLLBACK');
                throw new common_1.BadRequestException('UPDATE_TICKET_DETAIL_FAIL');
            }
        }
        else {
            saveTicketDetail = await this.ticketDetailRepository.save(ticketDetail);
        }
        return saveTicketDetail;
    }
};
TicketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Ticket)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.TicketDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        seat_service_1.SeatService,
        typeorm_2.DataSource])
], TicketService);
exports.TicketService = TicketService;
//# sourceMappingURL=ticket.service.js.map