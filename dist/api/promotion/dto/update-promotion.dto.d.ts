import { PromotionStatusEnum } from '../../../enums';
export declare class UpdatePromotionDto {
    name: string;
    description: string;
    note: string;
    image: string;
    startDate: Date;
    endDate: Date;
    status: PromotionStatusEnum;
}
