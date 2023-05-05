import { PromotionHistoryService } from './promotion-history.service';
import { CalculatePromotionLineDto } from './dto';
export declare class PromotionHistoryController {
    private promotionHistoryService;
    constructor(promotionHistoryService: PromotionHistoryService);
    getPromotionStatusEnum(): Promise<{
        dataResult: any[];
    }>;
    getPromotionHistoryById(id: string): Promise<import("../../database/entities").PromotionHistory>;
    getPromotionHistoryByCode(code: string): Promise<import("../../database/entities").PromotionHistory>;
    getPromotionHistoryByOrderCode(code: string): Promise<import("../../database/entities").PromotionHistory>;
    calculatePromotionLine(user: any, dto: CalculatePromotionLineDto): Promise<{
        dataResult: ({
            promotionLineCode: string;
            message: string;
            amount?: undefined;
        } | {
            promotionLineCode: string;
            amount: number;
            message?: undefined;
        } | {
            promotionLineCode: string;
            amount: number;
            message: string;
        })[];
    }>;
}
