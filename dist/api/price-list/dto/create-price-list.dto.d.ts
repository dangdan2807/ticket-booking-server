import { ActiveStatusEnum } from './../../../enums/active-status.enum';
export declare class CreatePriceListDto {
    code: string;
    name: string;
    startDate: Date;
    endDate: Date;
    note: string;
    status: ActiveStatusEnum;
}
