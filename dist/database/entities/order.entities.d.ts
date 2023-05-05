import { Customer, OrderDetail, OrderRefund, PromotionHistory, Staff } from '.';
import { PaymentHistory } from './payment-history.entities';
export declare class Order {
    id: string;
    code: string;
    note: string;
    total: number;
    status: string;
    finalTotal: number;
    paymentMethod: string;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    customer: Customer;
    staff: Staff;
    orderDetails: OrderDetail[];
    orderRefund: OrderRefund;
    promotionHistories: PromotionHistory[];
    paymentHistory: PaymentHistory;
}
