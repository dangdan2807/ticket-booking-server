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
exports.PaymentHistoryService = void 0;
const enums_1 = require("./../../enums");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const customer_service_1 = require("../customer/customer.service");
const admin_service_1 = require("../admin/admin.service");
const entities_1 = require("./../../database/entities");
const typeorm_2 = require("@nestjs/typeorm");
const moment = require("moment");
moment.locale('vi');
let PaymentHistoryService = class PaymentHistoryService {
    constructor(orderRepository, paymentHRepository, customerService, adminService, dataSource, configService) {
        this.orderRepository = orderRepository;
        this.paymentHRepository = paymentHRepository;
        this.customerService = customerService;
        this.adminService = adminService;
        this.dataSource = dataSource;
        this.configService = configService;
    }
    async findOneOrder(options) {
        return await this.orderRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), select: Object.assign({ customer: {
                    id: true,
                    code: true,
                    status: true,
                    phone: true,
                    email: true,
                    fullName: true,
                    gender: true,
                    address: true,
                    fullAddress: true,
                    note: true,
                    birthday: true,
                } }, options === null || options === void 0 ? void 0 : options.select), relations: Object.assign({ customer: true }, options === null || options === void 0 ? void 0 : options.relations), order: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.orderBy) }, options === null || options === void 0 ? void 0 : options.other));
    }
    async findOneOrderByCode(code, options) {
        if (!code) {
            throw new common_1.BadRequestException('ORDER_CODE_IS_REQUIRED');
        }
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOneOrder(options);
    }
    async getOrderByCode(code, options) {
        const order = await this.findOneOrderByCode(code, options);
        if (!order) {
            throw new common_1.BadRequestException('ORDER_NOT_FOUND');
        }
        return order;
    }
    async findOnePaymentHistory(options) {
        return await this.paymentHRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), select: Object.assign({}, options === null || options === void 0 ? void 0 : options.select), relations: Object.assign({}, options === null || options === void 0 ? void 0 : options.relations), order: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.order) }, options === null || options === void 0 ? void 0 : options.other));
    }
    async findOnePaymentHistoryByCode(code, options) {
        if (!code) {
            throw new common_1.BadRequestException('PAYMENT_HISTORY_CODE_IS_REQUIRED');
        }
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOnePaymentHistory(options);
    }
    async findOnePaymentHistoryById(id, options) {
        if (!id) {
            throw new common_1.BadRequestException('PAYMENT_HISTORY_ID_IS_REQUIRED');
        }
        if (options) {
            options.where = Object.assign({ id }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { id } };
        }
        return await this.findOnePaymentHistory(options);
    }
    async findPaymentHByOrderCode(orderCode, options) {
        if (!orderCode) {
            throw new common_1.BadRequestException('ORDER_CODE_IS_REQUIRED');
        }
        if (options) {
            options.where = Object.assign({ orderCode }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { orderCode } };
        }
        return await this.findOnePaymentHistory(options);
    }
    async getPaymentHistoryByCode(code, options) {
        const paymentHistory = await this.findOnePaymentHistoryByCode(code, options);
        if (!paymentHistory) {
            throw new common_1.BadRequestException('PAYMENT_HISTORY_NOT_FOUND');
        }
        return paymentHistory;
    }
    async getPaymentHistoryById(id, options) {
        const paymentHistory = await this.findOnePaymentHistoryById(id, options);
        if (!paymentHistory) {
            throw new common_1.BadRequestException('PAYMENT_HISTORY_NOT_FOUND');
        }
        return paymentHistory;
    }
    async getPaymentHistoryByOrderCode(orderCode, options) {
        const paymentHistory = await this.findPaymentHByOrderCode(orderCode, options);
        if (!paymentHistory) {
            throw new common_1.BadRequestException('PAYMENT_HISTORY_NOT_FOUND');
        }
        return paymentHistory;
    }
    async findAllPaymentHistory(dto, userId, pagination) {
        if (!userId) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        const admin = await this.adminService.findOneById(userId);
        const customer = await this.customerService.findOneById(userId);
        if (!admin && !customer) {
            throw new common_1.UnauthorizedException('USER_NOT_FOUND');
        }
        if ((customer && customer.status === enums_1.UserStatusEnum.INACTIVATE) ||
            (admin && !admin.isActive)) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const { keywords, minAmount, maxAmount, customerCode, staffCode, status, paymentMethod, fromDatePaymentTime, toDatePaymentTime, } = dto;
        const query = await this.paymentHRepository.createQueryBuilder('q');
        if (keywords) {
            const newKeywords = keywords.trim();
            const subQuery = await this.paymentHRepository
                .createQueryBuilder('q1')
                .leftJoinAndSelect('q1.order', 'order')
                .select('q1.id')
                .where('LOWER(q1.code) LIKE LOWER(:code)', {
                code: `%${newKeywords}%`,
            })
                .orWhere('LOWER(q1.orderCode) LIKE LOWER(:orderCode)', {
                orderCode: `%${newKeywords}%`,
            });
            query.andWhere(`q.id IN (${subQuery.getQuery()})`);
        }
        if (minAmount) {
            query.andWhere('q.amount >= :minAmount', { minAmount });
        }
        if (maxAmount) {
            query.andWhere('q.amount <= :maxAmount', { maxAmount });
        }
        if (customer) {
            query.andWhere('q.customerCode = :customerCode', {
                customerCode: customer.code,
            });
        }
        if (customerCode && !customer) {
            query.andWhere('q.customerCode = :customerCode', { customerCode });
        }
        if (staffCode) {
            query.andWhere('q.staffCode = :staffCode', { staffCode });
        }
        switch (status) {
            case enums_1.PaymentHistoryStatusEnum.SUCCESS:
            case enums_1.PaymentHistoryStatusEnum.FAILED:
            case enums_1.PaymentHistoryStatusEnum.ZALOPAY_PENDING:
                query.andWhere('q.status = :status', { status });
                break;
            default:
                break;
        }
        switch (paymentMethod) {
            case enums_1.PaymentMethodEnum.CASH:
            case enums_1.PaymentMethodEnum.ZALOPAY:
                query.andWhere('q.paymentMethod = :paymentMethod', { paymentMethod });
                break;
            default:
                break;
        }
        if (fromDatePaymentTime) {
            const newFromDate = moment(fromDatePaymentTime).startOf('day').toDate();
            query.andWhere('q.paymentTime >= :fromDatePaymentTime', {
                fromDatePaymentTime: newFromDate,
            });
        }
        if (toDatePaymentTime) {
            const newToDate = moment(toDatePaymentTime).startOf('day').toDate();
            query.andWhere('q.paymentTime <= :toDatePaymentTime', {
                toDatePaymentTime: newToDate,
            });
        }
        query
            .orderBy('q.paymentTime', enums_1.SortEnum.DESC)
            .addOrderBy('q.createdAt', enums_1.SortEnum.DESC);
        const dataResult = await query
            .offset(pagination.skip || 0)
            .limit(pagination.take || 10)
            .getMany();
        const total = await query.getCount();
        return { dataResult, total, pagination };
    }
    async createPaymentHistory(dto, userId) {
        if (!userId) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        const customer = await this.customerService.findOneById(userId);
        const admin = await this.adminService.findOneById(userId);
        if (!customer && !admin) {
            throw new common_1.UnauthorizedException('USER_NOT_FOUND');
        }
        if ((customer && customer.status === enums_1.UserStatusEnum.INACTIVATE) ||
            (admin && !admin.isActive)) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const { note, amount, orderCode, paymentMethod, transId, createAppTime, status, } = dto;
        const paymentHistory = new entities_1.PaymentHistory();
        if (note) {
            paymentHistory.note = note;
        }
        if (!orderCode) {
            throw new common_1.BadRequestException('ORDER_CODE_IS_REQUIRED');
        }
        const orderExist = await this.getOrderByCode(orderCode);
        if (!orderExist) {
            throw new common_1.BadRequestException('ORDER_NOT_FOUND');
        }
        if (customer && customer.id !== orderExist.customer.id) {
            throw new common_1.BadRequestException('ORDER_NOT_BELONG_TO_USER');
        }
        if (admin) {
            paymentHistory.staffCode = admin.code;
            paymentHistory.staff = admin;
        }
        paymentHistory.customer = orderExist.customer;
        paymentHistory.customerCode = orderExist.customer.code;
        delete orderExist.customer;
        paymentHistory.code = transId;
        paymentHistory.orderCode = orderCode;
        paymentHistory.order = orderExist;
        switch (status) {
            case enums_1.PaymentHistoryStatusEnum.SUCCESS:
            case enums_1.PaymentHistoryStatusEnum.FAILED:
            case enums_1.PaymentHistoryStatusEnum.ZALOPAY_PENDING:
                paymentHistory.status = status;
                break;
            default:
                paymentHistory.status = enums_1.PaymentHistoryStatusEnum.ZALOPAY_PENDING;
                break;
        }
        if (!amount) {
            throw new common_1.BadRequestException('AMOUNT_IS_REQUIRED');
        }
        if (amount < 0) {
            throw new common_1.BadRequestException('AMOUNT_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0');
        }
        paymentHistory.amount = amount;
        if (!paymentMethod) {
            throw new common_1.BadRequestException('PAYMENT_METHOD_IS_REQUIRED');
        }
        switch (paymentMethod) {
            case enums_1.PaymentMethodEnum.CASH:
            case enums_1.PaymentMethodEnum.ZALOPAY:
                paymentHistory.paymentMethod = paymentMethod;
                break;
            default:
                throw new common_1.BadRequestException('PAYMENT_METHOD_IS_ENUM');
                break;
        }
        if (!transId) {
            throw new common_1.BadRequestException('APP_TRANS_ID_REQUIRED');
        }
        paymentHistory.transId = transId;
        if (!createAppTime) {
            throw new common_1.BadRequestException('CREATE_APP_TIME_IS_REQUIRED');
        }
        paymentHistory.createAppTime = new Date(createAppTime);
        const savePaymentHistory = await this.paymentHRepository.save(paymentHistory);
        return savePaymentHistory;
    }
    async updatePaymentHistoryByOrderCode(orderCode, dto) {
        const paymentHistory = await this.findPaymentHByOrderCode(orderCode);
        if (!paymentHistory) {
            throw new common_1.BadRequestException('PAYMENT_HISTORY_NOT_FOUND');
        }
        const order = await this.getOrderByCode(paymentHistory.orderCode);
        if (order.status === enums_1.OrderStatusEnum.CANCEL) {
            throw new common_1.BadRequestException('ORDER_IS_CANCEL');
        }
        if (order.status === enums_1.OrderStatusEnum.PAID) {
            throw new common_1.BadRequestException('ORDER_IS_PAID');
        }
        if (order.status === enums_1.OrderStatusEnum.RETURNED) {
            throw new common_1.BadRequestException('ORDER_IS_RETURNED');
        }
        if (paymentHistory.status === enums_1.PaymentHistoryStatusEnum.SUCCESS) {
            throw new common_1.BadRequestException('PAYMENT_HISTORY_IS_SUCCESS');
        }
        if (paymentHistory.status === enums_1.PaymentHistoryStatusEnum.FAILED) {
            throw new common_1.BadRequestException('PAYMENT_HISTORY_IS_FAILED');
        }
        const { note, amount, paymentMethod, paymentTime, zaloTransId, status, transId, createAppTime, type, } = dto;
        if (note) {
            paymentHistory.note = note;
        }
        if (amount) {
            if (amount < 0) {
                throw new common_1.BadRequestException('AMOUNT_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0');
            }
            paymentHistory.amount = amount;
        }
        switch (paymentMethod) {
            case enums_1.PaymentMethodEnum.CASH:
            case enums_1.PaymentMethodEnum.ZALOPAY:
                paymentHistory.paymentMethod = paymentMethod;
                break;
            default:
                break;
        }
        console.log('status', status);
        switch (status) {
            case enums_1.PaymentHistoryStatusEnum.SUCCESS:
            case enums_1.PaymentHistoryStatusEnum.FAILED:
            case enums_1.PaymentHistoryStatusEnum.ZALOPAY_PENDING:
                paymentHistory.status = status;
                break;
            default:
                break;
        }
        if (type === enums_1.UpdatePayHTypeDtoEnum.GENERATE_NEW_LINK) {
            if (!transId) {
                throw new common_1.BadRequestException('APP_TRANS_ID_REQUIRED');
            }
            paymentHistory.transId = transId;
            if (!createAppTime) {
                throw new common_1.BadRequestException('CREATE_APP_TIME_IS_REQUIRED');
            }
            paymentHistory.createAppTime = new Date(createAppTime);
        }
        else if (type === enums_1.UpdatePayHTypeDtoEnum.UPDATE) {
            if (!paymentTime) {
                throw new common_1.BadRequestException('PAYMENT_TIME_IS_REQUIRED');
            }
            paymentHistory.paymentTime = paymentTime;
            if (!zaloTransId) {
                throw new common_1.BadRequestException('ZALO_TRANS_ID_IS_REQUIRED');
            }
            paymentHistory.zaloTransId = zaloTransId;
        }
        paymentHistory.orderCode = order.code;
        paymentHistory.order = order;
        const paymentHistoryUpdated = await this.paymentHRepository.save(paymentHistory);
        return paymentHistoryUpdated;
    }
};
PaymentHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(entities_1.Order)),
    __param(1, (0, typeorm_2.InjectRepository)(entities_1.PaymentHistory)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        customer_service_1.CustomerService,
        admin_service_1.AdminService,
        typeorm_1.DataSource,
        config_1.ConfigService])
], PaymentHistoryService);
exports.PaymentHistoryService = PaymentHistoryService;
//# sourceMappingURL=payment-history.service.js.map