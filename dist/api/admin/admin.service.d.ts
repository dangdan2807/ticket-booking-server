import { ActiveOtpTypeEnum } from './../../enums';
import { AuthService } from './../../auth/auth.service';
import { Staff } from './../../database/entities';
import { Repository } from 'typeorm';
import { AdminResetPasswordDto, AdminUpdatePasswordDto } from './dto';
import { ConfirmAccountDto } from '../user/dto';
export declare class AdminService {
    private readonly adminRepository;
    private authService;
    constructor(adminRepository: Repository<Staff>, authService: AuthService);
    private checkOTP;
    findOneAdmin(options?: any): Promise<Staff>;
    findOneById(id: string, options?: any): Promise<Staff>;
    findOneByPhone(phone: string, options?: any): Promise<Staff>;
    findOneByEmail(email: string, options?: any): Promise<Staff>;
    findOneByRefreshToken(refreshToken: string, options?: any): Promise<Staff>;
    getAdminById(id: string, options?: any): Promise<Staff>;
    profile(adminId: string): Promise<Staff>;
    updatePassword(id: string, dto: AdminUpdatePasswordDto): Promise<import("typeorm").UpdateResult>;
    updateOtp(id: string, otpCode: string, otpExpired: Date, otpType?: ActiveOtpTypeEnum): Promise<Staff>;
    updateActive(id: string): Promise<Staff>;
    confirmAccount(dto: ConfirmAccountDto): Promise<{
        customer: {
            id: string;
        };
        message: string;
    }>;
    resetPassword(dto: AdminResetPasswordDto): Promise<Staff>;
}
