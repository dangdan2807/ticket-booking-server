import { PromotionTypeEnum } from './../../../enums';
import { ProductDiscountDto, ProductDiscountPercentDto } from './promotion-type.dto';
export declare class CreatePromotionLineDto {
    code: string;
    title: string;
    description: string;
    note: string;
    couponCode: string;
    tripCode: string;
    startDate: Date;
    endDate: Date;
    maxQuantity: number;
    maxBudget: number;
    promotionCode: string;
    type: PromotionTypeEnum;
    productDiscount?: ProductDiscountDto;
    productDiscountPercent?: ProductDiscountPercentDto;
}
