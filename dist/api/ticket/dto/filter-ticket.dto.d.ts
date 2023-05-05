import { SortEnum } from './../../../enums';
export declare class FilterTicketDto {
    keywords?: string;
    startDate?: Date;
    endDate?: Date;
    sort: SortEnum;
}
