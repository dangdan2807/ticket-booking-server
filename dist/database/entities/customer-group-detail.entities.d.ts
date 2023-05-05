import { CustomerGroup, Customer } from '.';
export declare class CustomerGroupDetail {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    customer: Customer;
    customerGroup: CustomerGroup;
}
