import { CustomerService } from '../../api/customer/customer.service';
import { Customer } from '../../database/entities';
import { DataSource, Repository } from 'typeorm';
import { AuthService } from '../auth.service';
import { CustomerLoginDto, CustomerRegisterDto } from './dto';
export declare class AuthCustomerService {
    private userRepository;
    private authService;
    private customerService;
    private dataSource;
    constructor(userRepository: Repository<Customer>, authService: AuthService, customerService: CustomerService, dataSource: DataSource);
    updateUserCredentialByUserId(userId: string, data: any): Promise<import("typeorm").UpdateResult>;
    register(dto: CustomerRegisterDto): Promise<any>;
    profile(id: string): Promise<Customer>;
    login(dto: CustomerLoginDto): Promise<any>;
    logout(userId: any): Promise<import("typeorm").UpdateResult>;
    refreshTokens(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
