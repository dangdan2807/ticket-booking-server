import { TripStatusEnum } from '../../../enums/trip-status.enum';
export declare class SaveTripDto {
    name: string;
    note: string;
    startDate: Date;
    endDate: Date;
    fromStationId: string;
    toStationId: string;
    isActive: TripStatusEnum;
}
