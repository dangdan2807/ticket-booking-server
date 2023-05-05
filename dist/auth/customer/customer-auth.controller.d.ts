import { CustomerRegisterDto } from './dto/create-customer.dto';
import { CustomerLoginDto, CustomerRefreshTokenDto } from './dto';
import { AuthCustomerService } from './customer-auth.service';
export declare class AuthCustomerController {
    private userService;
    constructor(userService: AuthCustomerService);
    register(dto: CustomerRegisterDto): Promise<any>;
    login(dto: CustomerLoginDto): Promise<any>;
    logout(user: any): Promise<import("typeorm").UpdateResult>;
    refreshTokens(dto: CustomerRefreshTokenDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
