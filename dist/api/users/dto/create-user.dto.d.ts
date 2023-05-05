import { UserStatusEnum } from './../../../enums';
export declare class CreateUserDto {
    name: string;
    password: string;
    birthDay?: Date;
    phone: string;
    email: string;
    address?: string;
    status?: UserStatusEnum;
}
