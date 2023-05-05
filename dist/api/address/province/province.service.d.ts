import { AdminService } from './../../admin/admin.service';
import { Province } from './../../../database/entities';
import { Pagination } from './../../../decorator';
import { Repository } from 'typeorm';
import { FilterProvinceDto, ProvinceDeleteMultiCode, ProvinceDeleteMultiId, SaveProvinceDto, UpdateProvinceDto } from './dto';
export declare class ProvinceService {
    private readonly provinceRepository;
    private readonly adminService;
    constructor(provinceRepository: Repository<Province>, adminService: AdminService);
    findOneProvince(options: any): Promise<Province>;
    findOneById(id: string, options?: any): Promise<Province>;
    findOneByCode(code: number, options?: any): Promise<Province>;
    findAll(dto: FilterProvinceDto, pagination?: Pagination): Promise<{
        dataResult: Province[];
        pagination: Pagination;
        total: number;
    }>;
    createProvince(dto: SaveProvinceDto, userId: string): Promise<Province>;
    updateById(id: string, dto: UpdateProvinceDto, userId: string): Promise<Province>;
    updateByCode(code: number, dto: UpdateProvinceDto, userId: string): Promise<Province>;
    deleteById(id: string, userId: string): Promise<Province>;
    deleteByCode(code: number, userId: string): Promise<Province>;
    deleteMultipleProvinceById(userId: string, dto: ProvinceDeleteMultiId): Promise<Province[]>;
    deleteMultipleProvinceByCode(userId: string, dto: ProvinceDeleteMultiCode): Promise<Province[]>;
}
