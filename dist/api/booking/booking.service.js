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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const payment_service_1 = require("./../payment/payment.service");
const common_1 = require("@nestjs/common");
const dto_1 = require("../order/dto");
const order_service_1 = require("../order/order.service");
let BookingService = class BookingService {
    constructor(orderService, paymentService) {
        this.orderService = orderService;
        this.paymentService = paymentService;
    }
    async booking(dto, userId) {
        const { seatIds, seatCodes, tripDetailCode, promotionLineCodes } = dto;
        const dtoOrder = new dto_1.CreateOrderDto();
        if (!seatCodes && !seatIds) {
            throw new common_1.BadRequestException('SEAT_IDS_OR_SEAT_CODES_REQUIRED');
        }
        if (seatIds && seatIds.length > 0) {
            dtoOrder.seatIds = seatIds;
        }
        else if (seatCodes && seatCodes.length > 0) {
            dtoOrder.seatCodes = seatCodes;
        }
        dtoOrder.tripDetailCode = tripDetailCode;
        dtoOrder.note = '';
        dtoOrder.customerId = userId;
        dtoOrder.promotionLineCodes = promotionLineCodes;
        const order = await this.orderService.createOrder(dtoOrder, userId);
        return order;
    }
    async getZaloPayPaymentUrl(orderCode, userId) {
        return await this.paymentService.getZaloPayPaymentUrl(orderCode, userId);
    }
};
BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        payment_service_1.PaymentService])
], BookingService);
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map