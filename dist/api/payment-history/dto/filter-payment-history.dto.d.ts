import { PaymentHistoryStatusEnum, PaymentMethodEnum } from './../../../enums';
export declare class FilterPaymentHistoryDto {
    keywords: string;
    minAmount: number;
    maxAmount: number;
    customerCode: string;
    staffCode: string;
    status: PaymentHistoryStatusEnum;
    paymentMethod: PaymentMethodEnum;
    fromDatePaymentTime: Date;
    toDatePaymentTime: Date;
}
