import { Ticket, TicketGroup } from '.';
export declare class TicketGroupDetail {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    ticketGroup: TicketGroup;
    ticket: Ticket;
}
