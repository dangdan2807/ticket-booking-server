import { GenderEnum } from '../../../enums';
export declare class CustomerRegisterDto {
    email?: string;
    phone: string;
    password: string;
    fullName: string;
    birthday?: Date;
    gender?: GenderEnum;
    address: string;
    wardCode?: number;
    isOtp: boolean;
}
