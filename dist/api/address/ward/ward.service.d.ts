import { AdminService } from './../../admin/admin.service';
import { Ward } from './../../../database/entities';
import { DataSource, Repository } from 'typeorm';
import { Pagination } from './../../../decorator';
import { SaveWardDto, FilterWardDto, UpdateWardDto, WardDeleteMultiId, WardDeleteMultiCode } from './dto';
export declare class WardService {
    private readonly wardRepository;
    private readonly adminService;
    private dataSource;
    constructor(wardRepository: Repository<Ward>, adminService: AdminService, dataSource: DataSource);
    findOneWard(options: any): Promise<Ward>;
    findOneById(id: number, options?: any): Promise<Ward>;
    findOneByCode(code: number, options?: any): Promise<Ward>;
    findByDistrictCode(districtCode: number, pagination?: Pagination): Promise<{
        dataResult: Ward[];
        pagination: Pagination;
        total: number;
    }>;
    getWardById(id: number): Promise<Ward>;
    getWardByCode(code: number): Promise<Ward>;
    findAll(dto: FilterWardDto, pagination?: Pagination): Promise<{
        dataResult: Ward[];
        pagination: Pagination;
        total: number;
    }>;
    createWard(dto: SaveWardDto, userId: string): Promise<Ward>;
    updateById(id: number, dto: UpdateWardDto, userId: string): Promise<Ward>;
    updateByCode(code: number, dto: UpdateWardDto, userId: string): Promise<Ward>;
    deleteById(id: number, userId: string): Promise<Ward>;
    deleteByCode(code: number, userId: string): Promise<Ward>;
    deleteMultipleWardById(userId: string, dto: WardDeleteMultiId): Promise<Ward[]>;
    deleteMultipleWardByCode(userId: string, dto: WardDeleteMultiCode): Promise<Ward[]>;
}
