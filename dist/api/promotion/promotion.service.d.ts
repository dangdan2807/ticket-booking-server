import { Pagination } from './../../decorator';
import { DeleteDtoTypeEnum } from './../../enums';
import { CreatePromotionDto, FilterPromotionDto, UpdatePromotionDto, DeleteMultiPromotionDto } from './dto';
import { Promotion } from './../../database/entities';
import { DataSource, Repository } from 'typeorm';
export declare class PromotionService {
    private readonly promotionRepository;
    private dataSource;
    constructor(promotionRepository: Repository<Promotion>, dataSource: DataSource);
    getPromotionStatusEnum(): Promise<{
        dataResult: any[];
    }>;
    findOnePromotion(options: any): Promise<Promotion>;
    findOnePromotionByCode(code: string, options?: any): Promise<Promotion>;
    findOnePromotionById(id: string, options?: any): Promise<Promotion>;
    getPromotionById(id: string): Promise<Promotion>;
    getPromotionByCode(code: string): Promise<Promotion>;
    findAllPromotion(dto: FilterPromotionDto, pagination?: Pagination): Promise<{
        dataResult: Promotion[];
        total: number;
        pagination: Pagination;
    }>;
    createPromotion(dto: CreatePromotionDto, adminId: string): Promise<Promotion>;
    updatePromotionByIdOrCode(dto: UpdatePromotionDto, adminId: string, id?: string, code?: string): Promise<Promotion>;
    deletePromotionByIdOrCode(adminId: string, id?: string, code?: string): Promise<Promotion>;
    deleteMultiplePromotionByIdsOrCodes(dto: DeleteMultiPromotionDto, adminId: string, type: DeleteDtoTypeEnum): Promise<{
        id: string;
        code: string;
        message: string;
    }[]>;
}
