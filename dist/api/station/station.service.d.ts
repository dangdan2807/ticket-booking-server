import { DataSource, Repository } from 'typeorm';
import { Station } from './../../database/entities';
import { Pagination } from './../../decorator';
import { FilterStationDto, SaveStationDto, UpdateStationDto, DeleteStationByIdsDto, DeleteStationByCodesDto } from './dto';
import { ImageResourceService } from '../image-resource/image-resource.service';
import { Response } from 'express';
import { DistrictService } from '../address/district/district.service';
import { ProvinceService } from '../address/province/province.service';
import { WardService } from '../address/ward/ward.service';
export declare class StationService {
    private readonly stationRepository;
    private imageResourceService;
    private wardService;
    private districtService;
    private provinceService;
    private dataSource;
    constructor(stationRepository: Repository<Station>, imageResourceService: ImageResourceService, wardService: WardService, districtService: DistrictService, provinceService: ProvinceService, dataSource: DataSource);
    private selectFile;
    findOneStation(options: any): Promise<Station>;
    findOneStationById(id: string, options?: any): Promise<Station>;
    findOneStationByCode(code: string, options?: any): Promise<Station>;
    getOneStationByCode(code: string, options?: any): Promise<Station>;
    getOneStationById(id: string, options?: any): Promise<Station>;
    createStation(dto: SaveStationDto, userId: string): Promise<Station>;
    findAll(dto: FilterStationDto, pagination?: Pagination): Promise<{
        dataResult: Station[];
        pagination: Pagination;
        total: number;
    }>;
    updateStationById(userId: string, id: string, dto: UpdateStationDto): Promise<Station>;
    updateStationByCode(userId: string, currentCode: string, dto: UpdateStationDto): Promise<Station>;
    deleteStationById(userId: string, id: string): Promise<Station>;
    deleteStationByCode(userId: string, code: string): Promise<Station>;
    deleteMultipleStationByIds(userId: string, dto: DeleteStationByIdsDto): Promise<void[]>;
    deleteMultipleStationByCodes(userId: string, dto: DeleteStationByCodesDto): Promise<void[]>;
    exportStation(dto: FilterStationDto, res: Response): Promise<void>;
}
