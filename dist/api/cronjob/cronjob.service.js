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
exports.CronjobService = void 0;
const dto_1 = require("./../payment/dto");
const enums_1 = require("./../../enums");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_2 = require("@nestjs/typeorm");
const entities_1 = require("./../../database/entities");
const moment = require("moment");
const payment_service_1 = require("../payment/payment.service");
moment.locale('vi');
let CronjobService = class CronjobService {
    constructor(orderRepository, paymentService, dataSource, configService) {
        this.orderRepository = orderRepository;
        this.paymentService = paymentService;
        this.dataSource = dataSource;
        this.configService = configService;
    }
    async cronjobOrderPayment(dto) {
        try {
            const { secretKey } = dto;
            const secret = this.configService.get('SECRET_KEY_CRONJOB');
            if (secretKey !== secret) {
                throw new common_1.BadRequestException('SECRET_KEY_IS_NOT_VALID');
            }
            const orderCodes = await this.orderRepository
                .createQueryBuilder('q')
                .where('q.status = :status', { status: enums_1.OrderStatusEnum.UNPAID })
                .select(['q.code'])
                .getMany();
            if (orderCodes.length <= 0) {
                console.log('No order need to cronjob');
            }
            else {
                const orderCodesInPH = await this.dataSource
                    .getRepository(entities_1.PaymentHistory)
                    .createQueryBuilder('q')
                    .where('q.orderCode IN (:...orderCodes)', {
                    orderCodes: orderCodes.map((item) => item.code),
                })
                    .andWhere('q.transId IS NOT NULL')
                    .andWhere('q.createAppTime IS NOT NULL')
                    .select(['q.orderCode'])
                    .getMany();
                if (orderCodesInPH.length > 0) {
                    const userId = await this.configService.get('ADMIN_ID');
                    const cronjob = await orderCodes.map(async (item) => {
                        const { code } = item;
                        const dto = new dto_1.CheckStatusZaloPayPaymentDto();
                        dto.orderCode = code;
                        dto.paymentMethod = enums_1.PaymentMethodEnum.ZALOPAY;
                        const order = await this.paymentService.checkStatusZaloPay(dto, userId);
                        return order;
                    });
                    await Promise.all(cronjob);
                }
                else {
                    console.log('No order need to cronjob');
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
};
CronjobService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(entities_1.Order)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        payment_service_1.PaymentService,
        typeorm_1.DataSource,
        config_1.ConfigService])
], CronjobService);
exports.CronjobService = CronjobService;
//# sourceMappingURL=cronjob.service.js.map