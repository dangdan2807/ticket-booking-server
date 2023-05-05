import { OrderStatusEnum, SortEnum } from '../../../enums';
export declare class FilterBillHistoryDto {
    keywords: string;
    status: OrderStatusEnum;
    startDate: Date;
    endDate: Date;
    sort: SortEnum;
}
