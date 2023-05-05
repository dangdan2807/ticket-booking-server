import { ProvinceService } from './province.service';
import { Pagination } from './../../../decorator';
import { FilterProvinceDto, ProvinceDeleteMultiCode, SaveProvinceDto, UpdateProvinceDto, ProvinceDeleteMultiId } from './dto';
export declare class ProvinceController {
    private provinceService;
    constructor(provinceService: ProvinceService);
    findAll(dto: FilterProvinceDto, pagination?: Pagination): Promise<{
        dataResult: import("../../../database/entities").Province[];
        pagination: Pagination;
        total: number;
    }>;
    findOneById(id: string): Promise<import("../../../database/entities").Province>;
    findOneByCode(code: number): Promise<import("../../../database/entities").Province>;
    create(dto: SaveProvinceDto, user: any): Promise<import("../../../database/entities").Province>;
    updateById(id: string, dto: UpdateProvinceDto, user: any): Promise<import("../../../database/entities").Province>;
    updateByCode(code: number, dto: UpdateProvinceDto, user: any): Promise<import("../../../database/entities").Province>;
    deleteByCode(code: number, user: any): Promise<import("../../../database/entities").Province>;
    deleteById(id: string, user: any): Promise<import("../../../database/entities").Province>;
    deleteMultipleId(user: any, dto: ProvinceDeleteMultiId): Promise<import("../../../database/entities").Province[]>;
    deleteMultipleCode(user: any, dto: ProvinceDeleteMultiCode): Promise<import("../../../database/entities").Province[]>;
}
