import { Trip, PriceDetail } from '.';
export declare class ApplicablePriceDetail {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    trip: Trip;
    priceDetail: PriceDetail;
}
