import { TripStatusEnum } from '../../../enums/trip-status.enum';
export declare class SaveTripDto {
    code: string;
    name: string;
    note: string;
    startDate: Date;
    endDate: Date;
    fromStationId: string;
    toStationId: string;
    isActive: TripStatusEnum;
}
