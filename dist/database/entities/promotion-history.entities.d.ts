import { PromotionLine, Order, OrderRefund } from '.';
export declare class PromotionHistory {
    id: string;
    code: string;
    amount: number;
    note: string;
    quantity: number;
    type: string;
    promotionLineCode: string;
    orderCode: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    order: Order;
    orderRefund: OrderRefund;
    promotionLine: PromotionLine;
}
