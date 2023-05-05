import { OrderRefundDetail, Order, PromotionHistory, Customer, Staff, PaymentHistory } from '.';
export declare class OrderRefund {
    id: string;
    code: string;
    note: string;
    status: string;
    total: number;
    orderCode: string;
    customerCode: string;
    staffCode: string;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    order: Order;
    orderRefundDetails: OrderRefundDetail[];
    promotionHistories: PromotionHistory[];
    customer: Customer;
    staff: Staff;
    paymentHistory: PaymentHistory;
}
