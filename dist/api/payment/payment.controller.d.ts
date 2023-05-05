import { PaymentService } from './payment.service';
import { CheckStatusZaloPayPaymentDto } from './dto';
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    getZaloPayPaymentUrl(orderCode: string, user: any): Promise<any>;
    checkPaymentStatus(dto: CheckStatusZaloPayPaymentDto, user: any): Promise<import("../../database/entities").Order>;
}
