import { DistrictService } from './district.service';
import { Pagination } from './../../../decorator';
import { SaveDistrictDto, UpdateDistrictDto, FilterDistrictDto, DistrictDeleteMultiByIdsOrCodes } from './dto';
export declare class DistrictController {
    private districtService;
    constructor(districtService: DistrictService);
    findAll(dto: FilterDistrictDto, pagination?: Pagination): Promise<{
        dataResult: import("../../../database/entities").District[];
        pagination: Pagination;
        total: number;
    }>;
    findOneById(id: string): Promise<import("../../../database/entities").District>;
    findOneByCode(code: number): Promise<import("../../../database/entities").District>;
    findByProvinceCode(provinceCode: number, pagination?: Pagination): Promise<{
        dataResult: import("../../../database/entities").District[];
        pagination: Pagination;
        total: number;
    }>;
    create(dto: SaveDistrictDto, user: any): Promise<import("../../../database/entities").District>;
    updateById(id: string, dto: UpdateDistrictDto, user: any): Promise<any>;
    updateByCode(code: number, dto: UpdateDistrictDto, user: any): Promise<any>;
    hiddenByCode(code: number, user: any): Promise<any>;
    hiddenById(id: string, user: any): Promise<any>;
    deleteMultipleId(user: any, dto: DistrictDeleteMultiByIdsOrCodes): Promise<({
        id: string;
        code: string;
        message: string;
    } | {
        id: string;
        code: number;
        message: string;
    })[]>;
    deleteMultipleCode(user: any, dto: DistrictDeleteMultiByIdsOrCodes): Promise<({
        id: string;
        code: string;
        message: string;
    } | {
        id: string;
        code: number;
        message: string;
    })[]>;
}
