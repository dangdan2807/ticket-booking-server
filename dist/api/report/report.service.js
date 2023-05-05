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
exports.ReportService = void 0;
const enums_1 = require("./../../enums");
const entities_1 = require("./../../database/entities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ReportService = class ReportService {
    constructor(orderRepository, ticketRepository, dataSource) {
        this.orderRepository = orderRepository;
        this.ticketRepository = ticketRepository;
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
        return sum;
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
        return count;
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
        const { sum } = await this.ticketRepository
            .createQueryBuilder('q')
            .select('SUM(q.quantitySold)', 'sum')
            .where(`q.createdAt >= DATE_SUB(NOW(), INTERVAL ${numOrDate} DAY)`)
            .andWhere('q.deletedAt IS NULL')
            .getRawOne();
        return sum;
    }
};
ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Ticket)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], ReportService);
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map