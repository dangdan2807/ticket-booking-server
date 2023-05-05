import { PromotionTypeEnum } from '../../../enums';
import { ProductDiscountDto, ProductDiscountPercentDto } from '.';
export declare class UpdatePromotionLineDto {
    title: string;
    description: string;
    note: string;
    tripCode: string;
    startDate: Date;
    endDate: Date;
    maxQuantity: number;
    maxBudget: number;
    type: PromotionTypeEnum;
    productDiscount?: ProductDiscountDto;
    productDiscountPercent?: ProductDiscountPercentDto;
}
