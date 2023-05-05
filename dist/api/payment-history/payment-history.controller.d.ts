import { PaymentHistoryService } from './payment-history.service';
import { Pagination } from './../../decorator';
import { FilterPaymentHistoryDto } from './dto';
export declare class PaymentHistoryController {
    private paymentHistoryService;
    constructor(paymentHistoryService: PaymentHistoryService);
    findAllPaymentHistory(dto: FilterPaymentHistoryDto, user: any, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").PaymentHistory[];
        total: number;
        pagination: Pagination;
    }>;
    getPaymentHistoryByCode(code: string): Promise<import("../../database/entities").PaymentHistory>;
    getPaymentHistoryById(id: string): Promise<import("../../database/entities").PaymentHistory>;
    getPaymentHistoryByOrderCode(orderCode: string): Promise<import("../../database/entities").PaymentHistory>;
}
