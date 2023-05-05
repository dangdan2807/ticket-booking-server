import { Pagination } from './../../decorator';
import { PromotionLineService } from './promotion-line.service';
import { CreatePromotionLinesDto, DeleteMultiPromotionLineDto, FilterAvailablePromotionLineDto, FilterPromotionLineDto, UpdatePromotionLineDto } from './dto';
export declare class PromotionLineController {
    private promotionLineService;
    constructor(promotionLineService: PromotionLineService);
    getPromotionLineTypeEnum(): Promise<{
        dataResult: any[];
    }>;
    createPromotion(dto: CreatePromotionLinesDto, user: any): Promise<any[]>;
    findAllPriceList(dto: FilterPromotionLineDto, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").PromotionLine[];
        total: number;
        pagination: Pagination;
    }>;
    findAvailablePromotionLine(dto: FilterAvailablePromotionLineDto): Promise<{
        dataResult: import("../../database/entities").PromotionLine[];
        total: number;
    }>;
    UpdatePromotionLineById(id: string, dto: UpdatePromotionLineDto, user: any): Promise<any>;
    UpdatePromotionLineByCode(code: string, dto: UpdatePromotionLineDto, user: any): Promise<any>;
    getPromotionByCode(code: string): Promise<import("../../database/entities").PromotionLine>;
    getPromotionById(id: string): Promise<import("../../database/entities").PromotionLine>;
    deletePromotionById(id: string, user: any): Promise<{
        id: string;
        code: string;
        message: string;
    }>;
    deletePromotionByCode(code: string, user: any): Promise<{
        id: string;
        code: string;
        message: string;
    }>;
    deleteMultiplePromotionByIds(dto: DeleteMultiPromotionLineDto, user: any): Promise<{
        id: string;
        code: string;
        message: string;
    }[]>;
    deleteMultiplePromotionByCodes(dto: DeleteMultiPromotionLineDto, user: any): Promise<{
        id: string;
        code: string;
        message: string;
    }[]>;
}
