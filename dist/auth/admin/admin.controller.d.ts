import { AdminRefreshTokenDto } from './dto/admin-refresh-token.dto';
import { AuthAdminService } from './admin.service';
import { AdminLoginDto, AdminRegisterDto } from './dto';
export declare class AuthAdminController {
    private adminService;
    constructor(adminService: AuthAdminService);
    register(user: any, dto: AdminRegisterDto): Promise<any>;
    login(dto: AdminLoginDto): Promise<any>;
    profile(user: any): Promise<import("../../database/entities").Staff>;
    logout(user: any): Promise<import("typeorm").UpdateResult>;
    refreshToken(dto: AdminRefreshTokenDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
