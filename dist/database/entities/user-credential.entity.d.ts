import { User } from './user.entities';
export declare class UserCredential {
    id: string;
    refresh_token: string;
    access_token: string;
    password: string;
    user: User;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
