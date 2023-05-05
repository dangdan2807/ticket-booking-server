"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_module_1 = require("./database/database.module");
const core_1 = require("@nestjs/core");
const schedule_1 = require("@nestjs/schedule");
const interceptors_1 = require("./utils/interceptors");
const auth_module_1 = require("./auth/auth.module");
const customer_module_1 = require("./api/customer/customer.module");
const province_module_1 = require("./api/address/province/province.module");
const district_module_1 = require("./api/address/district/district.module");
const ward_module_1 = require("./api/address/ward/ward.module");
const station_module_1 = require("./api/station/station.module");
const vehicle_module_1 = require("./api/vehicle/vehicle.module");
const seat_module_1 = require("./api/seat/seat.module");
const image_resource_module_1 = require("./api/image-resource/image-resource.module");
const upload_module_1 = require("./api/upload/upload.module");
const trip_module_1 = require("./api/trip/trip.module");
const trip_detail_module_1 = require("./api/trip-detail/trip-detail.module");
const customer_group_module_1 = require("./api/customer-group/customer-group.module");
const price_list_module_1 = require("./api/price-list/price-list.module");
const admin_module_1 = require("./api/admin/admin.module");
const user_module_1 = require("./api/user/user.module");
const promotion_module_1 = require("./api/promotion/promotion.module");
const booking_module_1 = require("./api/booking/booking.module");
const ticket_module_1 = require("./api/ticket/ticket.module");
const order_module_1 = require("./api/order/order.module");
const promotion_line_module_1 = require("./api/promotion-line/promotion-line.module");
const promotion_history_module_1 = require("./api/promotion-history/promotion-history.module");
const statistics_module_1 = require("./api/statistics/statistics.module");
const callback_module_1 = require("./api/callback/callback.module");
const cronjob_module_1 = require("./api/cronjob/cronjob.module");
const payment_module_1 = require("./api/payment/payment.module");
const payment_history_module_1 = require("./api/payment-history/payment-history.module");
const order_refund_module_1 = require("./api/order-refund/order-refund.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.local' }),
            schedule_1.ScheduleModule.forRoot(),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            admin_module_1.AdminModule,
            user_module_1.UserModule,
            customer_module_1.CustomerModule,
            customer_group_module_1.CustomerGroupModule,
            province_module_1.ProvinceModule,
            district_module_1.DistrictModule,
            ward_module_1.WardModule,
            station_module_1.StationModule,
            trip_module_1.TripModule,
            trip_detail_module_1.TripDetailModule,
            vehicle_module_1.VehicleModule,
            seat_module_1.SeatModule,
            ticket_module_1.TicketModule,
            image_resource_module_1.ImageResourceModule,
            price_list_module_1.PriceListModule,
            promotion_module_1.PromotionModule,
            promotion_line_module_1.PromotionLineModule,
            promotion_history_module_1.PromotionHistoryModule,
            booking_module_1.BookingModule,
            order_module_1.OrderModule,
            order_refund_module_1.OrderRefundModule,
            payment_module_1.PaymentModule,
            payment_history_module_1.PaymentHistoryModule,
            statistics_module_1.StatisticsModule,
            callback_module_1.CallbackModule,
            cronjob_module_1.CronjobModule,
            upload_module_1.UploadModule,
        ],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: interceptors_1.TransformResponseInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: interceptors_1.ExceptionHandlerInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map