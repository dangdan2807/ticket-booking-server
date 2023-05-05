import { Order, OrderDetail } from './../../database/entities';
import { Repository } from 'typeorm';
import { CustomerService } from '../customer/customer.service';
import { AdminService } from '../admin/admin.service';
import { SeatService } from '../seat/seat.service';
import { TicketService } from '../ticket/ticket.service';
import { PriceListService } from '../price-list/price-list.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
export declare class OrderDetailService {
    private readonly orderRepository;
    private readonly orderDetailRepository;
    private readonly customerService;
    private readonly adminService;
    private readonly seatService;
    private readonly ticketService;
    private readonly priceListService;
    constructor(orderRepository: Repository<Order>, orderDetailRepository: Repository<OrderDetail>, customerService: CustomerService, adminService: AdminService, seatService: SeatService, ticketService: TicketService, priceListService: PriceListService);
    private findOneOrder;
    private findOneOrderById;
    findOrderDetail(options?: any): Promise<OrderDetail>;
    findOrderDetailById(id: string, options?: any): Promise<OrderDetail>;
    findOrderDetailByCode(code: string, options?: any): Promise<OrderDetail>;
    getOrderDetailById(id: string, options?: any): Promise<OrderDetail>;
    getOrderDetailByCode(code: string, options?: any): Promise<OrderDetail>;
    getOrderDetailByOrderCode(orderCode: string, options?: any): Promise<OrderDetail[]>;
    createOrderDetail(dto: CreateOrderDetailDto, userId: string, order?: Order): Promise<OrderDetail>;
}
