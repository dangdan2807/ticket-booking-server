import { Seat, Ticket, OrderDetail } from '.';
export declare class TicketDetail {
    id: string;
    code: string;
    status: string;
    note: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    ticket: Ticket;
    seat: Seat;
    orderDetails: OrderDetail[];
}
