import { CreateOrderDto, FilterBillAvailableDto, FilterBillDto, FilterBillHistoryDto, FilterOrderDto, UpdateOrderDto, PaymentAdminDto } from './dto';
import { Pagination } from './../../decorator';
import { OrderService } from './order.service';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    createOrder(dto: CreateOrderDto, user: any): Promise<import("../../database/entities").Order>;
    getOrderStatus(): Promise<{
        dataResult: any[];
    }>;
    getOrderUpdateStatus(): Promise<{
        dataResult: any[];
    }>;
    getPaymentMethod(): Promise<{
        dataResult: any[];
    }>;
    payment(dto: PaymentAdminDto, user: any): Promise<{
        order: import("../../database/entities").Order;
    }>;
    findAllOrder(dto: FilterOrderDto, user: any, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").Order[];
        total: number;
        pagination: Pagination;
    }>;
    findAllBill(dto: FilterBillDto, user: any, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").Order[];
        total: number;
        pagination: Pagination;
    }>;
    findAllBillHistoryForCustomer(dto: FilterBillHistoryDto, user: any, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").Order[];
        total: number;
        pagination: Pagination;
    }>;
    findAllBillAvailableForCustomer(dto: FilterBillAvailableDto, user: any, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").Order[];
        total: number;
        pagination: Pagination;
    }>;
    getOrderById(id: string): Promise<import("../../database/entities").Order>;
    getOrderByCode(code: string): Promise<import("../../database/entities").Order>;
    cancelOrderById(dto: UpdateOrderDto, id: string, user: any): Promise<import("../../database/entities").Order>;
    cancelOrderByCode(dto: UpdateOrderDto, code: string, user: any): Promise<import("../../database/entities").Order>;
}
