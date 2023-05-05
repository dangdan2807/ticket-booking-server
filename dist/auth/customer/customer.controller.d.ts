import { CustomerRegisterDto } from './dto/create-customer.dto';
import { CustomerLoginDto, CustomerRefreshTokenDto } from './dto';
import { AuthCustomerService } from './customer.service';
export declare class AuthCustomerController {
    private userService;
    constructor(userService: AuthCustomerService);
    register(dto: CustomerRegisterDto): Promise<any>;
    login(dto: CustomerLoginDto): Promise<any>;
    logout(user: any): Promise<any>;
    refreshTokens(dto: CustomerRefreshTokenDto): Promise<any>;
}
