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
exports.PromotionHistoryService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./../../database/entities");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const enums_1 = require("./../../enums");
let PromotionHistoryService = class PromotionHistoryService {
    constructor(orderRepository, promotionLineRepository, promotionHistoryRepository, orderRefundRepository, dataSource) {
        this.orderRepository = orderRepository;
        this.promotionLineRepository = promotionLineRepository;
        this.promotionHistoryRepository = promotionHistoryRepository;
        this.orderRefundRepository = orderRefundRepository;
        this.dataSource = dataSource;
    }
    async findOnePromotionHistory(options) {
        return await this.promotionHistoryRepository.findOne({
            where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where),
            select: Object.assign({ deletedAt: false }, options === null || options === void 0 ? void 0 : options.select),
            relations: Object.assign({}, options === null || options === void 0 ? void 0 : options.relations),
            order: Object.assign({}, options === null || options === void 0 ? void 0 : options.order),
        });
    }
    async findPromotionHistoryById(id, options) {
        if (options) {
            options.where = Object.assign({ id }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { id } };
        }
        return await this.findOnePromotionHistory(options);
    }
    async findPromotionHistoryByCode(code, options) {
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOnePromotionHistory(options);
    }
    async getPromotionHistoryById(id, options) {
        const promotionHistory = await this.findPromotionHistoryById(id, options);
        if (!promotionHistory) {
            throw new common_1.BadRequestException('PROMOTION_HISTORY_NOT_FOUND');
        }
        return promotionHistory;
    }
    async getPromotionHistoryByCode(code, options) {
        const promotionHistory = await this.findPromotionHistoryByCode(code, options);
        if (!promotionHistory) {
            throw new common_1.BadRequestException('PROMOTION_HISTORY_NOT_FOUND');
        }
        return promotionHistory;
    }
    async getPromotionHistoryByOrderCode(orderCode, options) {
        return await this.promotionHistoryRepository.findOne(Object.assign({ where: Object.assign({ orderCode }, options === null || options === void 0 ? void 0 : options.where), select: Object.assign({ deletedAt: false }, options === null || options === void 0 ? void 0 : options.select), relations: Object.assign({ promotionLine: true }, options === null || options === void 0 ? void 0 : options.relations), order: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.order) }, options === null || options === void 0 ? void 0 : options.other));
    }
    async getPromotionHistoryStatusEnum() {
        return {
            dataResult: Object.keys(enums_1.PromotionHistoryTypeEnum).map((key) => enums_1.PromotionHistoryTypeEnum[key]),
        };
    }
    async calculatePromotionLine(dto, userId, customer, admin) {
        const customerExist = customer ||
            (await this.dataSource
                .getRepository(entities_1.Customer)
                .findOne({ where: { id: userId } }));
        const adminExist = admin ||
            (await this.dataSource
                .getRepository(entities_1.Staff)
                .findOne({ where: { id: userId } }));
        if (!userId) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if ((customerExist && customerExist.status === enums_1.UserStatusEnum.INACTIVATE) ||
            (adminExist && !adminExist.isActive)) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const { promotionLineCodes, numOfTicket, total } = dto;
        let newPLCodes = [];
        if (Array.isArray(promotionLineCodes)) {
            newPLCodes = [...promotionLineCodes];
        }
        else {
            newPLCodes = [...promotionLineCodes];
        }
        const dataResult = newPLCodes.map(async (promotionLineCode) => {
            const promotionLine = await this.promotionLineRepository.findOne({
                where: { code: promotionLineCode },
                relations: { promotionDetail: true },
            });
            if (!promotionLine) {
                return {
                    promotionLineCode,
                    message: 'Không tìm thấy khuyến mãi',
                };
            }
            const promotionDetail = promotionLine.promotionDetail;
            let quantity = 0;
            if (promotionDetail.quantityBuy > 0) {
                if (numOfTicket < promotionDetail.quantityBuy) {
                    return {
                        promotionLineCode,
                        amount: 0,
                    };
                }
                quantity = Math.floor(numOfTicket / promotionDetail.quantityBuy);
            }
            if (promotionDetail.purchaseAmount > 0) {
                if (total < promotionDetail.purchaseAmount) {
                    return {
                        promotionLineCode,
                        amount: 0,
                    };
                }
                quantity = 1;
            }
            const remainingBudget = promotionLine.maxBudget - promotionLine.useBudget;
            if (remainingBudget <= 0) {
                return {
                    promotionLineCode,
                    amount: 0,
                    message: 'Khuyến mãi đã hết ngân sách',
                };
            }
            let promoAmount = 0;
            let amount = 0;
            if (promotionLine.type === enums_1.PromotionTypeEnum.PRODUCT_DISCOUNT) {
                promoAmount = promotionDetail.reductionAmount * quantity;
            }
            else {
                promoAmount =
                    total * ((promotionDetail.percentDiscount / 100) * quantity);
            }
            if (promoAmount >= promotionDetail.maxReductionAmount) {
                if (promotionDetail.maxReductionAmount >= remainingBudget) {
                    amount = remainingBudget * -1;
                    promotionLine.useBudget += remainingBudget;
                }
                else {
                    amount = promotionDetail.maxReductionAmount * -1;
                    promotionLine.useBudget += promotionDetail.maxReductionAmount;
                }
            }
            else {
                if (promoAmount >= remainingBudget) {
                    amount = remainingBudget * -1;
                    promotionLine.useBudget += remainingBudget;
                }
                else {
                    amount = promoAmount * -1;
                    promotionLine.useBudget += promoAmount;
                }
            }
            return {
                promotionLineCode,
                amount,
            };
        });
        const result = await Promise.all(dataResult);
        return { dataResult: result };
    }
    async createPromotionHistory(dto, userId, orderRefund) {
        const { orderCode, promotionLineCode, type } = dto;
        const queryRunnerPH = this.promotionHistoryRepository.manager.connection.createQueryRunner();
        await queryRunnerPH.connect();
        await queryRunnerPH.startTransaction();
        const queryRunnerPL = this.promotionLineRepository.manager.connection.createQueryRunner();
        await queryRunnerPL.connect();
        await queryRunnerPL.startTransaction();
        try {
            const customerExist = await this.dataSource
                .getRepository(entities_1.Customer)
                .findOne({ where: { id: userId } });
            const admin = await this.dataSource
                .getRepository(entities_1.Staff)
                .findOne({ where: { id: userId } });
            if (!userId) {
                throw new common_1.UnauthorizedException('UNAUTHORIZED');
            }
            if ((customerExist && customerExist.status === enums_1.UserStatusEnum.INACTIVATE) ||
                (admin && !admin.isActive)) {
                throw new common_1.BadRequestException('USER_NOT_ACTIVE');
            }
            const promotionHistory = new entities_1.PromotionHistory();
            const orderExist = await this.orderRepository.findOne({
                where: { code: orderCode },
                relations: { orderDetails: true },
            });
            if (!orderExist) {
                throw new common_1.BadRequestException('ORDER_NOT_FOUND');
            }
            const orderRefundExist = orderRefund ||
                (await this.orderRefundRepository.findOne({
                    where: { code: orderCode },
                }));
            promotionHistory.order = orderExist;
            promotionHistory.orderCode = orderExist.code;
            const promotionLine = await this.promotionLineRepository.findOne({
                where: { code: promotionLineCode },
                relations: { promotionDetail: true },
            });
            if (!promotionLine) {
                throw new common_1.BadRequestException('PROMOTION_LINE_NOT_FOUND');
            }
            promotionHistory.promotionLine = promotionLine;
            promotionHistory.promotionLineCode = promotionLine.code;
            const promotionDetail = promotionLine.promotionDetail;
            const orderDetails = orderExist.orderDetails;
            if (type === enums_1.PromotionHistoryTypeEnum.PRODUCT_DISCOUNT ||
                type === enums_1.PromotionHistoryTypeEnum.PRODUCT_DISCOUNT_PERCENT) {
                promotionHistory.code = `${promotionLine.code}-${orderExist.code}-APPLY`;
                if (promotionDetail.quantityBuy > 0) {
                    const numOfTicket = orderDetails.length;
                    if (numOfTicket < promotionDetail.quantityBuy) {
                        throw new common_1.BadRequestException('NUMBER_OF_TICKET_IS_NOT_ENOUGH');
                    }
                    promotionHistory.quantity = Math.floor(numOfTicket / promotionDetail.quantityBuy);
                }
                if (promotionDetail.purchaseAmount > 0) {
                    if (orderExist.total < promotionDetail.purchaseAmount) {
                        throw new common_1.BadRequestException('TOTAL_AMOUNT_IS_NOT_ENOUGH');
                    }
                    promotionHistory.quantity = 1;
                }
                const remainingBudget = promotionLine.maxBudget - promotionLine.useBudget;
                if (remainingBudget <= 0) {
                    promotionLine.note = enums_1.PromotionLineNoteStatusEnum.OUT_OF_BUDGET;
                    await queryRunnerPL.manager.save(promotionLine);
                    await queryRunnerPL.commitTransaction();
                    throw new common_1.BadRequestException('PROMOTION_HAS_OUT_OF_BUDGET');
                }
                let promoAmount = 0;
                if (type === enums_1.PromotionHistoryTypeEnum.PRODUCT_DISCOUNT) {
                    promoAmount =
                        promotionDetail.reductionAmount * promotionHistory.quantity;
                }
                else {
                    promoAmount =
                        orderExist.total *
                            ((promotionDetail.percentDiscount / 100) *
                                promotionHistory.quantity);
                }
                if (promoAmount >= promotionDetail.maxReductionAmount) {
                    if (promotionDetail.maxReductionAmount >= remainingBudget) {
                        promotionHistory.amount = remainingBudget * -1;
                        promotionLine.useBudget += remainingBudget;
                    }
                    else {
                        promotionHistory.amount = promotionDetail.maxReductionAmount * -1;
                        promotionLine.useBudget += promotionDetail.maxReductionAmount;
                    }
                }
                else {
                    if (promoAmount >= remainingBudget) {
                        promotionHistory.amount = remainingBudget * -1;
                        promotionLine.useBudget += remainingBudget;
                    }
                    else {
                        promotionHistory.amount = promoAmount * -1;
                        promotionLine.useBudget += promoAmount;
                    }
                }
                promotionLine.useQuantity += promotionHistory.quantity;
                promotionHistory.type = type;
            }
            else if (type === enums_1.PromotionHistoryTypeEnum.CANCEL ||
                type === enums_1.PromotionHistoryTypeEnum.REFUND) {
                promotionHistory.code = `${promotionLine.code}-${orderExist.code}-CANCEL`;
                const promotionHistoryExist = await this.findOnePromotionHistory({
                    where: {
                        orderCode,
                        promotionLineCode,
                    },
                });
                if (!promotionHistoryExist) {
                    throw new common_1.BadRequestException('PROMOTION_HISTORY_NOT_FOUND');
                }
                promotionHistory.amount = promotionHistoryExist.amount;
                promotionHistory.quantity = promotionHistoryExist.quantity;
                promotionHistoryExist.note = enums_1.PromotionHistoryTypeEnum.CANCEL;
                promotionHistory.type = type;
                promotionLine.useQuantity -= promotionHistory.quantity;
                promotionLine.useBudget -= promotionHistory.amount;
                await queryRunnerPH.manager.save(promotionHistoryExist);
            }
            else {
                throw new common_1.BadRequestException('PROMOTION_HISTORY_TYPE_IS_REQUIRED');
            }
            promotionHistory.orderRefund = orderRefundExist;
            const savedPromotionHistory = await queryRunnerPH.manager.save(promotionHistory);
            await queryRunnerPH.commitTransaction();
            await queryRunnerPL.manager.save(promotionLine);
            await queryRunnerPL.commitTransaction();
            delete savedPromotionHistory.deletedAt;
            delete savedPromotionHistory.order;
            delete savedPromotionHistory.promotionLine;
            return savedPromotionHistory;
        }
        catch (error) {
            await queryRunnerPL.rollbackTransaction();
            await queryRunnerPH.rollbackTransaction();
            throw new common_1.BadRequestException(error.message);
        }
        finally {
        }
    }
};
PromotionHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.PromotionLine)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.PromotionHistory)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.OrderRefund)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], PromotionHistoryService);
exports.PromotionHistoryService = PromotionHistoryService;
//# sourceMappingURL=promotion-history.service.js.map