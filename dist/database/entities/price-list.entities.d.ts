import { ActiveStatusEnum } from './../../enums';
import { PriceDetail } from '.';
export declare class PriceList {
    id: string;
    code: string;
    name: string;
    startDate: Date;
    endDate: Date;
    note: string;
    status: ActiveStatusEnum;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    priceDetails: PriceDetail[];
}
