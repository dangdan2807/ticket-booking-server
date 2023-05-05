import { AdminService } from './admin.service';
import { AdminResetPasswordDto, AdminUpdatePasswordDto } from './dto';
import { ConfirmAccountDto } from '../user/dto';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    profile(user: any): Promise<import("../../database/entities").Staff>;
    updatePassword(user: any, dto: AdminUpdatePasswordDto): Promise<import("typeorm").UpdateResult>;
    updateResetPassword(user: any, dto: AdminResetPasswordDto): Promise<import("../../database/entities").Staff>;
    confirmAccount(dto: ConfirmAccountDto): Promise<{
        customer: {
            id: string;
        };
        message: string;
    }>;
}
