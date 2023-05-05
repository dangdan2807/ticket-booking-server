import { CustomerRegisterDto } from './../../api/customer/dto/create-customer.dto';
import { CustomerLoginDto, UserRefreshTokenDto } from './dto';
import { AuthUserService } from './user.service';
export declare class AuthUserController {
    private userService;
    constructor(userService: AuthUserService);
    register(dto: CustomerRegisterDto): Promise<any>;
    login(dto: CustomerLoginDto): Promise<any>;
    logout(user: any): Promise<import("typeorm").UpdateResult>;
    refreshTokens(dto: UserRefreshTokenDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
