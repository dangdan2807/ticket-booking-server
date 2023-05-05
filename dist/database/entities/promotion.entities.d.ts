import { PromotionStatusEnum } from './../../enums';
import { PromotionLine } from '.';
export declare class Promotion {
    id: string;
    code: string;
    name: string;
    description: string;
    note: string;
    startDate: Date;
    endDate: Date;
    status: PromotionStatusEnum;
    image: string;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    promotionLines: PromotionLine[];
}
