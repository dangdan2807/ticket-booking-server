import { GenderEnum } from './../../../enums';
export declare class AdminRegisterDto {
    email: string;
    password: string;
    name: string;
    phone?: string;
    gender?: GenderEnum;
}
