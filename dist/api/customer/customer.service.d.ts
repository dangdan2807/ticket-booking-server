import { ActiveOtpTypeEnum } from './../../enums';
import { Pagination } from '../../decorator';
import { Customer } from '../../database/entities';
import { DataSource, Repository } from 'typeorm';
import { CreateCustomerForAdminDto, FilterCustomerDto, UpdateCustomerForAdminDto, OrderCustomerSearch } from './dto';
import { UpdateCustomerDto, UserUpdatePasswordDto } from '../user/dto';
import { AddCustomerDto, RemoveCustomerDto } from '../customer-group/dto';
export declare class CustomerService {
    private readonly customerRepository;
    private readonly dataSource;
    constructor(customerRepository: Repository<Customer>, dataSource: DataSource);
    private selectFieldsWithQ;
    private selectFieldsAddress;
    private checkOTP;
    getCustomerStatus(): Promise<any[]>;
    findOneCustomer(options: any): Promise<Customer>;
    findOneByEmail(email: string, options?: any): Promise<Customer>;
    findOneByPhone(phone: string, options?: any): Promise<Customer>;
    findOneById(id: string, options?: any): Promise<Customer>;
    findOneByCode(code: string, options?: any): Promise<Customer>;
    findCustomerByRefreshToken(refreshToken: string, options?: any): Promise<Customer>;
    findAll(dto: FilterCustomerDto, pagination: Pagination): Promise<{
        dataResult: Customer[];
        pagination: Pagination;
        total: number;
    }>;
    getCustomerByEmail(email: string, options?: any): Promise<Customer>;
    getCustomerById(id: string, options?: any): Promise<Customer>;
    updatePassword(id: string, dto: UserUpdatePasswordDto): Promise<import("typeorm").UpdateResult>;
    updateCustomer(id: string, dto: UpdateCustomerDto, userId?: string, adminId?: string): Promise<Customer>;
    updateOtp(id: string, otpCode: string, otpExpired: Date, otpType?: ActiveOtpTypeEnum): Promise<Customer>;
    updateActive(id: string): Promise<Customer>;
    createCustomerForAdmin(userId: string, dto: CreateCustomerForAdminDto): Promise<Customer>;
    updateCustomerForAdmin(id: string, dto: UpdateCustomerForAdminDto, userId: string): Promise<Customer>;
    addCustomerToCustomerGroup(dto: AddCustomerDto, adminId: string): Promise<{
        customer: {
            id: string;
        };
        customerGroup: {
            id: string;
        };
        message: string;
    }>;
    removeCustomerFromCustomerGroup(dto: RemoveCustomerDto, adminId: string): Promise<{
        customer: {
            id: string;
        };
        customerGroup: {
            id: string;
        };
        message: string;
    }>;
    deleteCustomerById(adminId: string, id: string): Promise<{
        id: string;
        message: string;
    }>;
    searchCustomerForOrder(dto: OrderCustomerSearch): Promise<{
        dataResult: Customer[];
    }>;
}
