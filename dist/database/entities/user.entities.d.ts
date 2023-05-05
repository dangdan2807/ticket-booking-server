import { GenderEnum } from './../../enums/gender.enum';
import { BaseEntity } from './base-entity.entities';
export declare class User extends BaseEntity {
    constructor();
    phone?: string;
    fullName?: string;
    email?: string;
    password?: string;
    birthDay?: Date;
    lastLogin?: Date;
    isActive?: boolean;
    gender?: GenderEnum;
    address?: string;
    note?: string;
    refreshToken?: string;
    accessToken?: string;
}
