import { Pagination } from './../../decorator';
import { Customer } from './../../database/entities';
import { DataSource, Repository } from 'typeorm';
import { FilterUserDto } from './dto';
export declare class UsersService {
    private readonly customerRepository;
    private dataSource;
    constructor(customerRepository: Repository<Customer>, dataSource: DataSource);
    findOneById(userId: string, options?: any): Promise<Customer>;
    findAll(dto: FilterUserDto, pagination: Pagination): Promise<{
        dataResult: Customer[];
        pagination: Pagination;
        total: number;
    }>;
    findOne(id: string): Promise<Customer>;
}
