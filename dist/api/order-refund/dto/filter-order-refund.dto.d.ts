import { OrderRefundStatusEnum, SortEnum } from './../../../enums';
export declare class FilterOrderRefundDto {
    keywords: string;
    customerCode: string;
    staffCode: string;
    status: OrderRefundStatusEnum;
    minTotal: number;
    maxTotal: number;
    startDate: Date;
    endDate: Date;
    sort: SortEnum;
}
