import { PaymentMethodEnum } from './../../../enums';
export declare class CreatePaymentHistoryDto {
    note: string;
    amount: number;
    orderCode: string;
    paymentMethod: PaymentMethodEnum;
    transId: string;
    createAppTime: string;
}
