import { PromotionTypeEnum, SortEnum } from '../../../enums';
export declare class FilterPromotionLineDto {
    keywords: string;
    startDate: Date;
    endDate: Date;
    minUseQuantity: number;
    maxUseQuantity: number;
    maxOfMaxQuantity: number;
    minOfMaxQuantity: number;
    minUseBudget: number;
    maxUseBudget: number;
    minOfMaxBudget: number;
    maxOfMaxBudget: number;
    promotionCode: string;
    type: PromotionTypeEnum;
    sort: SortEnum;
}
