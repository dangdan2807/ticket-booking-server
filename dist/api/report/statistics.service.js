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
exports.StatisticsService = void 0;
const enums_1 = require("../../enums");
const entities_1 = require("../../database/entities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const dto_1 = require("./dto");
const moment = require("moment");
let StatisticsService = class StatisticsService {
    constructor(orderRepository, orderDetailRepository, customerRepository, dataSource) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.customerRepository = customerRepository;
        this.dataSource = dataSource;
    }
    async getTotalRevenueLastDays(dto) {
        const { type } = dto;
        let numOrDate = 1;
        if (type === 'week' || !type) {
            numOrDate = 7;
        }
        else if (type === 'month') {
            numOrDate = 30;
        }
        const { sum } = await this.orderRepository
            .createQueryBuilder('q')
            .select('SUM(q.finalTotal)', 'sum')
            .where(`q.createdAt >= DATE_SUB(NOW(), INTERVAL ${numOrDate} DAY)`)
            .andWhere('q.status = :status', { status: enums_1.OrderStatusEnum.PAID })
            .andWhere('q.deletedAt IS NULL')
            .getRawOne();
        return Number(sum);
    }
    async getTotalOrdersLastDays(dto) {
        const { type } = dto;
        let numOrDate = 1;
        if (type === 'week' || !type) {
            numOrDate = 7;
        }
        else if (type === 'month') {
            numOrDate = 30;
        }
        const { count } = await this.orderRepository
            .createQueryBuilder('q')
            .select('COUNT(q.id)', 'count')
            .where(`q.createdAt >= DATE_SUB(NOW(), INTERVAL ${numOrDate} DAY)`)
            .andWhere('q.status = :status', { status: enums_1.OrderStatusEnum.PAID })
            .andWhere('q.deletedAt IS NULL')
            .getRawOne();
        return Number(count);
    }
    async getTotalTicketsSoldLastDays(dto) {
        const { type } = dto;
        let numOrDate = 1;
        if (type === 'week' || !type) {
            numOrDate = 7;
        }
        else if (type === 'month') {
            numOrDate = 30;
        }
        const orderDetails = await this.orderDetailRepository
            .createQueryBuilder('q')
            .leftJoinAndSelect('q.ticketDetail', 'td')
            .leftJoinAndSelect('q.order', 'oo')
            .where(`q.createdAt >= DATE_SUB(NOW(), INTERVAL ${numOrDate} DAY)`)
            .andWhere('td.status = :soldStatus', {
            soldStatus: enums_1.TicketStatusEnum.SOLD,
        })
            .getMany();
        return orderDetails.length;
    }
    async getTotalCustomersLastDays(dto) {
        const { type } = dto;
        let numOrDate = 1;
        if (type === 'week' || !type) {
            numOrDate = 7;
        }
        else if (type === 'month') {
            numOrDate = 30;
        }
        const { count } = await this.orderRepository
            .createQueryBuilder('q')
            .leftJoinAndSelect('q.customer', 'c')
            .select('COUNT(DISTINCT c.id)', 'count')
            .where(`q.createdAt >= DATE_SUB(NOW(), INTERVAL ${numOrDate} DAY)`)
            .andWhere('q.status = :status', { status: enums_1.OrderStatusEnum.PAID })
            .getRawOne();
        return Number(count);
    }
    async getStatisticsLastDays(dto) {
        const [totalRevenue, totalOrders, totalTicketsSold, totalCustomers] = await Promise.all([
            this.getTotalRevenueLastDays(dto),
            this.getTotalOrdersLastDays(dto),
            this.getTotalTicketsSoldLastDays(dto),
            this.getTotalCustomersLastDays(dto),
        ]);
        return {
            totalRevenue,
            totalOrders,
            totalTicketsSold,
            totalCustomers,
        };
    }
    async getTopCustomersLastDays(dto) {
        const { type, limit } = dto;
        let startDate;
        const endDate = moment().endOf('day').toDate();
        if (type === 'week' || !type) {
            startDate = moment().subtract(7, 'days').startOf('day').toDate();
        }
        else if (type === 'month') {
            startDate = moment().subtract(30, 'days').startOf('day').toDate();
        }
        const topCustomersDto = new dto_1.RevenueCustomerStatisticsDto();
        topCustomersDto.startDate = startDate;
        topCustomersDto.endDate = endDate;
        const topCustomers = await this.getRevenueCustomers(topCustomersDto, {
            take: limit || 5,
            skip: 0,
        });
        return topCustomers;
    }
    async getRevenueByDayLastDays(dto) {
        const { type } = dto;
        let numOrDate = 1;
        if (type === 'week' || !type) {
            numOrDate = 7;
        }
        else if (type === 'month') {
            numOrDate = 30;
        }
        const revenueByDay = await this.orderRepository
            .createQueryBuilder('q')
            .select(['DATE(q.createdAt) as day', 'SUM(q.finalTotal) as total'])
            .where(`q.createdAt >= DATE_SUB(NOW(), INTERVAL ${numOrDate} DAY)`)
            .andWhere('q.status = :status', { status: enums_1.OrderStatusEnum.PAID })
            .groupBy('day')
            .getRawMany();
        return revenueByDay;
    }
    async getTicketsSoldByRoute(dto, pagination) {
        const { keyword, startDate, endDate } = dto;
        const newStartDate = startDate
            ? moment().subtract(7, 'days').startOf('day').toDate()
            : moment(startDate).startOf('day').toDate();
        const newEndDate = endDate
            ? moment().endOf('day').toDate()
            : moment(endDate).endOf('day').toDate();
        const newKeywords = keyword.trim();
        const subQuery = this.orderRepository
            .createQueryBuilder('q2')
            .innerJoin('q2.orderDetails', 'od2')
            .innerJoin('od2.ticketDetail', 'td2')
            .innerJoin('td2.ticket', 't2')
            .innerJoin('t2.tripDetail', 'trd2')
            .innerJoin('trd2.trip', 'tr2')
            .where('tr2.code LIKE :code', { code: `%${newKeywords}%` })
            .orWhere('tr2.name LIKE :name', { name: `%${newKeywords}%` })
            .orWhere('tr2.note LIKE :note', { note: `%${newKeywords}%` })
            .select('tr2.id');
        const queryBuilder = await this.orderRepository
            .createQueryBuilder('q')
            .innerJoin('q.orderDetails', 'od')
            .innerJoin('od.ticketDetail', 'td')
            .innerJoin('td.ticket', 't')
            .innerJoin('t.tripDetail', 'trd')
            .innerJoin('trd.trip', 'tr')
            .select([
            'tr.id as id',
            'tr.code as code',
            'tr.name as name',
            'tr.startDate as startDate',
            'tr.endDate as endDate',
            'tr.status as status',
            'COUNT(t.id) as totalTickets',
        ])
            .where('q.createdAt BETWEEN :startDate AND :endDate', {
            startDate: newStartDate,
            endDate: newEndDate,
        })
            .andWhere('tr.id IN (' + subQuery.getQuery() + ')')
            .andWhere('q.status = :status', { status: enums_1.OrderStatusEnum.PAID })
            .andWhere('q.deletedAt IS NULL')
            .andWhere('td.deletedAt IS NULL')
            .andWhere('t.deletedAt IS NULL')
            .andWhere('trd.deletedAt IS NULL')
            .groupBy('tr.id')
            .orderBy('totalTickets', 'DESC')
            .offset(pagination.skip || 0)
            .limit(pagination.take || 10);
        const result = await queryBuilder.getRawMany();
        return result.map((item) => ({
            id: item.id,
            code: item.code,
            name: item.name,
            startDate: item.startDate,
            endDate: item.endDate,
            status: item.status,
            totalTickets: parseInt(item.totalTickets),
        }));
    }
    async getRevenueCustomers(dto, pagination) {
        const { keyword, startDate, endDate } = dto;
        const newStartDate = startDate
            ? moment().subtract(7, 'days').startOf('day').toDate()
            : moment(startDate).startOf('day').toDate();
        const newEndDate = endDate
            ? moment().endOf('day').toDate()
            : moment(endDate).endOf('day').toDate();
        const newKeywords = keyword.trim();
        const subQuery = this.customerRepository
            .createQueryBuilder('q2')
            .where('q2.fullName LIKE :fullName', { fullName: `%${newKeywords}%` })
            .orWhere('q2.email LIKE :email', { email: `%${newKeywords}%` })
            .orWhere('q2.phone LIKE :phone', { phone: `%${newKeywords}%` })
            .orWhere('q2.address LIKE :address', { address: `%${newKeywords}%` })
            .orWhere('q2.fullAddress LIKE :fullAddress', {
            fullAddress: `%${newKeywords}%`,
        })
            .select('q2.id')
            .getQuery();
        const topCustomers = await this.customerRepository
            .createQueryBuilder('q')
            .leftJoinAndSelect('q.orders', 'o')
            .leftJoinAndSelect('q.ward', 'w')
            .leftJoinAndSelect('q.customerGroup', 'cg')
            .select([
            'q.id as customerId',
            'q.fullName as fullName',
            'q.phone as phone',
            'q.email as email',
            'q.gender as gender',
            'q.status as status',
            'w.code as wardCode',
            'cg.code as customerGroupCode',
            'cg.name as customerGroupName',
            'SUM(o.total) as total',
            'SUM(o.finalTotal) as finalTotal',
            'COUNT(o.id) as numberOfOrders',
        ])
            .where(`o.createdAt BETWEEN :startDate AND :endDate`, {
            startDate: newStartDate,
            endDate: newEndDate,
        })
            .andWhere(`q.id in (${subQuery})`, {
            fullName: `%${newKeywords}%`,
            email: `%${newKeywords}%`,
            phone: `%${newKeywords}%`,
            address: `%${newKeywords}%`,
            fullAddress: `%${newKeywords}%`,
        })
            .andWhere('o.status = :status', { status: enums_1.OrderStatusEnum.PAID })
            .andWhere('o.deletedAt IS NULL')
            .groupBy('q.id')
            .orderBy('total', 'DESC')
            .offset(pagination.skip || 0)
            .limit(pagination.take || 10)
            .getRawMany();
        const numberOfOrdersByCustomers = await this.customerRepository
            .createQueryBuilder('q2')
            .leftJoin('q2.orders', 'o2')
            .select(['q2.id as customerId', 'COUNT(o2.id) as numberOfOrders'])
            .where(`o2.createdAt BETWEEN :startDate AND :endDate`, {
            startDate: newStartDate,
            endDate: newEndDate,
        })
            .groupBy('q2.id')
            .getRawMany();
        const result = topCustomers.map((customer) => {
            var _a;
            const numberOfOrders = (_a = numberOfOrdersByCustomers.find((item) => item.customerId === customer.customerId)) === null || _a === void 0 ? void 0 : _a.numberOfOrders;
            return Object.assign(Object.assign({}, customer), { numberOfOrders: Number(numberOfOrders) });
        });
        return result;
    }
};
StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.OrderDetail)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], StatisticsService);
exports.StatisticsService = StatisticsService;
//# sourceMappingURL=statistics.service.js.map