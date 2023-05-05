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
exports.PaymentService = void 0;
const entities_1 = require("./../../database/entities");
const enums_1 = require("./../../enums");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_service_1 = require("../customer/customer.service");
const admin_service_1 = require("../admin/admin.service");
const config_1 = require("@nestjs/config");
const CryptoJS = require("crypto-js");
const axios_1 = require("axios");
const qs = require("qs");
const moment = require("moment");
const payment_history_service_1 = require("../payment-history/payment-history.service");
const dto_1 = require("../payment-history/dto");
moment.locale('vi');
let PaymentService = class PaymentService {
    constructor(orderRepository, customerService, adminService, paymentHService, dataSource, configService) {
        this.orderRepository = orderRepository;
        this.customerService = customerService;
        this.adminService = adminService;
        this.paymentHService = paymentHService;
        this.dataSource = dataSource;
        this.configService = configService;
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
                            },
                        },
                    },
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
                } }, options === null || options === void 0 ? void 0 : options.select), relations: Object.assign({ orderDetails: {
                    ticketDetail: {
                        ticket: {
                            tripDetail: true,
                        },
                    },
                }, staff: true, customer: true, paymentHistory: true }, options === null || options === void 0 ? void 0 : options.relations), order: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.orderBy) }, options === null || options === void 0 ? void 0 : options.other));
    }
    async findOneOrderByCode(code, options) {
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOneOrder(options);
    }
    async getZaloPayPaymentUrl(orderCode, userId) {
        if (!userId) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        const customer = await this.customerService.findOneById(userId);
        if (!customer) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (customer.status === enums_1.UserStatusEnum.INACTIVATE) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        let paymentResult;
        try {
            const orderExist = await this.findOneOrderByCode(orderCode);
            if (!orderExist) {
                throw new common_1.BadRequestException('ORDER_NOT_FOUND');
            }
            switch (orderExist.status) {
                case enums_1.OrderStatusEnum.PAID:
                    throw new common_1.BadRequestException('ORDER_ALREADY_PAID');
                    break;
                case enums_1.OrderStatusEnum.CANCEL:
                    throw new common_1.BadRequestException('ORDER_ALREADY_CANCEL');
                    break;
                case enums_1.OrderStatusEnum.RETURNED:
                    throw new common_1.BadRequestException('ORDER_ALREADY_RETURNED');
                    break;
                default:
                    break;
            }
            const tripDetail = orderExist.orderDetails[0].ticketDetail.ticket.tripDetail;
            const currentDate = new Date(moment().format('YYYY-MM-DD HH:mm'));
            if (currentDate >= tripDetail.departureTime) {
                throw new common_1.BadRequestException('TRIP_DETAIL_HAS_PASSED_NOT_PAYMENT');
            }
            const config = {
                app_id: Number(this.configService.get('ZALO_PAY_APP_ID')),
                key1: this.configService.get('ZALO_PAY_KEY_1'),
                endpoint: this.configService.get('ZALO_PAY_ENDPOINT'),
                company_name: this.configService.get('COMPANY_NAME'),
            };
            const embed_data = {
                redirecturl: this.configService.get('REDIRECT_URL'),
            };
            const randomCode = Math.floor(Math.random() * 1000000);
            const transID = `${moment().format('YYMMDD')}_${orderCode}-${randomCode}`;
            const items = [
                {
                    orderCode,
                    transID,
                },
            ];
            const payload = {
                app_id: config.app_id,
                app_trans_id: transID,
                app_user: 'user123',
                app_time: Date.now(),
                item: JSON.stringify(items),
                embed_data: JSON.stringify(embed_data),
                amount: Number(orderExist.finalTotal),
                description: `${config.company_name} - Thanh toán vé #${orderCode}`,
                bank_code: 'CC',
                title: `${config.company_name} - Thanh toán vé #${orderCode}`,
                callback_url: this.configService.get('CALLBACK_URL'),
                mac: '',
            };
            const data = config.app_id +
                '|' +
                payload.app_trans_id +
                '|' +
                payload.app_user +
                '|' +
                payload.amount +
                '|' +
                payload.app_time +
                '|' +
                payload.embed_data +
                '|' +
                payload.item;
            payload.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
            await axios_1.default
                .post(config.endpoint, null, { params: payload })
                .then((result) => {
                paymentResult = {
                    zalo: result.data,
                    appTransId: payload.app_trans_id,
                    appTime: payload.app_time,
                };
            })
                .catch((err) => console.log(err));
            const paymentHistory = await this.paymentHService.findPaymentHByOrderCode(orderCode);
            if (paymentHistory) {
                const phUpdateDto = new dto_1.UpdatePaymentHistoryDto();
                phUpdateDto.amount = orderExist.finalTotal;
                phUpdateDto.status = enums_1.PaymentHistoryStatusEnum.ZALOPAY_PENDING;
                phUpdateDto.paymentMethod = enums_1.PaymentMethodEnum.ZALOPAY;
                phUpdateDto.transId = payload.app_trans_id;
                phUpdateDto.createAppTime = payload.app_time;
                phUpdateDto.type = enums_1.UpdatePayHTypeDtoEnum.GENERATE_NEW_LINK;
                await this.paymentHService.updatePaymentHistoryByOrderCode(orderCode, phUpdateDto);
            }
            else {
                const phCreateDto = new dto_1.CreatePaymentHistoryDto();
                phCreateDto.status = enums_1.PaymentHistoryStatusEnum.ZALOPAY_PENDING;
                phCreateDto.amount = orderExist.finalTotal;
                phCreateDto.orderCode = orderExist.code;
                phCreateDto.paymentMethod = enums_1.PaymentMethodEnum.ZALOPAY;
                phCreateDto.transId = payload.app_trans_id;
                phCreateDto.createAppTime = payload.app_time;
                await this.paymentHService.createPaymentHistory(phCreateDto, userId);
            }
            orderExist.paymentMethod = enums_1.PaymentMethodEnum.ZALOPAY;
            orderExist.updatedBy = userId;
            await this.orderRepository.save(orderExist);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
        if (!paymentResult) {
            throw new common_1.BadRequestException('CONNECT_ZALOPAY_FAIL');
        }
        return paymentResult;
    }
    async checkStatusZaloPay(dto, userId) {
        let saveOrder;
        try {
            if (!userId) {
                throw new common_1.UnauthorizedException('UNAUTHORIZED');
            }
            const staff = await this.adminService.findOneById(userId);
            if (!staff) {
                throw new common_1.UnauthorizedException('UNAUTHORIZED');
            }
            if (!staff.isActive) {
                throw new common_1.BadRequestException('USER_NOT_ACTIVE');
            }
            const { orderCode, paymentMethod } = dto;
            if (!orderCode) {
                throw new common_1.BadRequestException('ORDER_CODE_REQUIRED');
            }
            const orderExist = await this.findOneOrderByCode(orderCode);
            if (!orderExist) {
                throw new common_1.BadRequestException('ORDER_NOT_FOUND');
            }
            const paymentHistory = await this.paymentHService.findPaymentHByOrderCode(orderCode);
            if (!paymentHistory) {
                throw new common_1.BadRequestException('PAYMENT_HISTORY_NOT_FOUND');
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
            if (paymentMethod !== enums_1.PaymentMethodEnum.ZALOPAY) {
                throw new common_1.BadRequestException('PAYMENT_METHOD_NOT_FOUND');
            }
            orderExist.updatedBy = userId;
            if (!paymentHistory.transId || !paymentHistory.createAppTime) {
                throw new common_1.BadRequestException('TRANSACTION_ID_REQUIRED');
            }
            const config = {
                app_id: this.configService.get('ZALO_PAY_APP_ID'),
                key1: this.configService.get('ZALO_PAY_KEY_1'),
                key2: this.configService.get('ZALO_PAY_KEY_2'),
                endpoint: this.configService.get('ZALO_PAY_ENDPOINT_QUERY'),
            };
            const postData = {
                app_id: config.app_id,
                app_trans_id: paymentHistory.transId,
            };
            const data = `${postData.app_id}|${postData.app_trans_id}|${config.key1}`;
            postData['mac'] = CryptoJS.HmacSHA256(data, config.key1).toString();
            const postConfig = {
                method: 'post',
                url: config.endpoint,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: qs.stringify(postData),
            };
            let flag = 0;
            const logData = {
                orderCode,
                paymentMethod,
                transId: paymentHistory.transId,
                createAppTime: paymentHistory.createAppTime,
            };
            console.log('check payment: ', logData);
            await (0, axios_1.default)(postConfig).then(async (response) => {
                console.log('return_code: ', response.data.return_code);
                if (response.data.return_code === 1) {
                    orderExist.paymentMethod = paymentMethod;
                    orderExist.status = enums_1.OrderStatusEnum.PAID;
                    orderExist.note = 'Thanh toán thành công';
                    const dtoPH = new dto_1.UpdatePaymentHistoryDto();
                    dtoPH.status = enums_1.PaymentHistoryStatusEnum.SUCCESS;
                    dtoPH.paymentMethod = paymentMethod;
                    dtoPH.zaloTransId = response.data.zp_trans_id;
                    dtoPH.paymentTime = new Date(response.data.server_time);
                    dtoPH.type = enums_1.UpdatePayHTypeDtoEnum.UPDATE;
                    dtoPH.amount = orderExist.finalTotal;
                    await this.paymentHService.updatePaymentHistoryByOrderCode(orderCode, dtoPH);
                    saveOrder = await this.orderRepository.save(orderExist);
                    flag = 1;
                }
                else if (Date.now() > Number(paymentHistory.createAppTime) + 15 * 60 * 1000 ||
                    response.data.return_code === 2) {
                    orderExist.note = 'Thanh toán thất bại';
                    saveOrder = await this.orderRepository.save(orderExist);
                    flag = 0;
                    throw new common_1.BadRequestException('PAYMENT_FAIL');
                }
                else if (response.data.return_code === 3) {
                    orderExist.note = 'ZaloPay đang xử lý thanh toán';
                    flag = 2;
                    saveOrder = await this.orderRepository.save(orderExist);
                    throw new common_1.BadRequestException('PAYMENT_NOT_COMPLETE');
                }
            });
            if (flag === 0) {
                throw new common_1.BadRequestException('PAYMENT_FAIL');
            }
            else if (flag === 2) {
                throw new common_1.BadRequestException('PAYMENT_NOT_COMPLETE');
            }
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
            saveOrder = await this.findOneOrderByCode(orderCode);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
        return saveOrder;
    }
};
PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        customer_service_1.CustomerService,
        admin_service_1.AdminService,
        payment_history_service_1.PaymentHistoryService,
        typeorm_2.DataSource,
        config_1.ConfigService])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map