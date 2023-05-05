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
exports.TicketGroupService = void 0;
const enums_1 = require("./../../enums");
const entities_1 = require("./../../database/entities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let TicketGroupService = class TicketGroupService {
    constructor(tickerGroupRepository, dataSource) {
        this.tickerGroupRepository = tickerGroupRepository;
        this.dataSource = dataSource;
        this.selectFieldsWithQ = [
            'q.id',
            'q.code',
            'q.name',
            'q.description',
            'q.note',
            'q.createdBy',
            'q.updatedBy',
            'q.createdAt',
            'q.updatedAt',
        ];
    }
    async findOneTicketGroup(options) {
        return await this.tickerGroupRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), relations: Object.assign({}, options === null || options === void 0 ? void 0 : options.relations), select: Object.assign({ deletedAt: false }, options === null || options === void 0 ? void 0 : options.select), order: Object.assign({ createdAt: enums_1.SortEnum.ASC }, options === null || options === void 0 ? void 0 : options.order) }, options.other));
    }
    async findOneTicketGroupById(id, options) {
        if (options) {
            options.where = Object.assign({ id }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { id } };
        }
        return await this.findOneTicketGroup(options);
    }
    async findOneTicketGroupByCode(code, options) {
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOneTicketGroup(options);
    }
    async getTicketGroupById(id, adminId, options) {
        const admin = await this.dataSource.getRepository(entities_1.Staff).findOne({
            where: { id: adminId },
        });
        if (!admin) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!admin.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const ticketGroup = await this.findOneTicketGroupById(id, options);
        if (!ticketGroup) {
            throw new common_1.BadRequestException('TICKET_GROUP_NOT_FOUND');
        }
        return ticketGroup;
    }
    async getTicketGroupByCode(code, adminId, options) {
        const admin = await this.dataSource.getRepository(entities_1.Staff).findOne({
            where: { id: adminId },
        });
        if (!admin) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!admin.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const ticketGroup = await this.findOneTicketGroupByCode(code, options);
        if (!ticketGroup) {
            throw new common_1.BadRequestException('TICKET_GROUP_NOT_FOUND');
        }
        return ticketGroup;
    }
    async createTicketGroup(dto, adminId) {
        const { name, description, note, code } = dto;
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: adminId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const ticketGroupExist = await this.findOneTicketGroupByCode(code, {
            other: { withDeleted: true },
        });
        if (ticketGroupExist) {
            throw new common_1.BadRequestException('TICKET_GROUP_CODE_ALREADY_EXIST');
        }
        const ticketGroup = new entities_1.TicketGroup();
        ticketGroup.code = code;
        ticketGroup.name = name;
        ticketGroup.description = description;
        ticketGroup.note = note;
        ticketGroup.createdBy = adminExist.id;
        const saveTicketGroup = await this.tickerGroupRepository.save(ticketGroup);
        delete saveTicketGroup.deletedAt;
        return saveTicketGroup;
    }
    async findAllTicketGroup(dto, pagination) {
        const { keywords, sort } = dto;
        const query = this.tickerGroupRepository.createQueryBuilder('q');
        if (keywords) {
            query
                .orWhere('q.code LIKE :keywords', { keywords: `%${keywords}%` })
                .orWhere('q.name LIKE :keywords', { keywords: `%${keywords}%` })
                .orWhere('q.description LIKE :keywords', { keywords: `%${keywords}%` })
                .orWhere('q.note LIKE :keywords', { keywords: `%${keywords}%` });
        }
        if (sort) {
            query.orderBy('q.name', sort);
        }
        else {
            query.orderBy('q.name', enums_1.SortEnum.DESC);
        }
        const dataResult = await query
            .addOrderBy('q.createdAt', enums_1.SortEnum.ASC)
            .select(this.selectFieldsWithQ)
            .skip(pagination.skip)
            .take(pagination.take)
            .getMany();
        const total = await query.clone().getCount();
        return { dataResult, pagination, total };
    }
    async updateTicketGroupById(id, dto, adminId) {
        const { name, description, note } = dto;
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: adminId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const ticketGroup = await this.getTicketGroupById(id, adminId);
        if (name) {
            ticketGroup.name = name;
        }
        if (description) {
            ticketGroup.description = description;
        }
        if (note) {
            ticketGroup.note = note;
        }
        ticketGroup.updatedBy = adminExist.id;
        const saveTicketGroup = await this.tickerGroupRepository.save(ticketGroup);
        delete saveTicketGroup.deletedAt;
        return saveTicketGroup;
    }
    async updateTicketGroupByCode(code, dto, adminId) {
        const { name, description, note } = dto;
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: adminId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const ticketGroup = await this.getTicketGroupByCode(code, adminId);
        if (name) {
            ticketGroup.name = name;
        }
        if (description) {
            ticketGroup.description = description;
        }
        if (note) {
            ticketGroup.note = note;
        }
        ticketGroup.updatedBy = adminExist.id;
        const saveTicketGroup = await this.tickerGroupRepository.save(ticketGroup);
        delete saveTicketGroup.deletedAt;
        return saveTicketGroup;
    }
    async deleteTicketGroupById(id, adminId) {
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: adminId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const ticketGroup = await this.getTicketGroupById(id, adminId);
        ticketGroup.updatedBy = adminExist.id;
        ticketGroup.deletedAt = new Date();
        const saveTicketGroup = await this.tickerGroupRepository.save(ticketGroup);
        return { id: saveTicketGroup.id, message: 'Xoá thành công' };
    }
    async deleteTicketGroupByCode(code, adminId) {
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: adminId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const ticketGroup = await this.getTicketGroupByCode(code, adminId);
        ticketGroup.updatedBy = adminExist.id;
        ticketGroup.deletedAt = new Date();
        const saveTicketGroup = await this.tickerGroupRepository.save(ticketGroup);
        return { id: saveTicketGroup.id, message: 'Xoá thành công' };
    }
    async deleteMultipleTicketGroupsByIds(adminId, dto) {
        try {
            const adminExist = await this.dataSource
                .getRepository(entities_1.Staff)
                .findOne({ where: { id: adminId } });
            if (!adminExist) {
                throw new common_1.UnauthorizedException('UNAUTHORIZED');
            }
            if (!adminExist.isActive) {
                throw new common_1.BadRequestException('USER_NOT_ACTIVE');
            }
            const { data: ids } = dto;
            const list = await Promise.all(ids.map(async (id) => {
                const ticketGroup = await this.findOneTicketGroupById(id);
                if (!ticketGroup) {
                    return { id: ticketGroup.id, message: 'không tìm thấy nhóm vé' };
                }
                ticketGroup.updatedBy = adminExist.id;
                ticketGroup.deletedAt = new Date();
                const saveTicketGroup = await this.tickerGroupRepository.save(ticketGroup);
                return { id: saveTicketGroup.id, message: 'Xoá thành công' };
            }));
            return list;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async deleteMultipleTicketGroupsByCodes(adminId, dto) {
        try {
            const adminExist = await this.dataSource
                .getRepository(entities_1.Staff)
                .findOne({ where: { id: adminId } });
            if (!adminExist) {
                throw new common_1.UnauthorizedException('UNAUTHORIZED');
            }
            if (!adminExist.isActive) {
                throw new common_1.BadRequestException('USER_NOT_ACTIVE');
            }
            const { data: codes } = dto;
            const list = await Promise.all(codes.map(async (code) => {
                const ticketGroup = await this.findOneTicketGroupByCode(code);
                if (!ticketGroup) {
                    return { id: ticketGroup.id, message: 'không tìm thấy nhóm vé' };
                }
                ticketGroup.updatedBy = adminExist.id;
                ticketGroup.deletedAt = new Date();
                const saveTicketGroup = await this.tickerGroupRepository.save(ticketGroup);
                return { id: saveTicketGroup.id, message: 'Xoá thành công' };
            }));
            return list;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
};
TicketGroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.TicketGroup)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], TicketGroupService);
exports.TicketGroupService = TicketGroupService;
//# sourceMappingURL=ticket-group.service.js.map