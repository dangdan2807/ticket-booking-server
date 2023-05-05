import { DeleteMultiPromotionDto } from './dto/delete-multiple-promotion.dto';
import { CreatePromotionDto, FilterPromotionDto, UpdatePromotionDto } from './dto';
import { Pagination } from './../../decorator';
import { PromotionService } from './promotion.service';
export declare class PromotionController {
    private promotionService;
    constructor(promotionService: PromotionService);
    getPromotionStatusEnum(): Promise<{
        dataResult: any[];
    }>;
    findAllPromotion(dto: FilterPromotionDto, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").Promotion[];
        total: number;
        pagination: Pagination;
    }>;
    createPromotion(dto: CreatePromotionDto, user: any): Promise<import("../../database/entities").Promotion>;
    getPromotionByCode(code: string): Promise<import("../../database/entities").Promotion>;
    getPromotionById(id: string): Promise<import("../../database/entities").Promotion>;
    UpdatePromotionById(id: string, dto: UpdatePromotionDto, user: any): Promise<import("../../database/entities").Promotion>;
    UpdatePromotionByCode(code: string, dto: UpdatePromotionDto, user: any): Promise<import("../../database/entities").Promotion>;
    deletePromotionById(id: string, user: any): Promise<import("../../database/entities").Promotion>;
    deletePromotionByCode(code: string, user: any): Promise<import("../../database/entities").Promotion>;
    deleteMultiplePromotionByIds(dto: DeleteMultiPromotionDto, user: any): Promise<{
        id: string;
        code: string;
        message: string;
    }[]>;
    deleteMultiplePromotionByCodes(dto: DeleteMultiPromotionDto, user: any): Promise<{
        id: string;
        code: string;
        message: string;
    }[]>;
}
