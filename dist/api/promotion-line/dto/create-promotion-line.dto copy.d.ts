import { PromotionTypeEnum } from './../../../enums';
import { ProductDiscountDto, ProductDiscountPercentDto, ProductGiveawayDto } from './promotion-type.dto';
export declare class CreatePromotionLineDto {
    code: string;
    title: string;
    description: string;
    note: string;
    couponCode: string;
    startDate: Date;
    endDate: Date;
    maxQuantity: number;
    maxQuantityPerCustomer: number;
    maxBudget: number;
    promotionCode: string;
    type: PromotionTypeEnum;
    ticketGroupCode: string;
    productDiscount?: ProductDiscountDto;
    productDiscountPercent?: ProductDiscountPercentDto;
    productGiveaway?: ProductGiveawayDto;
}
