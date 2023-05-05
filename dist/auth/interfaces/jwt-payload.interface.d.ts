import { RoleEnum } from './../../enums';
export interface JwtPayload {
    id: string;
    email: string;
    type: RoleEnum;
}
