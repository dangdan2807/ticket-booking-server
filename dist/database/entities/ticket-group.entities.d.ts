import { PriceDetail, PromotionDetail, Ticket, Trip } from '.';
export declare class TicketGroup {
    id: string;
    code: string;
    name: string;
    description: string;
    note: string;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    promotionDetails: PromotionDetail[];
    tickets: Ticket[];
    trips: Trip[];
    priceDetail: PriceDetail[];
}
