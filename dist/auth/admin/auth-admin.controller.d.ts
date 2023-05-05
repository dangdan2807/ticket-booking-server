import { AuthAdminService } from './auth-admin.service';
import { AdminLoginDto, AdminRegisterDto, AdminRefreshTokenDto } from './dto';
import { SendOtpDto } from '../customer/dto';
export declare class AuthAdminController {
    private adminService;
    constructor(adminService: AuthAdminService);
    register(user: any, dto: AdminRegisterDto): Promise<any>;
    login(dto: AdminLoginDto): Promise<any>;
    logout(user: any): Promise<import("typeorm").UpdateResult>;
    refreshToken(dto: AdminRefreshTokenDto): Promise<{
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
