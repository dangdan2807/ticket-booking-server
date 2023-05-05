import { PromotionStatusEnum, SortEnum } from '../../../enums';
export declare class FilterPromotionDto {
    keywords: string;
    startDate: Date;
    endDate: Date;
    status: PromotionStatusEnum;
    sort: SortEnum;
}
