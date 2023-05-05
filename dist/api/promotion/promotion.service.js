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
exports.PromotionService = void 0;
const enums_1 = require("./../../enums");
const regex_util_1 = require("./../../utils/regex.util");
const entities_1 = require("./../../database/entities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment = require("moment");
moment.locale('vi');
let PromotionService = class PromotionService {
    constructor(promotionRepository, dataSource) {
        this.promotionRepository = promotionRepository;
        this.dataSource = dataSource;
    }
    async getPromotionStatusEnum() {
        return {
            dataResult: Object.keys(enums_1.PromotionStatusEnum).map((key) => enums_1.PromotionStatusEnum[key]),
        };
    }
    async findOnePromotion(options) {
        return await this.promotionRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), relations: Object.assign({}, options === null || options === void 0 ? void 0 : options.relations), select: Object.assign({ deletedAt: false }, options === null || options === void 0 ? void 0 : options.select), order: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.order) }, options === null || options === void 0 ? void 0 : options.other));
    }
    async findOnePromotionByCode(code, options) {
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOnePromotion(options);
    }
    async findOnePromotionById(id, options) {
        if (options) {
            options.where = Object.assign({ id }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { id } };
        }
        return await this.findOnePromotion(options);
    }
    async getPromotionById(id) {
        const promotion = await this.findOnePromotionById(id);
        if (!promotion) {
            throw new common_1.BadRequestException('PROMOTION_NOT_FOUND');
        }
        return promotion;
    }
    async getPromotionByCode(code) {
        const promotion = await this.findOnePromotionByCode(code);
        if (!promotion) {
            throw new common_1.BadRequestException('PROMOTION_NOT_FOUND');
        }
        return promotion;
    }
    async findAllPromotion(dto, pagination) {
        const { keywords, startDate, endDate, status, sort } = dto;
        const query = this.promotionRepository.createQueryBuilder('q');
        if (keywords) {
            const newKeywords = keywords.trim();
            const subQuery = this.promotionRepository
                .createQueryBuilder('q2')
                .select('q2.id')
                .where('q2.code LIKE :code', { code: `%${newKeywords}%` })
                .orWhere('q2.name LIKE :name', { name: `%${newKeywords}%` })
                .orWhere(`q2.description LIKE :description`, {
                description: `%${keywords}%`,
            })
                .orWhere('q2.note LIKE :note', { note: `%${newKeywords}%` })
                .getQuery();
            query.andWhere(`q.id in (${subQuery})`, {
                code: `%${newKeywords}%`,
                name: `%${newKeywords}%`,
                description: `%${newKeywords}%`,
                note: `%${newKeywords}%`,
            });
        }
        if (startDate) {
            const newStartDate = moment(startDate).startOf('day').toDate();
            query.andWhere(`q.startDate >= :startDate`, { startDate: newStartDate });
        }
        if (endDate) {
            const newEndDate = moment(endDate).endOf('day').toDate();
            query.andWhere(`q.endDate <= :endDate`, { endDate: newEndDate });
        }
        switch (status) {
            case enums_1.PromotionStatusEnum.ACTIVE:
            case enums_1.PromotionStatusEnum.INACTIVE:
                query.andWhere(`q.status = :status`, { status });
                break;
            default:
                break;
        }
        if (sort) {
            query.orderBy(`q.createdAt`, sort);
        }
        else {
            query.orderBy(`q.createdAt`, enums_1.SortEnum.DESC);
        }
        const dataResult = await query
            .offset(pagination.skip)
            .limit(pagination.take)
            .getMany();
        const total = await query.clone().getCount();
        return { dataResult, total, pagination };
    }
    async createPromotion(dto, adminId) {
        const { name, description, note, image, startDate, endDate, status, code } = dto;
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: adminId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const oldPromotionExist = await this.findOnePromotionByCode(code, {
            withDeleted: true,
        });
        if (oldPromotionExist) {
            throw new common_1.BadRequestException('PROMOTION_CODE_EXISTED');
        }
        const promotion = new entities_1.Promotion();
        promotion.name = name;
        promotion.code = code;
        promotion.description = description;
        promotion.note = note;
        if (image) {
            if (!image.match(regex_util_1.IMAGE_REGEX)) {
                throw new common_1.BadRequestException('INVALID_IMAGE_URL');
            }
            promotion.image = image;
        }
        if (!startDate) {
            throw new common_1.BadRequestException('START_DATE_IS_REQUIRED');
        }
        const currentDate = moment().startOf('day').toDate();
        const newStartDate = moment(startDate).startOf('day').toDate();
        if (newStartDate <= currentDate) {
            throw new common_1.BadRequestException('START_DATE_GREATER_THAN_NOW');
        }
        promotion.startDate = newStartDate;
        if (!endDate) {
            throw new common_1.BadRequestException('END_DATE_IS_REQUIRED');
        }
        const newEndDate = moment(endDate).startOf('day').toDate();
        if (newStartDate > newEndDate) {
            throw new common_1.BadRequestException('START_DATE_MUST_BE_LESS_THAN_END_DATE');
        }
        promotion.endDate = newEndDate;
        switch (status) {
            case enums_1.PromotionStatusEnum.ACTIVE:
            case enums_1.PromotionStatusEnum.INACTIVE:
                promotion.status = status;
                break;
            default:
                promotion.status = enums_1.PromotionStatusEnum.INACTIVE;
                break;
        }
        promotion.createdBy = adminExist.id;
        const savePromotion = await this.promotionRepository.save(promotion);
        delete promotion.deletedAt;
        return savePromotion;
    }
    async updatePromotionByIdOrCode(dto, adminId, id, code) {
        const { name, description, note, image, startDate, endDate, status } = dto;
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
        let promotion;
        if (id) {
            promotion = await this.findOnePromotionById(id);
        }
        else {
            promotion = await this.findOnePromotionByCode(code);
        }
        if (!promotion) {
            throw new common_1.NotFoundException('PROMOTION_NOT_FOUND');
        }
        const currentDate = moment().startOf('day').toDate();
        if (promotion.endDate < currentDate) {
            throw new common_1.BadRequestException('PROMOTION_HAS_EXPIRED');
        }
        if (name) {
            promotion.name = name;
        }
        if (description) {
            promotion.description = description;
        }
        if (note) {
            promotion.note = note;
        }
        if (image) {
            promotion.image = image;
        }
        switch (status) {
            case enums_1.PromotionStatusEnum.ACTIVE:
            case enums_1.PromotionStatusEnum.INACTIVE:
                promotion.status = status;
                break;
            default:
                promotion.status = enums_1.PromotionStatusEnum.ACTIVE;
                break;
        }
        if (startDate) {
            const newStartDate = moment(startDate).startOf('day').toDate();
            if (newStartDate.getTime() === promotion.startDate.getTime()) {
                if (promotion.status === enums_1.PromotionStatusEnum.ACTIVE &&
                    promotion.startDate <= currentDate &&
                    promotion.endDate >= currentDate) {
                    throw new common_1.BadRequestException('PROMOTION_IS_ACTIVE_AND_IN_USE', {
                        description: 'Không thể cập nhật ngày bắt đầu khi chương trình khuyến mãi được sử dụng',
                    });
                }
                if (startDate <= currentDate) {
                    throw new common_1.BadRequestException('START_DATE_GREATER_THAN_NOW');
                }
                if (!endDate && startDate > promotion.endDate) {
                    throw new common_1.BadRequestException('START_DATE_MUST_BE_LESS_THAN_END_DATE');
                }
                promotion.startDate = startDate;
            }
        }
        if (endDate) {
            const newEndDate = moment(endDate).startOf('day').toDate();
            if (newEndDate.getTime() === promotion.startDate.getTime()) {
                if (endDate < currentDate) {
                    throw new common_1.BadRequestException('END_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_NOW');
                }
                if ((!startDate && promotion.startDate > endDate) ||
                    (startDate && startDate > endDate)) {
                    throw new common_1.BadRequestException('START_DATE_MUST_BE_LESS_THAN_END_DATE');
                }
                promotion.endDate = endDate;
            }
        }
        promotion.updatedBy = adminExist.id;
        const savePromotion = await this.promotionRepository.save(promotion);
        delete promotion.deletedAt;
        return savePromotion;
    }
    async deletePromotionByIdOrCode(adminId, id, code) {
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
        let promotion;
        if (id) {
            promotion = await this.findOnePromotionById(id);
        }
        else {
            promotion = await this.findOnePromotionByCode(code);
        }
        if (!promotion) {
            throw new common_1.NotFoundException('PROMOTION_NOT_FOUND');
        }
        const currentDate = moment().startOf('day').toDate();
        if (promotion.endDate < currentDate) {
            throw new common_1.BadRequestException('PROMOTION_HAS_EXPIRED');
        }
        promotion.deletedAt = new Date();
        promotion.updatedBy = adminExist.id;
        return await this.promotionRepository.save(promotion);
    }
    async deleteMultiplePromotionByIdsOrCodes(dto, adminId, type) {
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: adminId } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const { list: data } = dto;
        const list = await Promise.all(data.map(async (data) => {
            if (!data) {
                return {
                    id: type === enums_1.DeleteDtoTypeEnum.ID ? data : undefined,
                    code: type === enums_1.DeleteDtoTypeEnum.CODE ? data : undefined,
                    message: `${type} không được để trống`,
                };
            }
            let promotion;
            if (type === enums_1.DeleteDtoTypeEnum.ID) {
                promotion = await this.findOnePromotionById(data);
            }
            else {
                promotion = await this.findOnePromotionByCode(data);
            }
            if (!promotion) {
                return {
                    id: type === enums_1.DeleteDtoTypeEnum.ID ? data : undefined,
                    code: type === enums_1.DeleteDtoTypeEnum.CODE ? data : undefined,
                    message: 'Không tìm thấy chương trình khuyến mãi',
                };
            }
            const currentDate = moment().startOf('day').toDate();
            if (promotion.endDate < currentDate) {
                return {
                    id: type === enums_1.DeleteDtoTypeEnum.ID ? data : undefined,
                    code: type === enums_1.DeleteDtoTypeEnum.CODE ? data : undefined,
                    message: 'Chương trình khuyến mãi đã hết hạn không thể xoá',
                };
            }
            promotion.updatedBy = adminExist.id;
            promotion.deletedAt = new Date();
            const savePromotion = await this.promotionRepository.save(promotion);
            return {
                id: savePromotion.id,
                code: savePromotion.code,
                message: 'Xoá chương trình khuyến mãi thành công',
            };
        }));
        return list;
    }
};
PromotionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Promotion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], PromotionService);
exports.PromotionService = PromotionService;
//# sourceMappingURL=promotion.service.js.map