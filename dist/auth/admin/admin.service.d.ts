import { Staff } from './../../database/entities';
import { DataSource, Repository } from 'typeorm';
import { AuthService } from '../auth.service';
import { AdminLoginDto, AdminRegisterDto } from './dto';
export declare class AuthAdminService {
    private staffRepository;
    private authService;
    private dataSource;
    constructor(staffRepository: Repository<Staff>, authService: AuthService, dataSource: DataSource);
    findOneById(id: string, options?: any): Promise<Staff>;
    findOneByRefreshToken(refreshToken: string, options?: any): Promise<Staff>;
    findOneByEmail(email: string, options?: any): Promise<Staff>;
    updateStaffByAdminId(staffId: string, data: any): Promise<import("typeorm").UpdateResult>;
    register(userId: string, dto: AdminRegisterDto): Promise<any>;
    profile(id: string): Promise<Staff>;
    login(dto: AdminLoginDto): Promise<any>;
    logout(staffId: any): Promise<import("typeorm").UpdateResult>;
    refreshToken(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
