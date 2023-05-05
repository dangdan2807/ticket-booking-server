import { TicketDetail, Vehicle } from '.';
export declare class Seat {
    id: string;
    code: string;
    name: string;
    floor: number;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    vehicle: Vehicle;
    ticketDetails: TicketDetail[];
}
