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
exports.ApplicableTicketGroupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./../../database/entities");
const typeorm_2 = require("typeorm");
let ApplicableTicketGroupService = class ApplicableTicketGroupService {
    constructor(applicableTGRepository, dataSource) {
        this.applicableTGRepository = applicableTGRepository;
        this.dataSource = dataSource;
    }
    async createApplicableTicketGroup(dto, adminId) {
        const { promotionDetailId, ticketGroupCodes } = dto;
        const admin = await this.dataSource.getRepository(entities_1.Staff).findOne({
            where: {
                id: adminId,
            },
        });
        if (!admin) {
            throw new Error('USER_NOT_FOUND');
        }
        if (!admin.isActive) {
            throw new Error('USER_NOT_ACTIVE');
        }
        const promotionDetail = await this.dataSource
            .getRepository(entities_1.PromotionDetail)
            .findOne({
            where: {
                id: promotionDetailId,
            },
        });
        if (!promotionDetail) {
            throw new Error('PROMOTION_DETAIL_NOT_FOUND');
        }
        const applicableTG = new entities_1.ApplicableTicketGroup();
        applicableTG.promotionDetail = promotionDetail;
        return await this.applicableTGRepository.save(applicableTG);
    }
    async removeApplicableTicketGroup(dto, adminId) {
        const { promotionDetailId, ticketGroupCode } = dto;
        const admin = await this.dataSource.getRepository(entities_1.Staff).findOne({
            where: {
                id: adminId,
            },
        });
        if (!admin) {
            throw new Error('USER_NOT_FOUND');
        }
        if (!admin.isActive) {
            throw new Error('USER_NOT_ACTIVE');
        }
        const ticketGroup = await this.dataSource
            .getRepository(entities_1.TicketGroup)
            .findOne({
            where: {
                code: ticketGroupCode,
            },
        });
        if (!ticketGroup) {
            throw new Error('TICKET_GROUP_NOT_FOUND');
        }
        const promotionDetail = await this.dataSource
            .getRepository(entities_1.PromotionDetail)
            .findOne({
            where: {
                id: promotionDetailId,
            },
        });
        if (!promotionDetail) {
            throw new Error('PROMOTION_DETAIL_NOT_FOUND');
        }
        const applicableTG = new entities_1.ApplicableTicketGroup();
        applicableTG.promotionDetail = promotionDetail;
        applicableTG.ticketGroup = ticketGroup;
        return await this.applicableTGRepository.remove(applicableTG);
    }
};
ApplicableTicketGroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.ApplicableTicketGroup)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], ApplicableTicketGroupService);
exports.ApplicableTicketGroupService = ApplicableTicketGroupService;
//# sourceMappingURL=applicable-ticket-group.service.js.map