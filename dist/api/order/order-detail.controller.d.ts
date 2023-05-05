import { OrderService } from './order.service';
export declare class OrderDetailController {
    private orderService;
    constructor(orderService: OrderService);
    getOrderDetailById(id: string): Promise<import("../../database/entities").Order>;
    getOrderDetailByCode(code: string): Promise<import("../../database/entities").Order>;
    getOrderDetailsByOrderCode(code: string): Promise<import("../../database/entities").OrderDetail[]>;
}
