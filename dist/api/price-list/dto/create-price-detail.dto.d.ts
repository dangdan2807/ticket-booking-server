import { VehicleTypeEnum } from './../../../enums';
export declare class CreatePriceDetailDto {
    code: string;
    price: number;
    note: string;
    seatType: VehicleTypeEnum;
    priceListId: string;
    priceListCode: string;
    tripCode: string;
}
