import { Pagination } from './../../decorator';
import { CreatePriceListDto, FilterPriceListDto, UpdatePriceListDto, DeletePriceListDto, CreatePriceDetailDto, FilterPriceDetailDto, UpdatePriceDetailDto, DeletePriceDetailDto, FilterPriceDetailForBookingDto } from './dto';
import { PriceListService } from './price-list.service';
export declare class PriceListController {
    private priceListService;
    constructor(priceListService: PriceListService);
    getPriceListStatus(): Promise<{
        dataResult: any[];
    }>;
    createPriceList(dto: CreatePriceListDto, user: any): Promise<import("../../database/entities").PriceList>;
    findAllPriceList(dto: FilterPriceListDto, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").PriceList[];
        total: number;
        pagination: Pagination;
    }>;
    getPriceListById(id: string): Promise<import("../../database/entities").PriceList>;
    getPriceListByCode(code: string): Promise<import("../../database/entities").PriceList>;
    updatePriceListById(user: any, id: string, dto: UpdatePriceListDto): Promise<import("../../database/entities").PriceList>;
    updatePriceListByCode(user: any, code: string, dto: UpdatePriceListDto): Promise<import("../../database/entities").PriceList>;
    deletePriceListById(user: any, id: string): Promise<{
        id: string;
        code: string;
        message: string;
    }>;
    deletePriceListByCode(user: any, code: string): Promise<{
        id: string;
        code: string;
        message: string;
    }>;
    deleteMultiplePriceListByIds(user: any, dto: DeletePriceListDto): Promise<{
        id: string;
        code: string;
        message: string;
    }[]>;
    deleteMultiplePriceListByCodes(user: any, dto: DeletePriceListDto): Promise<{
        id: string;
        code: string;
        message: string;
    }[]>;
    getPriceDetailSeatType(): Promise<{
        dataResult: any[];
    }>;
    findPriceDetailForBooking(dto: FilterPriceDetailForBookingDto): Promise<{
        dataResult: import("../../database/entities").PriceDetail;
    }>;
    createPriceDetail(user: any, dto: CreatePriceDetailDto): Promise<import("../../database/entities").PriceDetail>;
    findAllPriceDetail(dto: FilterPriceDetailDto, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").PriceDetail[];
        pagination: Pagination;
        total: number;
    }>;
    getPriceDetailById(id: string): Promise<import("../../database/entities").PriceDetail>;
    getPriceDetailByCode(code: string): Promise<import("../../database/entities").PriceDetail>;
    updatePriceDetailById(user: any, id: string, dto: UpdatePriceDetailDto): Promise<any>;
    updatePriceDetailByCode(user: any, code: string, dto: UpdatePriceDetailDto): Promise<any>;
    deletePriceDetailById(user: any, id: string): Promise<{
        id: string;
        code: string;
        message: string;
    }>;
    deletePriceDetailByCode(user: any, code: string): Promise<{
        id: string;
        code: string;
        message: string;
    }>;
    deleteMultiplePriceDetailByIds(user: any, dto: DeletePriceDetailDto): Promise<{
        id: string;
        code: string;
        message: string;
    }[]>;
    deleteMultiplePriceDetailByCodes(user: any, dto: DeletePriceDetailDto): Promise<{
        id: string;
        code: string;
        message: string;
    }[]>;
}
