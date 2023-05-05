import { Customer } from '.';
export declare class CustomerGroup {
    id: string;
    name: string;
    code: string;
    description: string;
    note: string;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    customers?: Customer[];
}
