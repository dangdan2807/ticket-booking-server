import { ActiveStatusEnum } from '../../../enums/active-status.enum';
export declare class UpdatePriceListDto {
    name: string;
    startDate: Date;
    endDate: Date;
    note: string;
    status: ActiveStatusEnum;
}
