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
exports.OrderDetailService = void 0;
const entities_1 = require("./../../database/entities");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const enums_1 = require("./../../enums");
const customer_service_1 = require("../customer/customer.service");
const admin_service_1 = require("../admin/admin.service");
const seat_service_1 = require("../seat/seat.service");
const ticket_service_1 = require("../ticket/ticket.service");
const price_list_service_1 = require("../price-list/price-list.service");
const dto_1 = require("../ticket/dto");
const moment = require("moment");
moment.locale('vi');
let OrderDetailService = class OrderDetailService {
    constructor(orderRepository, orderDetailRepository, customerService, adminService, seatService, ticketService, priceListService) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.customerService = customerService;
        this.adminService = adminService;
        this.seatService = seatService;
        this.ticketService = ticketService;
        this.priceListService = priceListService;
    }
    async findOneOrder(options) {
        return await this.orderRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), select: Object.assign({ orderDetails: {
                    id: true,
                    total: true,
                    note: true,
                    orderCode: true,
                    ticketDetail: {
                        code: true,
                        status: true,
                        note: true,
                        seat: {
                            code: true,
                            name: true,
                            vehicle: {
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
                                code: true,
                                departureTime: true,
                                expectedTime: true,
                                trip: {
                                    code: true,
                                    name: true,
                                    status: true,
                                    fromStation: {
                                        code: true,
                                        name: true,
                                        fullAddress: true,
                                    },
                                    toStation: {
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
                    isActive: true,
                    phone: true,
                    email: true,
                    fullName: true,
                    gender: true,
                    birthDay: true,
                }, customer: {
                    id: true,
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
                }, deletedAt: false }, options === null || options === void 0 ? void 0 : options.select), relations: Object.assign({ orderDetails: {
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
    async findOrderDetail(options) {
        return await this.orderDetailRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), relations: Object.assign({}, options === null || options === void 0 ? void 0 : options.relations), select: Object.assign({}, options === null || options === void 0 ? void 0 : options.select), orderBy: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.orderBy) }, options === null || options === void 0 ? void 0 : options.other));
    }
    async findOrderDetailById(id, options) {
        if (options) {
            options.where = Object.assign({ id }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { id } };
        }
        return await this.findOrderDetail(options);
    }
    async findOrderDetailByCode(code, options) {
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOrderDetail(options);
    }
    async getOrderDetailById(id, options) {
        const order = await this.findOrderDetailById(id, options);
        if (!order) {
            throw new common_1.UnauthorizedException('ORDER_DETAIL_NOT_FOUND');
        }
        return order;
    }
    async getOrderDetailByCode(code, options) {
        const order = await this.findOrderDetailByCode(code, options);
        if (!order) {
            throw new common_1.UnauthorizedException('ORDER_DETAIL_NOT_FOUND');
        }
        return order;
    }
    async getOrderDetailByOrderCode(orderCode, options) {
        const order = await this.orderDetailRepository.find(Object.assign({ where: Object.assign({ orderCode }, options === null || options === void 0 ? void 0 : options.where), relations: Object.assign({ deletedAt: false }, options === null || options === void 0 ? void 0 : options.relations), select: Object.assign({ deletedAt: false }, options === null || options === void 0 ? void 0 : options.select), order: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.orderBy) }, options === null || options === void 0 ? void 0 : options.other));
        return order;
    }
    async createOrderDetail(dto, userId, order) {
        const queryRunnerOrderDetail = this.orderDetailRepository.manager.connection.createQueryRunner();
        await queryRunnerOrderDetail.connect();
        await queryRunnerOrderDetail.startTransaction();
        let orderExist;
        try {
            const customer = await this.customerService.findOneById(userId);
            const admin = await this.adminService.findOneBydId(userId);
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
            const ticketDetailDto = new dto_1.UpdateTicketDetailDto();
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
};
OrderDetailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(entities_1.Order)),
    __param(1, (0, typeorm_2.InjectRepository)(entities_1.OrderDetail)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        customer_service_1.CustomerService,
        admin_service_1.AdminService,
        seat_service_1.SeatService,
        ticket_service_1.TicketService,
        price_list_service_1.PriceListService])
], OrderDetailService);
exports.OrderDetailService = OrderDetailService;
//# sourceMappingURL=order-detail.service.js.map