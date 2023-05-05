import { WardService } from './ward.service';
import { DataSource } from 'typeorm';
import { Pagination } from './../../../decorator';
import { UpdateWardDto, FilterWardDto, SaveWardDto, WardDeleteMultiId, WardDeleteMultiCode } from './dto';
export declare class WardController {
    private wardService;
    private dataSource;
    constructor(wardService: WardService, dataSource: DataSource);
    findAll(dto: FilterWardDto, pagination?: Pagination): Promise<{
        dataResult: import("../../../database/entities").Ward[];
        pagination: Pagination;
        total: number;
    }>;
    findOneById(id: number): Promise<import("../../../database/entities").Ward>;
    findOneByCode(code: number): Promise<import("../../../database/entities").Ward>;
    findByDistrictCode(districtCode: number, pagination?: Pagination): Promise<{
        dataResult: import("../../../database/entities").Ward[];
        pagination: Pagination;
        total: number;
    }>;
    create(dto: SaveWardDto, user: any): Promise<import("../../../database/entities").Ward>;
    updateById(id: number, dto: UpdateWardDto, user: any): Promise<import("../../../database/entities").Ward>;
    updateByCode(code: number, dto: UpdateWardDto, user: any): Promise<import("../../../database/entities").Ward>;
    deleteByCode(code: number, user: any): Promise<import("../../../database/entities").Ward>;
    deleteById(id: number, user: any): Promise<import("../../../database/entities").Ward>;
    deleteMultipleId(user: any, dto: WardDeleteMultiId): Promise<import("../../../database/entities").Ward[]>;
    deleteMultipleCode(user: any, dto: WardDeleteMultiCode): Promise<import("../../../database/entities").Ward[]>;
}
