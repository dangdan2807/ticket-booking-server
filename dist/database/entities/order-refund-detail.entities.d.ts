import { OrderDetail, TicketDetail, OrderRefund } from '.';
export declare class OrderRefundDetail {
    id: string;
    total: number;
    note: string;
    orderRefundCode: string;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    orderRefund: OrderRefund;
    ticketDetail: TicketDetail;
    orderDetail: OrderDetail;
}
