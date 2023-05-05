import { OrderStatusEnum } from './../../../enums';
export declare class CreateOrderDto {
    note: string;
    status: OrderStatusEnum;
    seatIds: string[];
    seatCodes: string[];
    tripDetailId: string;
}
