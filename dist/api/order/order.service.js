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
exports.OrderService = void 0;
const trip_detail_service_1 = require("./../trip-detail/trip-detail.service");
const entities_1 = require("./../../database/entities");
const typeorm_1 = require("typeorm");
const dto_1 = require("./dto");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const enums_1 = require("./../../enums");
const utils_1 = require("./../../utils");
const customer_service_1 = require("../customer/customer.service");
const admin_service_1 = require("../admin/admin.service");
const seat_service_1 = require("../seat/seat.service");
const ticket_service_1 = require("../ticket/ticket.service");
const price_list_service_1 = require("../price-list/price-list.service");
const dto_2 = require("../ticket/dto");
const promotion_line_service_1 = require("../promotion-line/promotion-line.service");
const promotion_history_service_1 = require("../promotion-history/promotion-history.service");
const dto_3 = require("../promotion-history/dto");
const moment = require("moment");
const config_1 = require("@nestjs/config");
const payment_history_service_1 = require("../payment-history/payment-history.service");
const dto_4 = require("../payment-history/dto");
moment.locale('vi');
let OrderService = class OrderService {
    constructor(orderRepository, orderDetailRepository, orderRefundRepository, orderRDRepository, promotionHistoryRepository, ticketDetailRepository, customerService, adminService, seatService, ticketService, tripDetailService, priceListService, promotionLineService, promotionHistoryService, paymentHService, dataSource, configService) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.orderRefundRepository = orderRefundRepository;
        this.orderRDRepository = orderRDRepository;
        this.promotionHistoryRepository = promotionHistoryRepository;
        this.ticketDetailRepository = ticketDetailRepository;
        this.customerService = customerService;
        this.adminService = adminService;
        this.seatService = seatService;
        this.ticketService = ticketService;
        this.tripDetailService = tripDetailService;
        this.priceListService = priceListService;
        this.promotionLineService = promotionLineService;
        this.promotionHistoryService = promotionHistoryService;
        this.paymentHService = paymentHService;
        this.dataSource = dataSource;
        this.configService = configService;
        this.SEAT_TYPE_DTO_ID = 'id';
        this.SEAT_TYPE_DTO_CODE = 'code';
        this.BILL_HISTORY_TYPE_HAS_DEPARTED = 'hasDeparted';
        this.BILL_HISTORY_TYPE_NOT_DEPARTED = 'notDeparted';
        this.selectFieldsOrderWithQ = [
            'q.id',
            'q.code',
            'q.status',
            'q.note',
            'q.total',
            'q.finalTotal',
            'q.createdAt',
            'c.fullName',
            's.fullName',
        ];
        this.selectFieldsOrderRefundWithQ = [
            'q.id',
            'q.code',
            'q.note',
            'q.status',
            'q.total',
            'q.orderCode',
            'q.createdAt',
            'ord.id',
            'ord.total',
            'ord.note',
            'ord.orderRefundCode',
            'ord.createdAt',
            'c.id',
            'c.code',
            'c.status',
            'c.fullName',
            'c.gender',
            'c.phone',
            'c.email',
            'c.fullAddress',
            's.id',
            's.code',
            's.isActive',
            's.fullName',
            's.gender',
            's.phone',
            's.email',
            's.address',
        ];
    }
    async findOneOrder(options) {
        return await this.orderRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), select: Object.assign({ orderDetails: {
                    id: true,
                    total: true,
                    note: true,
                    orderCode: true,
                    ticketDetail: {
                        id: true,
                        code: true,
                        status: true,
                        note: true,
                        seat: {
                            id: true,
                            code: true,
                            name: true,
                            vehicle: {
                                id: true,
                                code: true,
                                name: true,
                                licensePlate: true,
                                totalSeat: true,
                                status: true,
                            },
                        },
                        ticket: {
                            id: true,
                            code: true,
                            startDate: true,
                            endDate: true,
                            tripDetail: {
                                id: true,
                                code: true,
                                departureTime: true,
                                expectedTime: true,
                                trip: {
                                    id: true,
                                    code: true,
                                    name: true,
                                    status: true,
                                    fromStation: {
                                        id: true,
                                        code: true,
                                        name: true,
                                        fullAddress: true,
                                    },
                                    toStation: {
                                        id: true,
                                        code: true,
                                        name: true,
                                        fullAddress: true,
                                    },
                                },
                            },
                        },
                    },
                }, staff: {
                    id: true,
                    code: true,
                    isActive: true,
                    phone: true,
                    email: true,
                    fullName: true,
                    gender: true,
                    birthDay: true,
                }, customer: {
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
                }, promotionHistories: {
                    id: true,
                    code: true,
                    amount: true,
                    note: true,
                    quantity: true,
                    type: true,
                    promotionLineCode: true,
                    orderCode: true,
                } }, options === null || options === void 0 ? void 0 : options.select), relations: Object.assign({ orderDetails: {
                    ticketDetail: {
                        seat: {
                            vehicle: true,
                        },
                        ticket: {
                            tripDetail: {
                                trip: {
                                    fromStation: true,
                                    toStation: true,
                                },
                            },
                        },
                    },
                }, staff: true, customer: true, promotionHistories: true }, options === null || options === void 0 ? void 0 : options.relations), order: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.orderBy) }, options === null || options === void 0 ? void 0 : options.other));
    }
    async findOneOrderById(id, options) {
        if (options) {
            options.where = Object.assign({ id }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { id } };
        }
        return await this.findOneOrder(options);
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
    async getOrderById(id, options) {
        const order = await this.findOneOrderById(id, options);
        if (!order) {
            throw new common_1.BadRequestException('ORDER_NOT_FOUND');
        }
        return order;
    }
    async getOrderByCode(code, options) {
        const order = await this.findOneOrderByCode(code, options);
        if (!order) {
            throw new common_1.BadRequestException('ORDER_NOT_FOUND');
        }
        return order;
    }
    async getOrderStatus() {
        return {
            dataResult: Object.keys(enums_1.OrderStatusEnum).map((key) => enums_1.OrderStatusEnum[key]),
        };
    }
    async getOrderRefundStatus() {
        return {
            dataResult: Object.keys(enums_1.OrderRefundStatusEnum).map((key) => enums_1.OrderRefundStatusEnum[key]),
        };
    }
    async getOrderUpdateStatus() {
        return {
            dataResult: Object.keys(enums_1.OrderUpdateStatusCustomerEnum).map((key) => enums_1.OrderUpdateStatusCustomerEnum[key]),
        };
    }
    async getPaymentMethod() {
        return {
            dataResult: Object.keys(enums_1.PaymentMethodEnum).map((key) => enums_1.PaymentMethodEnum[key]),
        };
    }
    async findAll(dto, userId, pagination, isDeparted) {
        const { keywords, status, minFinalTotal, maxFinalTotal, startDate, endDate, sort, } = dto;
        const customer = await this.customerService.findOneById(userId);
        const admin = await this.adminService.findOneById(userId);
        if (!userId) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if ((customer && customer.status === enums_1.UserStatusEnum.INACTIVATE) ||
            (admin && !admin.isActive)) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const query = this.orderRepository.createQueryBuilder('q');
        if (keywords) {
            const newKeywords = keywords.trim();
            const subQuery = this.orderRepository
                .createQueryBuilder('q2')
                .select('q2.id')
                .where('q2.code LIKE :code', { code: `%${newKeywords}%` })
                .orWhere('q2.note LIKE :note', { note: `%${newKeywords}%` })
                .getQuery();
            query.andWhere(`q.id IN (${subQuery})`, {
                code: `%${newKeywords}%`,
                note: `%${newKeywords}%`,
            });
        }
        if (status && status.length > 0) {
            if (status.length === 1) {
                switch (status[0]) {
                    case enums_1.OrderStatusEnum.UNPAID:
                    case enums_1.OrderStatusEnum.CANCEL:
                    case enums_1.OrderStatusEnum.PAID:
                    case enums_1.OrderStatusEnum.RETURNED:
                        query.andWhere('q.status = :status', { status: status[0] });
                        break;
                    default:
                        break;
                }
            }
            else if (status.length === 2) {
                switch (status[0]) {
                    case enums_1.OrderStatusEnum.UNPAID:
                    case enums_1.OrderStatusEnum.CANCEL:
                    case enums_1.OrderStatusEnum.PAID:
                    case enums_1.OrderStatusEnum.RETURNED:
                        query.andWhere('q.status IN (:...status)', { status });
                        break;
                    default:
                        break;
                }
            }
        }
        if (minFinalTotal) {
            query.andWhere('q.finalTotal >= :minFinalTotal', { minFinalTotal });
        }
        if (maxFinalTotal) {
            query.andWhere('q.finalTotal <= :maxFinalTotal', { maxFinalTotal });
        }
        if (customer) {
            query.andWhere('c.id = :customerId', { customerId: userId });
        }
        if (startDate) {
            const newStartDate = moment(startDate).startOf('day').toDate();
            query.andWhere('q.createdAt >= :newStartDate', { newStartDate });
        }
        if (endDate) {
            const newEndDate = moment(endDate).endOf('day').toDate();
            query.andWhere('q.createdAt <= :newEndDate', { newEndDate });
        }
        query
            .orderBy('q.createdAt', sort || enums_1.SortEnum.DESC)
            .addOrderBy('q.finalTotal', enums_1.SortEnum.ASC)
            .addOrderBy('q.code', enums_1.SortEnum.ASC);
        if (status[0] === enums_1.OrderStatusEnum.PAID && status.length === 1) {
            const currentDate = moment().toDate();
            if (isDeparted === this.BILL_HISTORY_TYPE_HAS_DEPARTED ||
                isDeparted === this.BILL_HISTORY_TYPE_NOT_DEPARTED) {
                const subQuery = this.orderRepository.createQueryBuilder('q2');
                subQuery
                    .leftJoinAndSelect('q2.customer', 'c2')
                    .leftJoinAndSelect('q2.orderDetails', 'od2')
                    .leftJoinAndSelect('od2.ticketDetail', 'td2')
                    .leftJoinAndSelect('td2.ticket', 't2')
                    .leftJoinAndSelect('t2.tripDetail', 'trd2')
                    .where('c2.id = :customerId', { customerId: userId });
                if (isDeparted === this.BILL_HISTORY_TYPE_HAS_DEPARTED) {
                    subQuery.andWhere('trd2.departureTime <= :currentDate', {
                        currentDate,
                    });
                }
                else if (isDeparted === this.BILL_HISTORY_TYPE_NOT_DEPARTED) {
                    subQuery.andWhere('trd2.departureTime > :currentDate', {
                        currentDate,
                    });
                }
                subQuery.select('q2.id');
                query.andWhere(`q.id IN (${subQuery.getQuery()})`, {
                    currentDate,
                    customerId: userId,
                });
            }
        }
        const dataResult = await query
            .leftJoinAndSelect('q.customer', 'c')
            .leftJoinAndSelect('q.staff', 's')
            .select(this.selectFieldsOrderWithQ)
            .offset(pagination.skip || 0)
            .limit(pagination.take || 10)
            .getMany();
        const total = await query.getCount();
        return { dataResult, total, pagination };
    }
    async findAllOrder(dto, userId, pagination) {
        const { keywords, status, sort, minFinalTotal, maxFinalTotal, startDate, endDate, } = dto;
        const filterDto = new dto_1.FilterAllDto();
        filterDto.keywords = keywords;
        if (status === enums_1.OrderStatusEnum.UNPAID ||
            status === enums_1.OrderStatusEnum.CANCEL) {
            filterDto.status = [status];
        }
        else {
            filterDto.status = [enums_1.OrderStatusEnum.UNPAID, enums_1.OrderStatusEnum.CANCEL];
        }
        filterDto.sort = sort;
        filterDto.minFinalTotal = minFinalTotal;
        filterDto.maxFinalTotal = maxFinalTotal;
        filterDto.startDate = startDate;
        filterDto.endDate = endDate;
        return await this.findAll(filterDto, userId, pagination);
    }
    async findAllBill(dto, userId, pagination) {
        const { keywords, status, sort, minFinalTotal, maxFinalTotal, startDate, endDate, } = dto;
        const filterDto = new dto_1.FilterAllDto();
        filterDto.keywords = keywords;
        if (status === enums_1.OrderStatusEnum.PAID ||
            status === enums_1.OrderStatusEnum.RETURNED) {
            filterDto.status = [status];
        }
        else {
            filterDto.status = [enums_1.OrderStatusEnum.PAID, enums_1.OrderStatusEnum.RETURNED];
        }
        filterDto.sort = sort;
        filterDto.minFinalTotal = minFinalTotal;
        filterDto.maxFinalTotal = maxFinalTotal;
        filterDto.startDate = startDate;
        filterDto.endDate = endDate;
        return await this.findAll(filterDto, userId, pagination);
    }
    async findAllBillHistoryForCustomer(dto, userId, pagination) {
        const { keywords, status, sort, startDate, endDate } = dto;
        const filterDto = new dto_1.FilterAllDto();
        filterDto.keywords = keywords;
        const isDeparted = this.BILL_HISTORY_TYPE_HAS_DEPARTED;
        if (status === enums_1.OrderStatusEnum.PAID ||
            status === enums_1.OrderStatusEnum.RETURNED) {
            filterDto.status = [status];
        }
        else {
            filterDto.status = [enums_1.OrderStatusEnum.PAID, enums_1.OrderStatusEnum.RETURNED];
        }
        filterDto.sort = sort;
        filterDto.startDate = startDate;
        filterDto.endDate = endDate;
        return await this.findAll(filterDto, userId, pagination, isDeparted);
    }
    async findAllBillAvailableForCustomer(dto, userId, pagination) {
        const { keywords, sort, startDate, endDate } = dto;
        const filterDto = new dto_1.FilterAllDto();
        filterDto.keywords = keywords;
        const isDeparted = this.BILL_HISTORY_TYPE_NOT_DEPARTED;
        filterDto.status = [enums_1.OrderStatusEnum.PAID];
        filterDto.sort = sort;
        filterDto.startDate = startDate;
        filterDto.endDate = endDate;
        return await this.findAll(filterDto, userId, pagination, isDeparted);
    }
    async createOrder(dto, creatorId) {
        var _a;
        const { note, seatIds, seatCodes, tripDetailCode, customerId, promotionLineCodes, } = dto;
        const customerCreator = await this.customerService.findOneById(creatorId);
        const admin = await this.adminService.findOneById(creatorId);
        if (!creatorId) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if ((customerCreator &&
            customerCreator.status === enums_1.UserStatusEnum.INACTIVATE) ||
            (admin && !admin.isActive)) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const customer = await this.customerService.findOneById(customerId);
        if (!customerId) {
            throw new common_1.UnauthorizedException('CUSTOMER_NOT_FOUND');
        }
        if (customer && customer.status === enums_1.UserStatusEnum.INACTIVATE) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const tripDetail = await this.tripDetailService.getTripDetailByCode(tripDetailCode, {
            relations: { trip: true },
        });
        const currentDate = new Date(moment().format('YYYY-MM-DD HH:mm'));
        const currentDatePlus1Hours = new Date(moment().add(1, 'hours').format('YYYY-MM-DD HH:mm'));
        if (currentDate >= tripDetail.departureTime) {
            throw new common_1.BadRequestException('TRIP_DETAIL_HAS_PASSED');
        }
        else if (customerCreator &&
            currentDatePlus1Hours >= tripDetail.departureTime) {
            throw new common_1.BadRequestException('TRIP_DETAIL_HAS_PASSED_1_HOURS');
        }
        const trip = tripDetail.trip;
        if (trip.startDate > currentDate || trip.endDate < currentDate) {
            throw new common_1.BadRequestException('TRIP_NOT_ACTIVE');
        }
        const order = new entities_1.Order();
        order.note = note;
        order.customer = customer;
        if (customerCreator) {
            order.createdBy = customerCreator.id;
        }
        else if (admin) {
            order.staff = admin;
            order.createdBy = admin.id;
        }
        order.status = enums_1.OrderStatusEnum.UNPAID;
        let code = (0, utils_1.generateOrderCode)();
        let flag = true;
        while (flag) {
            const orderExist = await this.findOneOrderByCode(code);
            if (!orderExist) {
                flag = false;
            }
            else {
                code = (0, utils_1.generateOrderCode)();
            }
        }
        order.code = code;
        order.total = 0;
        order.finalTotal = 0;
        const queryRunnerOrder = this.orderRepository.manager.connection.createQueryRunner();
        await queryRunnerOrder.connect();
        await queryRunnerOrder.startTransaction();
        const createOrder = await this.orderRepository.save(order);
        let orderDetails;
        let saveOrder;
        try {
            if (!seatIds && !seatCodes) {
                throw new common_1.BadRequestException('SEAT_IDS_OR_SEAT_CODES_REQUIRED');
            }
            let seatType;
            if (seatIds && seatIds.length > 0) {
                seatType = this.SEAT_TYPE_DTO_ID;
            }
            else if (seatCodes && seatCodes.length > 0) {
                seatType = this.SEAT_TYPE_DTO_CODE;
            }
            if (seatType === this.SEAT_TYPE_DTO_ID) {
                orderDetails = seatIds.map(async (seatId) => {
                    const dto = new dto_1.CreateOrderDetailDto();
                    dto.note = '';
                    dto.seatId = seatId;
                    dto.orderId = createOrder.id;
                    dto.tripDetailCode = tripDetail.code;
                    return await this.createOrderDetail(dto, creatorId, createOrder);
                });
            }
            else if (seatType === this.SEAT_TYPE_DTO_CODE) {
                orderDetails = seatCodes.map(async (seatCode) => {
                    const dto = new dto_1.CreateOrderDetailDto();
                    dto.note = '';
                    dto.seatCode = seatCode;
                    dto.orderId = createOrder.id;
                    dto.tripDetailCode = tripDetail.code;
                    return await this.createOrderDetail(dto, creatorId, createOrder);
                });
            }
            createOrder.orderDetails = await Promise.all(orderDetails);
            if (!createOrder.orderDetails || ((_a = createOrder.orderDetails) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                throw new common_1.BadRequestException('CREATE_ORDER_DETAIL_FAILED');
            }
            createOrder.total = createOrder.orderDetails.reduce((total, orderDetail) => total + orderDetail.total, 0);
            createOrder.finalTotal = createOrder.total;
            saveOrder = await queryRunnerOrder.manager.save(createOrder);
            await queryRunnerOrder.commitTransaction();
            saveOrder === null || saveOrder === void 0 ? true : delete saveOrder.staff;
            saveOrder === null || saveOrder === void 0 ? true : delete saveOrder.customer;
        }
        catch (error) {
            await queryRunnerOrder.rollbackTransaction();
            if (orderDetails && orderDetails.length > 0) {
                const orderDetailsArray = await Promise.all(orderDetails);
                await this.orderDetailRepository.remove(orderDetailsArray);
            }
            await this.orderRepository.remove(createOrder);
            if (error.message) {
                throw new common_1.BadRequestException(error.message);
            }
            else {
                throw new common_1.BadRequestException('INTERNAL_SERVER_ERROR');
            }
        }
        finally {
            await queryRunnerOrder.release();
        }
        const queryRunnerOrder2 = this.orderRepository.manager.connection.createQueryRunner();
        await queryRunnerOrder2.connect();
        await queryRunnerOrder2.startTransaction();
        try {
            const dataResult = promotionLineCodes.map(async (promotionLineCode) => {
                const promotionLine = await this.promotionLineService.findOnePromotionLineByCode(promotionLineCode);
                if (!promotionLine) {
                    const promotionHistory = new entities_1.PromotionHistory();
                    promotionHistory.promotionLineCode = promotionLineCode;
                    promotionHistory['message'] = 'Không tìm thấy khuyến mãi';
                    return promotionHistory;
                }
                const dto = new dto_3.CreatePromotionHistoryDto();
                dto.promotionLineCode = promotionLineCode;
                dto.orderCode = saveOrder.code;
                if (promotionLine.type === enums_1.PromotionTypeEnum.PRODUCT_DISCOUNT) {
                    dto.type = enums_1.PromotionHistoryTypeEnum.PRODUCT_DISCOUNT;
                }
                else {
                    dto.type = enums_1.PromotionHistoryTypeEnum.PRODUCT_DISCOUNT_PERCENT;
                }
                return await this.promotionHistoryService.createPromotionHistory(dto, creatorId);
            });
            const promotionHistories = await Promise.all(dataResult);
            const finalTotal = promotionHistories.reduce((total, promotionHistory) => {
                if (promotionHistory.type !== enums_1.PromotionHistoryTypeEnum.REFUND) {
                    return total + promotionHistory.amount;
                }
            }, saveOrder.finalTotal);
            saveOrder.finalTotal = finalTotal;
            await queryRunnerOrder2.manager.save(saveOrder);
            await queryRunnerOrder2.commitTransaction();
            saveOrder.promotionHistories = promotionHistories;
        }
        catch (error) {
            await queryRunnerOrder2.rollbackTransaction();
        }
        finally {
            await queryRunnerOrder2.release();
        }
        return saveOrder;
    }
    async updateOrderByIdOrCode(dto, userId, id, code) {
        const admin = await this.adminService.findOneById(userId);
        const customer = await this.customerService.findOneById(userId);
        if (!userId) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if ((customer && customer.status === enums_1.UserStatusEnum.INACTIVATE) ||
            (admin && !admin.isActive)) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        if (!id && !code) {
            throw new common_1.BadRequestException('ID_OR_CODE_REQUIRED');
        }
        let order;
        if (id) {
            order = await this.findOneOrderById(id);
        }
        else {
            order = await this.findOneOrderByCode(code);
        }
        if (!order) {
            throw new common_1.BadRequestException('ORDER_NOT_FOUND');
        }
        if (customer) {
            if (order.customer.id !== customer.id) {
                throw new common_1.BadRequestException('ORDER_NOT_BELONG_TO_USER');
            }
            order.updatedBy = customer.id;
        }
        else {
            order.updatedBy = admin.id;
        }
        switch (order.status) {
            case enums_1.OrderStatusEnum.CANCEL:
                throw new common_1.BadRequestException('ORDER_ALREADY_CANCEL');
                break;
            case enums_1.OrderStatusEnum.RETURNED:
                throw new common_1.BadRequestException('ORDER_ALREADY_RETURNED');
                break;
            default:
                break;
        }
        const { note, status } = dto;
        order.note = note;
        const promotionHistories = order.promotionHistories;
        const ticketDetails = order.orderDetails.map((orderDetail) => orderDetail.ticketDetail);
        let saveTicketDetails;
        const queryTickerDetail = this.ticketDetailRepository.manager.connection.createQueryRunner();
        await queryTickerDetail.connect();
        await queryTickerDetail.startTransaction();
        try {
            switch (status) {
                case enums_1.OrderUpdateStatusCustomerEnum.CANCEL:
                    if (order.status === enums_1.OrderStatusEnum.PAID) {
                        throw new common_1.BadRequestException('ORDER_ALREADY_PAID');
                    }
                    order.status = enums_1.OrderStatusEnum.CANCEL;
                    if (promotionHistories && promotionHistories.length > 0) {
                        const destroyPromotionHistories = promotionHistories.map(async (promotionHistory) => {
                            const dto = new dto_3.CreatePromotionHistoryDto();
                            dto.promotionLineCode = promotionHistory.promotionLineCode;
                            dto.orderCode = promotionHistory.orderCode;
                            dto.type = enums_1.PromotionHistoryTypeEnum.CANCEL;
                            return await this.promotionHistoryService.createPromotionHistory(dto, userId);
                        });
                        await Promise.all(destroyPromotionHistories);
                    }
                    saveTicketDetails = ticketDetails.map((ticketDetail) => {
                        ticketDetail.status = enums_1.TicketStatusEnum.NON_SOLD;
                        return ticketDetail;
                    });
                    break;
                case enums_1.OrderUpdateStatusCustomerEnum.RETURNED:
                    if (order.status === enums_1.OrderStatusEnum.UNPAID) {
                        throw new common_1.BadRequestException('ORDER_NOT_PAID');
                    }
                    order.status = enums_1.OrderStatusEnum.RETURNED;
                    const currentDate = new Date(moment().format('YYYY-MM-DD HH:mm'));
                    const tripDetail = order.orderDetails[0].ticketDetail.ticket.tripDetail;
                    const departureTime = tripDetail.departureTime;
                    const timeDiff = moment(departureTime).diff(currentDate, 'hours');
                    if (customer && timeDiff < 12 && timeDiff > 0) {
                        throw new common_1.BadRequestException('ORDER_CANNOT_CANCEL_12H_BEFORE');
                    }
                    else if (timeDiff <= 0) {
                        throw new common_1.BadRequestException('ORDER_CANNOT_CANCEL_AFTER_DEPARTURE');
                    }
                    await this.createOrderRefund(order.code, userId);
                    if (promotionHistories && promotionHistories.length > 0) {
                        const destroyPromotionHistories = promotionHistories.map(async (promotionHistory) => {
                            const dto = new dto_3.CreatePromotionHistoryDto();
                            dto.promotionLineCode = promotionHistory.promotionLineCode;
                            dto.orderCode = promotionHistory.orderCode;
                            dto.type = enums_1.PromotionHistoryTypeEnum.REFUND;
                            return await this.promotionHistoryService.createPromotionHistory(dto, userId);
                        });
                        await Promise.all(destroyPromotionHistories);
                    }
                    saveTicketDetails = ticketDetails.map((ticketDetail) => {
                        ticketDetail.status = enums_1.TicketStatusEnum.NON_SOLD;
                        return ticketDetail;
                    });
                    break;
                default:
                    break;
            }
            await queryTickerDetail.manager.save(saveTicketDetails);
            await queryTickerDetail.commitTransaction();
            const saveOrder = await this.orderRepository.save(order);
            return saveOrder;
        }
        catch (error) {
            await queryTickerDetail.rollbackTransaction();
            throw new common_1.BadRequestException(error.message);
        }
    }
    async paymentForAdmin(dto, userId) {
        if (!userId) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        const admin = await this.adminService.findOneById(userId);
        if (!admin) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (admin && !admin.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const { orderCode } = dto;
        if (!orderCode) {
            throw new common_1.BadRequestException('ORDER_CODE_REQUIRED');
        }
        const orderExist = await this.findOneOrderByCode(orderCode);
        if (!orderExist) {
            throw new common_1.BadRequestException('ORDER_NOT_FOUND');
        }
        switch (orderExist.status) {
            case enums_1.OrderStatusEnum.PAID:
                throw new common_1.BadRequestException('ORDER_ALREADY_PAID');
            case enums_1.OrderStatusEnum.CANCEL:
                throw new common_1.BadRequestException('ORDER_ALREADY_CANCEL');
            case enums_1.OrderStatusEnum.RETURNED:
                throw new common_1.BadRequestException('ORDER_ALREADY_RETURNED');
            default:
                break;
        }
        orderExist.status = enums_1.OrderStatusEnum.PAID;
        orderExist.paymentMethod = enums_1.PaymentMethodEnum.CASH;
        const phDto = new dto_4.CreatePaymentHistoryDto();
        phDto.amount = orderExist.finalTotal;
        phDto.createAppTime = Date.now();
        phDto.orderCode = orderCode;
        phDto.paymentMethod = enums_1.PaymentMethodEnum.CASH;
        phDto.status = enums_1.PaymentHistoryStatusEnum.SUCCESS;
        phDto.transId = `CASH_${orderCode}`;
        await this.paymentHService.createPaymentHistory(phDto, userId);
        orderExist.updatedBy = userId;
        await this.orderRepository.save(orderExist);
        const orderDetails = orderExist.orderDetails;
        const ticketDetails = orderDetails.map(async (orderDetail) => {
            let ticketDetail = orderDetail.ticketDetail;
            ticketDetail.status = enums_1.TicketStatusEnum.SOLD;
            ticketDetail = await this.dataSource
                .getRepository(entities_1.TicketDetail)
                .save(ticketDetail);
            delete ticketDetail.deletedAt;
            return ticketDetail;
        });
        await Promise.all(ticketDetails);
        const newOrder = await this.findOneOrderByCode(orderCode);
        return {
            order: newOrder,
        };
    }
    async createOrderDetail(dto, userId, order) {
        const queryRunnerOrderDetail = this.orderDetailRepository.manager.connection.createQueryRunner();
        await queryRunnerOrderDetail.connect();
        await queryRunnerOrderDetail.startTransaction();
        let orderExist;
        try {
            const customer = await this.customerService.findOneById(userId);
            const admin = await this.adminService.findOneById(userId);
            if (!customer && !admin) {
                throw new common_1.UnauthorizedException('USER_NOT_FOUND');
            }
            if ((customer && customer.status === enums_1.UserStatusEnum.INACTIVATE) ||
                (admin && !admin.isActive)) {
                throw new common_1.BadRequestException('USER_NOT_ACTIVE');
            }
            const { note, orderId, seatId, seatCode, tripDetailCode } = dto;
            orderExist = order || (await this.findOneOrderById(orderId));
            if (!orderExist) {
                throw new common_1.BadRequestException('ORDER_NOT_FOUND');
            }
            switch (orderExist.status) {
                case enums_1.OrderStatusEnum.CANCEL:
                    throw new common_1.BadRequestException('ORDER_IS_CANCELLED');
                    break;
                case enums_1.OrderStatusEnum.PAID:
                    throw new common_1.BadRequestException('ORDER_IS_PAID');
                    break;
                default:
                    break;
            }
            const orderDetail = new entities_1.OrderDetail();
            orderDetail.note = note;
            orderDetail.order = orderExist;
            orderDetail.orderCode = orderExist.code;
            if (customer) {
                orderDetail.createdBy = customer.id;
            }
            else if (admin) {
                orderDetail.createdBy = admin.id;
            }
            if (!seatId && !seatCode) {
                throw new common_1.BadRequestException('SEAT_ID_OR_SEAT_CODE_REQUIRED');
            }
            let seat;
            if (seatId) {
                seat = await this.seatService.findOneSeatById(seatId);
            }
            else if (seatCode) {
                seat = await this.seatService.findOneSeatByCode(seatCode);
            }
            if (!seat) {
                throw new common_1.NotFoundException('SEAT_NOT_FOUND');
            }
            const ticketDetail = await this.ticketService.findOneTicketDetail({
                where: {
                    seat: { id: seat.id },
                    ticket: {
                        tripDetail: { code: tripDetailCode },
                    },
                },
                relations: {
                    seat: { vehicle: true },
                    ticket: { tripDetail: { trip: true } },
                },
            });
            if (!ticketDetail) {
                throw new common_1.NotFoundException('TICKET_NOT_FOUND');
            }
            if (ticketDetail.status === enums_1.TicketStatusEnum.SOLD ||
                ticketDetail.status === enums_1.TicketStatusEnum.PENDING) {
                throw new common_1.BadRequestException('SEAT_IS_SOLD');
            }
            const vehicle = ticketDetail.seat.vehicle;
            const trip = ticketDetail.ticket.tripDetail.trip;
            delete ticketDetail.seat;
            delete ticketDetail.ticket;
            orderDetail.ticketDetail = ticketDetail;
            const ticketDetailId = ticketDetail.id;
            const currentDate = moment().startOf('day').toDate();
            const { dataResult } = await this.priceListService.findPriceDetailForBooking({
                seatType: vehicle.type,
                tripCode: trip.code,
                applyDate: currentDate,
                tripDetailCode: undefined,
            });
            if (!dataResult) {
                throw new common_1.NotFoundException('PRICE_DETAIL_NOT_FOUND');
            }
            const priceDetail = dataResult;
            delete priceDetail.trip;
            delete priceDetail.priceList;
            if (!priceDetail) {
                throw new common_1.NotFoundException('PRICE_DETAIL_NOT_FOUND');
            }
            orderDetail.priceDetail = priceDetail;
            orderDetail.total = priceDetail.price;
            const createOrderDetail = await queryRunnerOrderDetail.manager.save(orderDetail);
            if (!createOrderDetail) {
                throw new common_1.BadRequestException('CREATE_ORDER_DETAIL_FAILED');
            }
            const ticketDetailDto = new dto_2.UpdateTicketDetailDto();
            ticketDetailDto.status = enums_1.TicketStatusEnum.PENDING;
            const saveTicketDetail = await this.ticketService.updateTicketDetailById(ticketDetailId, ticketDetailDto, userId, queryRunnerOrderDetail.manager);
            if (!saveTicketDetail) {
                throw new common_1.BadRequestException('UPDATE_TICKET_DETAIL_FAILED');
            }
            await queryRunnerOrderDetail.commitTransaction();
            delete createOrderDetail.deletedAt;
            delete createOrderDetail.order;
            delete createOrderDetail.priceDetail;
            delete createOrderDetail.ticketDetail;
            return createOrderDetail;
        }
        catch (error) {
            await queryRunnerOrderDetail.rollbackTransaction();
            if (orderExist) {
                await this.orderRepository.remove(orderExist);
            }
            if (error.message) {
                throw new common_1.BadRequestException(error.message);
            }
            else {
                throw new common_1.BadRequestException('INTERNAL_SERVER_ERROR');
            }
        }
        finally {
            await queryRunnerOrderDetail.release();
        }
    }
    async findOneOrderRefund(options) {
        return await this.orderRefundRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), relations: Object.assign({ order: true }, options === null || options === void 0 ? void 0 : options.relations), select: Object.assign({}, options === null || options === void 0 ? void 0 : options.select), order: Object.assign({}, options === null || options === void 0 ? void 0 : options.order) }, options === null || options === void 0 ? void 0 : options.other));
    }
    async findOneOrderRefundById(id, options) {
        if (options) {
            options.where = Object.assign({ id }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { id } };
        }
        return await this.findOneOrderRefund(options);
    }
    async findOneOrderRefundByCode(code, options) {
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOneOrderRefund(options);
    }
    async getOrderRefundByCode(code, options) {
        const orderRefund = await this.findOneOrderRefundByCode(code, options);
        if (!orderRefund) {
            throw new common_1.NotFoundException('ORDER_REFUND_NOT_FOUND');
        }
        return orderRefund;
    }
    async findAllOrderRefund(dto, userId, pagination) {
        const { keywords, status, startDate, endDate, minTotal, maxTotal, sort, customerCode, staffCode, } = dto;
        const admin = await this.adminService.findOneById(userId);
        const customer = await this.customerService.findOneById(userId);
        if (!userId) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if ((customer && customer.status === enums_1.UserStatusEnum.INACTIVATE) ||
            (admin && !admin.isActive)) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const query = this.orderRefundRepository.createQueryBuilder('q');
        if (keywords) {
            const subQuery = this.orderRefundRepository.createQueryBuilder('q1');
            subQuery
                .where('q1.code LIKE :code', { code: `%${keywords}%` })
                .orWhere('q1.note LIKE :note', { note: `%${keywords}%` })
                .orWhere('q1.orderCode LIKE :orderCode', {
                orderCode: `%${keywords}%`,
            })
                .select('q1.id');
            query.andWhere(`q.id IN (${subQuery.getQuery()})`, {
                code: `%${keywords}%`,
                note: `%${keywords}%`,
                orderCode: `%${keywords}%`,
            });
        }
        if (status) {
            query.andWhere('q.status = :status', { status });
        }
        if (startDate) {
            query.andWhere('q.createdAt >= :startDate', { startDate });
        }
        if (endDate) {
            query.andWhere('q.createdAt <= :endDate', { endDate });
        }
        if (minTotal) {
            query.andWhere('q.total >= :minTotal', { minTotal });
        }
        if (maxTotal) {
            query.andWhere('q.total <= :maxTotal', { maxTotal });
        }
        if (customer) {
            query.andWhere('q.customerCode = :customerCode', {
                customerCode: customer.code,
            });
        }
        if (!customer && customerCode) {
            query.andWhere('q.customerCode = :customerCode', { customerCode });
        }
        if (staffCode) {
            query.andWhere('q.staffCode = :staffCode', { staffCode });
        }
        query
            .orderBy('q.createdAt', sort || enums_1.SortEnum.DESC)
            .addOrderBy('q.total', enums_1.SortEnum.ASC)
            .addOrderBy('q.code', enums_1.SortEnum.ASC);
        const dataResult = await query
            .leftJoinAndSelect('q.orderRefundDetails', 'ord')
            .leftJoinAndSelect('q.customer', 'c')
            .leftJoinAndSelect('q.staff', 's')
            .select(this.selectFieldsOrderRefundWithQ)
            .offset(pagination.skip || 0)
            .limit(pagination.take || 10)
            .getMany();
        const total = await query.getCount();
        return { dataResult, total, pagination };
    }
    async createOrderRefund(orderCode, userId) {
        const adminExist = await this.adminService.findOneById(userId);
        const customerExist = await this.customerService.findOneById(userId);
        if (!userId) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if ((customerExist && customerExist.status === enums_1.UserStatusEnum.INACTIVATE) ||
            (adminExist && !adminExist.isActive)) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const orderExist = await this.findOneOrderByCode(orderCode);
        if (!orderExist) {
            throw new common_1.BadRequestException('ORDER_NOT_FOUND');
        }
        switch (orderExist.status) {
            case enums_1.OrderStatusEnum.CANCEL:
                throw new common_1.BadRequestException('ORDER_IS_CANCELLED');
                break;
            case enums_1.OrderStatusEnum.UNPAID:
                throw new common_1.BadRequestException('ORDER_IS_UNPAID');
                break;
            case enums_1.OrderStatusEnum.RETURNED:
                throw new common_1.BadRequestException('ORDER_IS_RETURNED');
                break;
            default:
                break;
        }
        const orderRefundExist = await this.findOneOrderRefundByCode(orderCode);
        if (orderRefundExist) {
            throw new common_1.BadRequestException('ORDER_IS_RETURNED', {
                description: `Đơn hàng đã được trả lại có mã là ${orderRefundExist.code}`,
            });
        }
        const orderRefund = new entities_1.OrderRefund();
        orderRefund.order = orderExist;
        orderRefund.orderCode = orderExist.code;
        orderRefund.code = orderExist.code;
        orderRefund.total = orderExist.finalTotal;
        const customer = orderExist.customer;
        orderRefund.customerCode = customer.code;
        orderRefund.customer = customer;
        if (customerExist) {
            orderRefund.createdBy = customerExist.id;
        }
        else {
            orderRefund.staffCode = adminExist.code;
            orderRefund.staff = adminExist;
            orderRefund.createdBy = adminExist.id;
        }
        orderRefund.status = enums_1.OrderRefundStatusEnum.PENDING;
        const promotionHistories = orderExist.promotionHistories;
        const createOrderRefund = await this.orderRefundRepository.save(orderRefund);
        if (!createOrderRefund) {
            throw new common_1.BadRequestException('CREATE_ORDER_REFUND_FAILED');
        }
        const orderDetails = orderExist.orderDetails;
        const queryOrderRD = this.orderRDRepository.manager.connection.createQueryRunner();
        await queryOrderRD.connect();
        await queryOrderRD.startTransaction();
        const queryPromotionH = this.promotionHistoryRepository.manager.connection.createQueryRunner();
        await queryPromotionH.connect();
        await queryPromotionH.startTransaction();
        try {
            const orderRefundDetail = orderDetails.map(async (orderDetail) => {
                delete createOrderRefund.order;
                delete orderDetail.ticketDetail.seat.vehicle;
                delete orderDetail.ticketDetail.ticket;
                const orderRefundDetail = new entities_1.OrderRefundDetail();
                orderRefundDetail.total = orderDetail.total;
                orderRefundDetail.orderRefundCode = createOrderRefund.code;
                orderRefundDetail.orderRefund = createOrderRefund;
                orderRefundDetail.ticketDetail = orderDetail.ticketDetail;
                orderRefundDetail.orderDetail = orderDetail;
                const createOrderRD = await queryOrderRD.manager.save(orderRefundDetail);
                if (!createOrderRD) {
                    throw new common_1.BadRequestException('CREATE_ORDER_REFUND_DETAIL_FAILED');
                }
                delete createOrderRD.orderRefund;
                return createOrderRD;
            });
            const createOrderRDs = await Promise.all(orderRefundDetail);
            orderRefund.orderRefundDetails = createOrderRDs;
            const savePromotionHistories = promotionHistories.map(async (promotionHistory) => {
                promotionHistory.orderRefund = createOrderRefund;
                const savePH = await queryPromotionH.manager.save(promotionHistory);
                delete savePH.orderRefund;
                return savePH;
            });
            const createPHs = await Promise.all(savePromotionHistories);
            orderRefund.promotionHistories = createPHs;
            await queryPromotionH.commitTransaction();
            await queryOrderRD.commitTransaction();
        }
        catch (error) {
            await queryPromotionH.rollbackTransaction();
            await queryOrderRD.rollbackTransaction();
            if (createOrderRefund) {
                await this.orderRefundRepository.remove(createOrderRefund);
            }
            if (error === null || error === void 0 ? void 0 : error.message) {
                throw new common_1.BadRequestException(error === null || error === void 0 ? void 0 : error.message);
            }
            else {
                throw new common_1.BadRequestException('INTERNAL_SERVER_ERROR');
            }
        }
        finally {
            await queryOrderRD.release();
        }
        return createOrderRefund;
    }
    async updateOrderRefundByIdOrCode(dto, userId, code, id) {
        const { note, status } = dto;
        if (!userId) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        const admin = await this.adminService.findOneById(userId);
        if (!admin.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        let orderRefund;
        if (code) {
            orderRefund = await this.findOneOrderRefundByCode(code);
        }
        else if (id) {
            orderRefund = await this.findOneOrderRefundById(id);
        }
        if (!orderRefund) {
            throw new common_1.BadRequestException('ORDER_REFUND_NOT_FOUND');
        }
        if (note) {
            orderRefund.note = note;
        }
        if (status) {
            orderRefund.status = status;
        }
        orderRefund.updatedBy = admin.id;
        const updateOrderRefund = await this.orderRefundRepository.save(orderRefund);
        if (!updateOrderRefund) {
            throw new common_1.BadRequestException('UPDATE_ORDER_REFUND_FAILED');
        }
        return updateOrderRefund;
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(entities_1.Order)),
    __param(1, (0, typeorm_2.InjectRepository)(entities_1.OrderDetail)),
    __param(2, (0, typeorm_2.InjectRepository)(entities_1.OrderRefund)),
    __param(3, (0, typeorm_2.InjectRepository)(entities_1.OrderRefundDetail)),
    __param(4, (0, typeorm_2.InjectRepository)(entities_1.PromotionHistory)),
    __param(5, (0, typeorm_2.InjectRepository)(entities_1.TicketDetail)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        customer_service_1.CustomerService,
        admin_service_1.AdminService,
        seat_service_1.SeatService,
        ticket_service_1.TicketService,
        trip_detail_service_1.TripDetailService,
        price_list_service_1.PriceListService,
        promotion_line_service_1.PromotionLineService,
        promotion_history_service_1.PromotionHistoryService,
        payment_history_service_1.PaymentHistoryService,
        typeorm_1.DataSource,
        config_1.ConfigService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map