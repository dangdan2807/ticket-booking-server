import { AdminService } from './../../admin/admin.service';
import { DeleteDtoTypeEnum } from './../../../enums';
import { District } from './../../../database/entities';
import { Pagination } from './../../../decorator';
import { DataSource, Repository } from 'typeorm';
import { UpdateDistrictDto, FilterDistrictDto, SaveDistrictDto, DistrictDeleteMultiByIdsOrCodes } from './dto';
export declare class DistrictService {
    private readonly districtRepository;
    private readonly adminService;
    private dataSource;
    constructor(districtRepository: Repository<District>, adminService: AdminService, dataSource: DataSource);
    findOneDistrict(options: any): Promise<District>;
    findOneById(id: string, options?: any): Promise<District>;
    findOneByCode(code: number, options?: any): Promise<District>;
    findByProvinceCode(provinceCode: number, pagination?: Pagination): Promise<{
        dataResult: District[];
        pagination: Pagination;
        total: number;
    }>;
    findAll(dto: FilterDistrictDto, pagination?: Pagination): Promise<{
        dataResult: District[];
        pagination: Pagination;
        total: number;
    }>;
    createDistrict(dto: SaveDistrictDto, userId: string): Promise<District>;
    updateByIdOrCode(dto: UpdateDistrictDto, userId: string, id?: string, code?: number): Promise<any>;
    deleteByIdOrCode(userId: string, id?: string, code?: number): Promise<any>;
    deleteMultipleDistrictByIdsOrCodes(userId: string, dto: DistrictDeleteMultiByIdsOrCodes, type: DeleteDtoTypeEnum): Promise<({
        id: string;
        code: string;
        message: string;
    } | {
        id: string;
        code: number;
        message: string;
    })[]>;
}
