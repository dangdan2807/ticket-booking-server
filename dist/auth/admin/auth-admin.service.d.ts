import { Staff } from '../../database/entities';
import { DataSource, Repository } from 'typeorm';
import { AuthService } from '../auth.service';
import { AdminLoginDto, AdminRegisterDto } from './dto';
import { SendOtpDto } from '../customer/dto';
import { AdminService } from './../../api/admin/admin.service';
export declare class AuthAdminService {
    private readonly staffRepository;
    private readonly authService;
    private readonly adminService;
    private readonly dataSource;
    private configService;
    constructor(staffRepository: Repository<Staff>, authService: AuthService, adminService: AdminService, dataSource: DataSource);
    updateStaffByAdminId(staffId: string, data: any): Promise<import("typeorm").UpdateResult>;
    register(userId: string, dto: AdminRegisterDto): Promise<any>;
    login(dto: AdminLoginDto): Promise<any>;
    logout(staffId: any): Promise<import("typeorm").UpdateResult>;
    refreshToken(refreshToken: string): Promise<{
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
