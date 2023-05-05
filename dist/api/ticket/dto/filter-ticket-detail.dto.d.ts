import { SortEnum, TicketStatusEnum } from './../../../enums';
export declare class FilterTicketDetailDto {
    keywords?: string;
    status?: TicketStatusEnum;
    sort?: SortEnum;
    ticketCode?: string;
    tripDetailCode?: string;
}
