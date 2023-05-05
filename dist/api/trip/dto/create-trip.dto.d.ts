import { ActiveStatusEnum } from './../../../enums';
export declare class CreateTripDto {
    code: string;
    name: string;
    note: string;
    startDate: Date;
    endDate: Date;
    fromStationId: string;
    toStationId: string;
    status: ActiveStatusEnum;
}
