import { SortEnum } from './../../../enums';
export declare class FilterTripDetailDto {
    minDepartureTime: Date;
    departureTime: Date;
    maxDepartureTime: Date;
    status: string;
    tripId: string;
    tripCode: string;
    fromProvinceCode: number;
    toProvinceCode: number;
    sort: SortEnum;
}
