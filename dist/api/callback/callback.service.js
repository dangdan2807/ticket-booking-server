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
exports.CallbackService = void 0;
const enums_1 = require("./../../enums");
const entities_1 = require("./../../database/entities");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const CryptoJS = require("crypto-js");
const moment = require("moment");
const payment_history_service_1 = require("../payment-history/payment-history.service");
const dto_1 = require("../payment-history/dto");
moment.locale('vi');
let CallbackService = class CallbackService {
    constructor(orderRepository, paymentHistoryService, configService, dataSource) {
        this.orderRepository = orderRepository;
        this.paymentHistoryService = paymentHistoryService;
        this.configService = configService;
        this.dataSource = dataSource;
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
                    },
                }, customer: {
                    id: true,
                    status: true,
                    phone: true,
                    email: true,
                    fullName: true,
                } }, options === null || options === void 0 ? void 0 : options.select), relations: Object.assign({ orderDetails: { ticketDetail: true }, customer: true }, options === null || options === void 0 ? void 0 : options.relations), order: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.orderBy) }, options === null || options === void 0 ? void 0 : options.other));
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
    async callbackZaloPayV2(dto) {
        const config = {
            key2: await this.configService.get('ZALO_PAY_KEY_2'),
        };
        const result = {};
        const dataStr = dto.data;
        const reqMac = dto.mac;
        const mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
        try {
            if (reqMac !== mac) {
                result['return_code'] = -1;
                result['return_message'] = 'mac not equal';
                console.log('mac not equal');
            }
            else {
                const dataJson = JSON.parse(dataStr, config.key2);
                console.log(dataJson);
                const { item, zp_trans_id, server_time } = dataJson;
                const itemJson = JSON.parse(item);
                const orderCode = itemJson[0].orderCode;
                const orderExist = await this.findOneOrderByCode(orderCode);
                if (orderExist) {
                    orderExist.paymentMethod = enums_1.PaymentMethodEnum.ZALOPAY;
                    orderExist.status = enums_1.OrderStatusEnum.PAID;
                    orderExist.updatedBy = orderExist.customer.id;
                    orderExist.note = 'Thanh toán thành công';
                    const paymentHistory = await this.paymentHistoryService.findPaymentHByOrderCode(orderCode);
                    if (paymentHistory) {
                        const phDto = new dto_1.UpdatePaymentHistoryDto();
                        phDto.status = enums_1.PaymentHistoryStatusEnum.SUCCESS;
                        phDto.paymentMethod = enums_1.PaymentMethodEnum.ZALOPAY;
                        phDto.zaloTransId = zp_trans_id;
                        phDto.paymentTime = new Date(server_time);
                        phDto.type = enums_1.UpdatePayHTypeDtoEnum.UPDATE;
                        await this.paymentHistoryService.updatePaymentHistoryByOrderCode(orderCode, phDto);
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
                        result['return_code'] = 1;
                        result['return_message'] = 'success';
                        console.log('thanh toán thành công');
                    }
                    else {
                        result['return_code'] = 0;
                        result['return_message'] = 'fail';
                        console.log('không tìm payment history');
                    }
                }
                else {
                    result['return_code'] = 0;
                    result['return_message'] = 'fail';
                    console.log('không tìm thấy đơn hàng');
                }
            }
        }
        catch (error) {
            result['return_code'] = 0;
            result['return_message'] = error.message;
        }
        console.log('result =', result);
        return result;
    }
};
CallbackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        payment_history_service_1.PaymentHistoryService,
        config_1.ConfigService,
        typeorm_2.DataSource])
], CallbackService);
exports.CallbackService = CallbackService;
//# sourceMappingURL=callback.service.js.map