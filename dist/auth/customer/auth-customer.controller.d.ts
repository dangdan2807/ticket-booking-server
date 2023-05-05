import { CustomerRegisterDto } from './dto/create-customer.dto';
import { CustomerLoginDto, CustomerRefreshTokenDto, SendOtpDto } from './dto';
import { AuthCustomerService } from './auth-customer.service';
export declare class AuthCustomerController {
    private authCustomerService;
    constructor(authCustomerService: AuthCustomerService);
    register(dto: CustomerRegisterDto): Promise<any>;
    login(dto: CustomerLoginDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(user: any): Promise<import("typeorm").UpdateResult>;
    refreshTokens(dto: CustomerRefreshTokenDto): Promise<{
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
