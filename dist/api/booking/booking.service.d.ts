import { PaymentService } from './../payment/payment.service';
import { CreateBookingDto } from './dto';
import { OrderService } from '../order/order.service';
export declare class BookingService {
    private readonly orderService;
    private readonly paymentService;
    constructor(orderService: OrderService, paymentService: PaymentService);
    booking(dto: CreateBookingDto, userId: string): Promise<import("../../database/entities").Order>;
    getZaloPayPaymentUrl(orderCode: string, userId: string): Promise<any>;
}
