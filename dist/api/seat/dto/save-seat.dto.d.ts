import { SeatTypeEnum } from './../../../enums/seat-type.enum';
export declare class SaveSeatDto {
    name: string;
    type: SeatTypeEnum;
    floor: number;
    vehicleId: string;
}
