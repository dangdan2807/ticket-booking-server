import { Pagination } from './../../decorator';
import { CreatePromotionLinesDto, UpdatePromotionLineDto, FilterPromotionLineDto, FilterAvailablePromotionLineDto, DeleteMultiPromotionLineDto, CreatePromotionLineDto } from './dto';
import { DeleteDtoTypeEnum } from './../../enums';
import { Promotion, PromotionDetail, PromotionLine } from './../../database/entities';
import { DataSource, Repository } from 'typeorm';
export declare class PromotionLineService {
    private readonly promotionRepository;
    private readonly promotionLineRepository;
    private readonly promotionDetailRepository;
    private dataSource;
    constructor(promotionRepository: Repository<Promotion>, promotionLineRepository: Repository<PromotionLine>, promotionDetailRepository: Repository<PromotionDetail>, dataSource: DataSource);
    private validProductDiscount;
    private validProductDiscountPercent;
    findOnePromotion(options: any): Promise<Promotion>;
    findOnePromotionLine(options: any): Promise<PromotionLine>;
    findOnePromotionLineByCode(code: string, options?: any): Promise<PromotionLine>;
    findOnePromotionLineById(id: string, options?: any): Promise<PromotionLine>;
    getPromotionLineById(id: string, options?: any): Promise<PromotionLine>;
    getPromotionLineByCode(code: string, options?: any): Promise<PromotionLine>;
    getPromotionLineTypeEnum(): Promise<{
        dataResult: any[];
    }>;
    findAllPromotionLine(dto: FilterPromotionLineDto, pagination?: Pagination): Promise<{
        dataResult: PromotionLine[];
        total: number;
        pagination: Pagination;
    }>;
    findAvailablePromotionLine(dto: FilterAvailablePromotionLineDto): Promise<{
        dataResult: PromotionLine[];
        total: number;
    }>;
    createPromotionLines(dto: CreatePromotionLinesDto, adminId: string): Promise<any[]>;
    createPromotionLine(dto: CreatePromotionLineDto, adminId: string, isAllTrip?: boolean): Promise<any>;
    updatePromotionLineByIdOrCode(dto: UpdatePromotionLineDto, adminId: string, id?: string, code?: string): Promise<any>;
    deletePromotionLineByIdOrCode(adminId: string, id?: string, code?: string): Promise<{
        id: string;
        code: string;
        message: string;
    }>;
    deleteMultiPromotionLineByIdOrCode(dto: DeleteMultiPromotionLineDto, adminId: string, type: DeleteDtoTypeEnum): Promise<{
        id: string;
        code: string;
        message: string;
    }[]>;
}
