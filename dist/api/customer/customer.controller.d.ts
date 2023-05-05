import { Pagination } from '../../decorator';
import { FilterCustomerDto, CreateCustomerForAdminDto, UpdateCustomerForAdminDto } from './dto';
import { CustomerService } from './customer.service';
import { AddCustomerDto, RemoveCustomerDto } from '../customer-group/dto';
import { OrderCustomerSearch } from './dto/search-customer.dto';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    create(user: any, dto: CreateCustomerForAdminDto): Promise<import("../../database/entities").Customer>;
    getCustomerStatus(): Promise<any[]>;
    findAll(dto: FilterCustomerDto, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").Customer[];
        pagination: Pagination;
        total: number;
    }>;
    updateUser(user: any, id: string, dto: UpdateCustomerForAdminDto): Promise<import("../../database/entities").Customer>;
    findCustomerOneById(id: string): Promise<import("../../database/entities").Customer>;
    delete(user: any, id: string): Promise<{
        id: string;
        message: string;
    }>;
    addCustomer(user: any, dto: AddCustomerDto): Promise<{
        customer: {
            id: string;
        };
        customerGroup: {
            id: string;
        };
        message: string;
    }>;
    removeCustomer(dto: RemoveCustomerDto, user: any): Promise<{
        customer: {
            id: string;
        };
        customerGroup: {
            id: string;
        };
        message: string;
    }>;
    getCustomer(dto: OrderCustomerSearch): Promise<{
        dataResult: import("../../database/entities").Customer[];
    }>;
}
