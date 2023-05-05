import { StaffService } from './staff.service';
import { StaffLoginDto, StaffRegisterDto } from './dto';
export declare class StaffController {
    private staffService;
    constructor(staffService: StaffService);
    register(user: any, dto: StaffRegisterDto): Promise<any>;
    profile(user: any): Promise<import("../../database/entities").Staff>;
    login(dto: StaffLoginDto): Promise<any>;
    logout(user: any): Promise<void>;
    refreshTokens(user: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
