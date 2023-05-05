import { OrderStatusEnum, SortEnum } from './../../../enums';
export declare class FilterOrderDto {
    keywords: string;
    status: OrderStatusEnum;
    minFinalTotal: number;
    maxFinalTotal: number;
    startDate: Date;
    endDate: Date;
    sort: SortEnum;
}
