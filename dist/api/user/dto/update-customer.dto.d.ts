import { GenderEnum } from '../../../enums';
export declare class UpdateCustomerDto {
    fullName?: string;
    email?: string;
    gender?: GenderEnum;
    address?: string;
    birthDate?: Date;
    wardId?: number;
    wardCode?: number;
    otp: string;
}
