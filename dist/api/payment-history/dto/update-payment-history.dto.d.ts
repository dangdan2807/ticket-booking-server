import { PaymentHistoryStatusEnum, PaymentMethodEnum, UpdatePayHTypeDtoEnum } from '../../../enums';
export declare class UpdatePaymentHistoryDto {
    note: string;
    amount: number;
    status: PaymentHistoryStatusEnum;
    paymentMethod: PaymentMethodEnum;
    type: UpdatePayHTypeDtoEnum;
    transId: string;
    createAppTime: number;
    zaloTransId: string;
    paymentTime: Date;
}
