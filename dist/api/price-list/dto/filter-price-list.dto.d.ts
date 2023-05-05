import { ActiveStatusEnum, SortEnum } from './../../../enums';
export declare class FilterPriceListDto {
    keywords: string;
    startDate: Date;
    endDate: Date;
    status: ActiveStatusEnum;
    sort: SortEnum;
}
