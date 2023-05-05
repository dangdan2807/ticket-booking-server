import { DeleteDtoTypeEnum } from './../../enums';
import { CreatePriceListDto, FilterPriceListDto, UpdatePriceListDto, DeletePriceListDto, CreatePriceDetailDto, FilterPriceDetailDto, UpdatePriceDetailDto, DeletePriceDetailDto, FilterPriceDetailForBookingDto } from './dto';
import { PriceDetail, PriceList } from './../../database/entities';
import { Pagination } from './../../decorator';
import { DataSource, Repository } from 'typeorm';
export declare class PriceListService {
    private readonly priceListRepository;
    private readonly priceDetailRepository;
    private dataSource;
    constructor(priceListRepository: Repository<PriceList>, priceDetailRepository: Repository<PriceDetail>, dataSource: DataSource);
    private selectFieldsPriceDetailWithQ;
    private selectFieldsPriceListWithQ;
    private validOverlappingPriceList;
    private validOverlappingPriceDetail;
    findOnePriceList(options?: any): Promise<PriceList>;
    findOnePriceListById(id: string, options?: any): Promise<PriceList>;
    findOnePriceListByCode(code: string, options?: any): Promise<PriceList>;
    getPriceListById(id: string, options?: any): Promise<PriceList>;
    getPriceListByCode(code: string, options?: any): Promise<PriceList>;
    getPriceListStatus(): Promise<{
        dataResult: any[];
    }>;
    createPriceList(dto: CreatePriceListDto, adminId: string): Promise<PriceList>;
    findAllPriceList(dto: FilterPriceListDto, pagination?: Pagination): Promise<{
        dataResult: PriceList[];
        total: number;
        pagination: Pagination;
    }>;
    updatePriceListByIdOrCode(adminId: string, dto: UpdatePriceListDto, id?: string, code?: string): Promise<PriceList>;
    deletePriceListByIdOrCode(adminId: string, id?: string, code?: string): Promise<{
        id: string;
        code: string;
        message: string;
    }>;
    deleteMultiPriceListByIdsOrCodes(adminId: string, dto: DeletePriceListDto, type: string): Promise<{
        id: string;
        code: string;
        message: string;
    }[]>;
    findOnePriceDetail(options: any): Promise<PriceDetail>;
    findOnePriceDetailById(id: string, options?: any): Promise<PriceDetail>;
    findOnePriceDetailByCode(code: string, options?: any): Promise<PriceDetail>;
    getPriceDetailById(id: string, options?: any): Promise<PriceDetail>;
    getPriceDetailByCode(code: string, options?: any): Promise<PriceDetail>;
    getPriceDetailSeatType(): Promise<{
        dataResult: any[];
    }>;
    findPriceDetailForBooking(dto: FilterPriceDetailForBookingDto): Promise<{
        dataResult: PriceDetail;
    }>;
    findAllPriceDetail(dto: FilterPriceDetailDto, pagination?: Pagination): Promise<{
        dataResult: PriceDetail[];
        pagination: Pagination;
        total: number;
    }>;
    createPriceDetail(dto: CreatePriceDetailDto, adminId: string): Promise<PriceDetail>;
    updatePriceDetailByIdOrCode(adminId: string, dto: UpdatePriceDetailDto, id?: string, code?: string): Promise<any>;
    deletePriceDetailByIdOrCode(adminId: string, id?: string, code?: string): Promise<{
        id: string;
        code: string;
        message: string;
    }>;
    deleteMultiPriceDetailByIdsOrCodes(adminId: string, dto: DeletePriceDetailDto, type: DeleteDtoTypeEnum): Promise<{
        id: string;
        code: string;
        message: string;
    }[]>;
}
