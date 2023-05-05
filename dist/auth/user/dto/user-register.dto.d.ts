import { GenderEnum } from './../../../enums';
export declare class UserRegisterDto {
    email: string;
    password: string;
    name: string;
    birthday?: Date;
    phone?: string;
    gender: GenderEnum.NONE;
}
