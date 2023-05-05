import { PromotionLine, Trip } from '.';
export declare class PromotionDetail {
    id: string;
    quantityBuy: number;
    purchaseAmount: number;
    reductionAmount: number;
    percentDiscount: number;
    maxReductionAmount: number;
    promotionLineCode: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    promotionLine: PromotionLine;
    trip: Trip;
}
