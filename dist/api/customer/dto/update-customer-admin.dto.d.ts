import { UserStatusEnum } from './../../../enums';
import { GenderEnum } from '../../../enums/gender.enum';
export declare class UpdateCustomerForAdminDto {
    fullName: string;
    wardCode?: number;
    address: string;
    birthday?: Date;
    gender?: GenderEnum;
    note?: string;
    customerGroupId?: string;
    customerGroupCode?: string;
    status: UserStatusEnum;
}
