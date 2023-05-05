import { ActiveStatusEnum } from '../../../enums';
export declare class UpdateTripDto {
    name: string;
    note: string;
    startDate: Date;
    endDate: Date;
    fromStationId: string;
    toStationId: string;
    status: ActiveStatusEnum;
}
