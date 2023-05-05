import { CustomerGroupService } from './customer-group.service';
import { SaveCustomerGroupDto, FilterCustomerGroupDto, DeleteMultiCustomerGroupDto, UpdateCustomerGroupDto, FilterCustomerDto } from './dto';
import { Pagination } from './../../decorator';
export declare class CustomerGroupController {
    private customGroupService;
    constructor(customGroupService: CustomerGroupService);
    createCustomerGroup(dto: SaveCustomerGroupDto, user: any): Promise<import("../../database/entities").CustomerGroup>;
    findAllCustomerGroup(dto: FilterCustomerGroupDto, user: any, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").CustomerGroup[];
        total: number;
        pagination: Pagination;
    }>;
    getCustomerGroupById(id: string, user: any): Promise<import("../../database/entities").CustomerGroup>;
    getCustomerGroupByCode(code: string, user: any): Promise<import("../../database/entities").CustomerGroup>;
    updateCustomerGroupById(user: any, id: string, dto: UpdateCustomerGroupDto): Promise<import("../../database/entities").CustomerGroup>;
    updateCustomerGroupByCode(user: any, code: string, dto: UpdateCustomerGroupDto): Promise<import("../../database/entities").CustomerGroup>;
    deleteCustomerGroupById(user: any, id: string): Promise<{
        id: string;
        message: string;
    }>;
    deleteCustomerGroupByCode(user: any, code: string): Promise<{
        id: string;
        message: string;
    }>;
    deleteMultipleCustomerGroupByIds(user: any, dto: DeleteMultiCustomerGroupDto): Promise<void[]>;
    deleteMultipleCustomerGroupByCodes(user: any, dto: DeleteMultiCustomerGroupDto): Promise<void[]>;
    getCustomersByGroupId(id: string, dto: FilterCustomerDto, user: any, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").CustomerGroup;
        pagination: Pagination;
        total: number;
    }>;
}
