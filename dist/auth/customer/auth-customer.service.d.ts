import { CustomerService } from '../../api/customer/customer.service';
import { Customer } from '../../database/entities';
import { DataSource, Repository } from 'typeorm';
import { AuthService } from '../auth.service';
import { CustomerLoginDto, CustomerRegisterDto, SendOtpDto } from './dto';
export declare class AuthCustomerService {
    private userRepository;
    private authService;
    private customerService;
    private dataSource;
    private configService;
    constructor(userRepository: Repository<Customer>, authService: AuthService, customerService: CustomerService, dataSource: DataSource);
    updateUserCredentialByUserId(userId: string, data: any): Promise<import("typeorm").UpdateResult>;
    register(dto: CustomerRegisterDto): Promise<any>;
    login(dto: CustomerLoginDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(userId: any): Promise<import("typeorm").UpdateResult>;
    refreshTokens(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    sendOtp(dto: SendOtpDto): Promise<{
        customer: {
            id: string;
        };
        message: string;
    }>;
}
