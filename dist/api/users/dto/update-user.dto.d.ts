import { UserStatusEnum, GenderEnum } from './../../../enums';
export declare class UpdateUserDto {
    name?: string;
    address?: string;
    birthDate?: Date;
    phone?: string;
    email: string;
    gender: GenderEnum;
    status?: UserStatusEnum;
}
