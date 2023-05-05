import { VehicleTypeEnum } from './../../enums';
import { PriceList, OrderDetail, Trip } from '.';
export declare class PriceDetail {
    id: string;
    code: string;
    price: number;
    seatType: VehicleTypeEnum;
    note: string;
    priceListCode: string;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    priceList: PriceList;
    orderDetails: OrderDetail[];
    trip: Trip;
}
