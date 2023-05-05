import { TicketDetail, TripDetail } from '.';
export declare class Ticket {
    id: string;
    code: string;
    note: string;
    startDate: Date;
    endDate: Date;
    tripDetailCode: string;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    ticketDetails: TicketDetail[];
    tripDetail: TripDetail;
}
