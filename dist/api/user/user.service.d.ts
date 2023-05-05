import { Customer } from './../../database/entities';
import { AuthService } from './../../auth/auth.service';
import { CustomerService } from '../customer/customer.service';
import { Repository } from 'typeorm';
import { ConfirmAccountDto, UpdateCustomerDto, UserResetPasswordDto, UserUpdatePasswordDto } from './dto';
export declare class UserService {
    private readonly customerRepository;
    private customerService;
    private authService;
    constructor(customerRepository: Repository<Customer>, customerService: CustomerService, authService: AuthService);
    getCustomerStatus(): Promise<any[]>;
    profile(id: string): Promise<Customer>;
    updatePassword(id: string, dto: UserUpdatePasswordDto): Promise<Customer>;
    updateCustomer(id: string, dto: UpdateCustomerDto, userId: string): Promise<Customer>;
    resetPassword(dto: UserResetPasswordDto): Promise<Customer>;
    confirmAccount(dto: ConfirmAccountDto): Promise<{
        customer: {
            id: string;
        };
        message: string;
    }>;
    private checkOTP;
}
