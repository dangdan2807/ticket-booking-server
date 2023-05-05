import { GenderEnum } from './../../enums';
import { Order, OrderRefund, Ward } from '.';
export declare class Staff {
    id: string;
    password?: string;
    lastLogin?: Date;
    isActive?: boolean;
    code: string;
    phone?: string;
    email?: string;
    fullName?: string;
    gender?: GenderEnum;
    address?: string;
    note?: string;
    birthDay?: Date;
    isManage?: boolean;
    refreshToken?: string;
    accessToken?: string;
    otpCode: string;
    otpExpired: Date;
    noteStatus: string;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    ward: Ward;
    orders?: Order[];
    paymentHistories?: Order[];
    orderRefunds?: OrderRefund[];
}
