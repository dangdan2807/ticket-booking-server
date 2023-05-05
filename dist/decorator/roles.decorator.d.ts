import { RoleEnum } from './../enums';
export declare const ROLES_KEY = "roles";
export declare const Role: (role: RoleEnum) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const Roles: (...roles: RoleEnum[]) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
