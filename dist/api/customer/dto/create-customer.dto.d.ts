import { GenderEnum } from '../../../enums/gender.enum';
export declare class CreateCustomerForAdminDto {
    email?: string;
    phone: string;
    fullName: string;
    wardCode?: number;
    address: string;
    birthday?: Date;
    gender?: GenderEnum;
    customerGroupId: string;
    customerGroupCode: string;
}
