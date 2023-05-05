import { AdminService } from './../admin/admin.service';
import { CustomerGroup } from './../../database/entities';
import { Repository } from 'typeorm';
import { SaveCustomerGroupDto, FilterCustomerGroupDto, UpdateCustomerGroupDto, DeleteMultiCustomerGroupDto, FilterCustomerDto } from './dto';
import { Pagination } from './../../decorator';
import { CustomerService } from '../customer/customer.service';
export declare class CustomerGroupService {
    private readonly customerGroupRepository;
    private readonly adminService;
    private readonly customerService;
    constructor(customerGroupRepository: Repository<CustomerGroup>, adminService: AdminService, customerService: CustomerService);
    findOneCustomerGroup(options: any): Promise<CustomerGroup>;
    findCustomerGroupByCode(code: string, options?: any): Promise<CustomerGroup>;
    findCustomerGroupById(id: string, options?: any): Promise<CustomerGroup>;
    createCustomerGroup(dto: SaveCustomerGroupDto, adminId: string): Promise<CustomerGroup>;
    getCustomerGroupById(id: string, adminId: string, options?: any): Promise<CustomerGroup>;
    getCustomerGroupByCode(code: string, adminId: string, options?: any): Promise<CustomerGroup>;
    findAllCustomerGroup(dto: FilterCustomerGroupDto, adminId: string, pagination?: Pagination): Promise<{
        dataResult: CustomerGroup[];
        total: number;
        pagination: Pagination;
    }>;
    updateCustomerGroupById(adminId: string, id: string, dto: UpdateCustomerGroupDto): Promise<CustomerGroup>;
    updateCustomerGroupByCode(adminId: string, code: string, dto: UpdateCustomerGroupDto): Promise<CustomerGroup>;
    deleteCustomerGroupById(adminId: string, id: string): Promise<{
        id: string;
        message: string;
    }>;
    deleteCustomerGroupByCode(adminId: string, code: string): Promise<{
        id: string;
        message: string;
    }>;
    deleteMultipleCustomerGroupByIds(adminId: string, dto: DeleteMultiCustomerGroupDto): Promise<void[]>;
    deleteMultipleCustomerGroupByCodes(adminId: string, dto: DeleteMultiCustomerGroupDto): Promise<void[]>;
    getCustomersByGroupId(groupId: string, adminId: string, dto: FilterCustomerDto, pagination?: Pagination): Promise<{
        dataResult: CustomerGroup;
        pagination: Pagination;
        total: number;
    }>;
}
