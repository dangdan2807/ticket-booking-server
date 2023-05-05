import { SortEnum, ActiveStatusEnum } from './../../../enums';
export declare class FilterTripDto {
    keywords: string;
    startDate: Date;
    endDate: Date;
    status: ActiveStatusEnum;
    sort: SortEnum;
    fromStationId: string;
    toStationId: string;
    fromStationCode: string;
    toStationCode: string;
}
