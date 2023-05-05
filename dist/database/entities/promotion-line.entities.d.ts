import { PromotionTypeEnum } from './../../enums';
import { PromotionHistory, PromotionDetail, Promotion } from '.';
export declare class PromotionLine {
    id: string;
    code: string;
    couponCode: string;
    title: string;
    description: string;
    note: string;
    startDate: Date;
    endDate: Date;
    type: PromotionTypeEnum;
    useBudget: number;
    maxBudget: number;
    useQuantity: number;
    maxQuantity: number;
    applyAll: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    promotionDetail: PromotionDetail;
    promotionHistory: PromotionHistory[];
    promotion: Promotion;
}
