import { Order, PriceDetail, TicketDetail, OrderRefundDetail } from '.';
export declare class OrderDetail {
    id: string;
    total: number;
    note: string;
    orderCode: string;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    order: Order;
    priceDetail: PriceDetail;
    ticketDetail: TicketDetail;
    orderRefundDetail: OrderRefundDetail;
}
