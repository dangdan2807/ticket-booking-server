import { Pagination } from './../../decorator';
import { StationService } from './station.service';
import { FilterStationDto, SaveStationDto, DeleteStationByIdsDto, UpdateStationDto, DeleteStationByCodesDto } from './dto';
import { Response } from 'express';
export declare class StationController {
    private stationService;
    constructor(stationService: StationService);
    createNewStation(dto: SaveStationDto, user: any): Promise<import("../../database/entities").Station>;
    getStationById(id: string): Promise<import("../../database/entities").Station>;
    getStationByCode(code: string): Promise<import("../../database/entities").Station>;
    findAll(dto: FilterStationDto, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").Station[];
        pagination: Pagination;
        total: number;
    }>;
    updateStationById(user: any, id: string, dto: UpdateStationDto): Promise<import("../../database/entities").Station>;
    updateStationByCode(user: any, code: string, dto: UpdateStationDto): Promise<import("../../database/entities").Station>;
    deleteStationById(user: any, id: string): Promise<import("../../database/entities").Station>;
    deleteStationByCode(user: any, code: string): Promise<import("../../database/entities").Station>;
    deleteMultipleStationByIds(user: any, dto: DeleteStationByIdsDto): Promise<void[]>;
    deleteMultipleStationByCodes(user: any, dto: DeleteStationByCodesDto): Promise<void[]>;
    export(dto: FilterStationDto, res: Response): Promise<void>;
}
