"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRefundModule = void 0;
const common_1 = require("@nestjs/common");
const order_refund_controller_1 = require("./order-refund.controller");
const order_service_1 = require("../order/order.service");
const admin_service_1 = require("../admin/admin.service");
const customer_service_1 = require("../customer/customer.service");
const seat_service_1 = require("../seat/seat.service");
const ticket_service_1 = require("../ticket/ticket.service");
const price_list_service_1 = require("../price-list/price-list.service");
const promotion_line_service_1 = require("../promotion-line/promotion-line.service");
const promotion_history_service_1 = require("../promotion-history/promotion-history.service");
const payment_service_1 = require("../payment/payment.service");
const entities_1 = require("./../../database/entities");
const typeorm_1 = require("@nestjs/typeorm");
const payment_history_service_1 = require("../payment-history/payment-history.service");
let OrderRefundModule = class OrderRefundModule {
};
OrderRefundModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.Order,
                entities_1.OrderDetail,
                entities_1.OrderRefund,
                entities_1.OrderRefundDetail,
                entities_1.Staff,
                entities_1.Customer,
                entities_1.Seat,
                entities_1.Ticket,
                entities_1.Trip,
                entities_1.TicketDetail,
                entities_1.TripDetail,
                entities_1.PriceList,
                entities_1.PriceDetail,
                entities_1.Promotion,
                entities_1.PromotionLine,
                entities_1.PromotionDetail,
                entities_1.PromotionHistory,
                entities_1.PaymentHistory,
            ]),
        ],
        controllers: [order_refund_controller_1.OrderRefundController],
        providers: [
            order_service_1.OrderService,
            admin_service_1.AdminService,
            customer_service_1.CustomerService,
            seat_service_1.SeatService,
            ticket_service_1.TicketService,
            price_list_service_1.PriceListService,
            promotion_line_service_1.PromotionLineService,
            promotion_history_service_1.PromotionHistoryService,
            payment_service_1.PaymentService,
            payment_history_service_1.PaymentHistoryService,
        ],
    })
], OrderRefundModule);
exports.OrderRefundModule = OrderRefundModule;
//# sourceMappingURL=order-refund.module.js.map