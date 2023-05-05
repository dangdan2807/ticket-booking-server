import { CustomerGroupDetail } from 'src/database/entities';
import { DataSource, Repository } from 'typeorm';
export declare class CustomerGroupDetailService {
    private readonly customerGroupDetailRepository;
    private dataSource;
    constructor(customerGroupDetailRepository: Repository<CustomerGroupDetail>, dataSource: DataSource);
    saveCustomerGroupDetail(customerGroupId: string, customerId: string, adminId: string): Promise<CustomerGroupDetail>;
}
