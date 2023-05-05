import { VehicleTypeEnum } from './../../../enums';
import { SortEnum } from './../../../enums/sort.enum';
export declare class FilterPriceDetailDto {
    maxPrice: number;
    minPrice: number;
    keywords: string;
    priceListCode: string;
    seatType: VehicleTypeEnum;
    sort: SortEnum;
}
