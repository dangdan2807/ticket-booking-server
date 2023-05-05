import { PromotionTypeEnum } from '../../../enums';
import { ProductDiscountDto, ProductDiscountPercentDto } from './promotion-type.dto';
export declare class CreatePromotionLinesDto {
    code: string;
    title: string;
    description: string;
    note: string;
    couponCode: string;
    tripCodes: string[];
    startDate: Date;
    endDate: Date;
    maxQuantity: number;
    maxBudget: number;
    promotionCode: string;
    type: PromotionTypeEnum;
    productDiscount?: ProductDiscountDto;
    productDiscountPercent?: ProductDiscountPercentDto;
}
