import { Staff } from '../../database/entities/staff.entities';
import { DataSource, Repository } from 'typeorm';
import { AuthService } from '../auth.service';
import { StaffLoginDto, StaffRegisterDto } from './dto';
export declare class StaffService {
    private staffRepository;
    private authService;
    private dataSource;
    constructor(staffRepository: Repository<Staff>, authService: AuthService, dataSource: DataSource);
    findOneById(id: string, options?: any): Promise<Staff>;
    findOneByUsername(username: string, options?: any): Promise<Staff>;
    updateAdminCredentialByAdminId(staffId: string, data: any): Promise<void>;
    register(userId: string, dto: StaffRegisterDto): Promise<any>;
    profile(id: string): Promise<Staff>;
    login(dto: StaffLoginDto): Promise<any>;
    logout(adminId: any): Promise<void>;
    refreshTokens(adminId: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
