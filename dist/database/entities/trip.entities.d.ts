import { ActiveStatusEnum } from './../../enums';
import { Station, TripDetail, PromotionDetail, PriceDetail } from '.';
export declare class Trip {
    id: string;
    code: string;
    name: string;
    note: string;
    startDate: Date;
    endDate: Date;
    status: ActiveStatusEnum;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    fromStation: Station;
    toStation: Station;
    tripDetails: TripDetail[];
    promotionDetails: PromotionDetail[];
    priceDetails: PriceDetail[];
}
