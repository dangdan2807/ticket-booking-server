import { PaymentHistoryStatusEnum, PaymentMethodEnum } from './../../../enums';
export declare class CreatePaymentHistoryDto {
    note: string;
    status: PaymentHistoryStatusEnum;
    amount: number;
    orderCode: string;
    paymentMethod: PaymentMethodEnum;
    transId: string;
    createAppTime: number;
}
