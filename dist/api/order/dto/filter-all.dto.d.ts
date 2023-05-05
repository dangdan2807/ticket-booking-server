import { OrderStatusEnum, SortEnum } from '../../../enums';
export declare class FilterAllDto {
    keywords: string;
    status: OrderStatusEnum[];
    minFinalTotal: number;
    maxFinalTotal: number;
    startDate: Date;
    endDate: Date;
    sort: SortEnum;
}
