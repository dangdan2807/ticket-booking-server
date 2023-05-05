import { Order, PromotionHistory, PromotionLine, Staff, Customer, OrderRefund } from './../../database/entities';
import { DataSource, Repository } from 'typeorm';
import { CalculatePromotionLineDto, CreatePromotionHistoryDto } from './dto';
export declare class PromotionHistoryService {
    private readonly orderRepository;
    private readonly promotionLineRepository;
    private readonly promotionHistoryRepository;
    private readonly orderRefundRepository;
    private dataSource;
    constructor(orderRepository: Repository<Order>, promotionLineRepository: Repository<PromotionLine>, promotionHistoryRepository: Repository<PromotionHistory>, orderRefundRepository: Repository<OrderRefund>, dataSource: DataSource);
    findOnePromotionHistory(options: any): Promise<PromotionHistory>;
    findPromotionHistoryById(id: string, options?: any): Promise<PromotionHistory>;
    findPromotionHistoryByCode(code: string, options?: any): Promise<PromotionHistory>;
    getPromotionHistoryById(id: any, options?: any): Promise<PromotionHistory>;
    getPromotionHistoryByCode(code: any, options?: any): Promise<PromotionHistory>;
    getPromotionHistoryByOrderCode(orderCode: string, options?: any): Promise<PromotionHistory>;
    getPromotionHistoryStatusEnum(): Promise<{
        dataResult: any[];
    }>;
    calculatePromotionLine(dto: CalculatePromotionLineDto, userId: string, customer?: Customer, admin?: Staff): Promise<{
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
    createPromotionHistory(dto: CreatePromotionHistoryDto, userId: string, orderRefund?: OrderRefund): Promise<PromotionHistory>;
}
