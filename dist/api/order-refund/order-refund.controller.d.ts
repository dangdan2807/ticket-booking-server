import { Pagination } from './../../decorator';
import { OrderService } from '../order/order.service';
import { FilterOrderRefundDto, UpdateOrderRefundDto } from './dto';
export declare class OrderRefundController {
    private orderService;
    constructor(orderService: OrderService);
    getOrderRefundStatus(): Promise<{
        dataResult: any[];
    }>;
    findAllOrder(dto: FilterOrderRefundDto, user: any, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").OrderRefund[];
        total: number;
        pagination: Pagination;
    }>;
    getOrderByCode(code: string): Promise<import("../../database/entities").OrderRefund>;
    updateOrderRefundById(id: string, dto: UpdateOrderRefundDto, user: any): Promise<import("../../database/entities").OrderRefund>;
    updateOrderRefundByCode(code: string, dto: UpdateOrderRefundDto, user: any): Promise<import("../../database/entities").OrderRefund>;
}
