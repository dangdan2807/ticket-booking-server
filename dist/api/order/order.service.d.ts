import { Pagination } from './../../decorator';
import { TripDetailService } from './../trip-detail/trip-detail.service';
import { Order, OrderDetail, OrderRefund, OrderRefundDetail, PromotionHistory, TicketDetail } from './../../database/entities';
import { DataSource, Repository } from 'typeorm';
import { CreateOrderDto, FilterOrderDto, UpdateOrderDto, CreateOrderDetailDto, FilterBillHistoryDto, FilterBillAvailableDto, PaymentAdminDto } from './dto';
import { CustomerService } from '../customer/customer.service';
import { AdminService } from '../admin/admin.service';
import { SeatService } from '../seat/seat.service';
import { TicketService } from '../ticket/ticket.service';
import { PriceListService } from '../price-list/price-list.service';
import { PromotionLineService } from '../promotion-line/promotion-line.service';
import { PromotionHistoryService } from '../promotion-history/promotion-history.service';
import { FilterOrderRefundDto, UpdateOrderRefundDto } from '../order-refund/dto';
import { ConfigService } from '@nestjs/config';
import { PaymentHistoryService } from '../payment-history/payment-history.service';
export declare class OrderService {
    private readonly orderRepository;
    private readonly orderDetailRepository;
    private readonly orderRefundRepository;
    private readonly orderRDRepository;
    private readonly promotionHistoryRepository;
    private readonly ticketDetailRepository;
    private readonly customerService;
    private readonly adminService;
    private readonly seatService;
    private readonly ticketService;
    private readonly tripDetailService;
    private readonly priceListService;
    private readonly promotionLineService;
    private readonly promotionHistoryService;
    private readonly paymentHService;
    private dataSource;
    private configService;
    constructor(orderRepository: Repository<Order>, orderDetailRepository: Repository<OrderDetail>, orderRefundRepository: Repository<OrderRefund>, orderRDRepository: Repository<OrderRefundDetail>, promotionHistoryRepository: Repository<PromotionHistory>, ticketDetailRepository: Repository<TicketDetail>, customerService: CustomerService, adminService: AdminService, seatService: SeatService, ticketService: TicketService, tripDetailService: TripDetailService, priceListService: PriceListService, promotionLineService: PromotionLineService, promotionHistoryService: PromotionHistoryService, paymentHService: PaymentHistoryService, dataSource: DataSource, configService: ConfigService);
    private SEAT_TYPE_DTO_ID;
    private SEAT_TYPE_DTO_CODE;
    private BILL_HISTORY_TYPE_HAS_DEPARTED;
    private BILL_HISTORY_TYPE_NOT_DEPARTED;
    private selectFieldsOrderWithQ;
    private selectFieldsOrderRefundWithQ;
    findOneOrder(options: any): Promise<Order>;
    findOneOrderById(id: string, options?: any): Promise<Order>;
    findOneOrderByCode(code: string, options?: any): Promise<Order>;
    getOrderById(id: string, options?: any): Promise<Order>;
    getOrderByCode(code: string, options?: any): Promise<Order>;
    getOrderStatus(): Promise<{
        dataResult: any[];
    }>;
    getOrderRefundStatus(): Promise<{
        dataResult: any[];
    }>;
    getOrderUpdateStatus(): Promise<{
        dataResult: any[];
    }>;
    getPaymentMethod(): Promise<{
        dataResult: any[];
    }>;
    private findAll;
    findAllOrder(dto: FilterOrderDto, userId: string, pagination?: Pagination): Promise<{
        dataResult: Order[];
        total: number;
        pagination: Pagination;
    }>;
    findAllBill(dto: FilterOrderDto, userId: string, pagination?: Pagination): Promise<{
        dataResult: Order[];
        total: number;
        pagination: Pagination;
    }>;
    findAllBillHistoryForCustomer(dto: FilterBillHistoryDto, userId: string, pagination?: Pagination): Promise<{
        dataResult: Order[];
        total: number;
        pagination: Pagination;
    }>;
    findAllBillAvailableForCustomer(dto: FilterBillAvailableDto, userId: string, pagination?: Pagination): Promise<{
        dataResult: Order[];
        total: number;
        pagination: Pagination;
    }>;
    createOrder(dto: CreateOrderDto, creatorId: string): Promise<Order>;
    updateOrderByIdOrCode(dto: UpdateOrderDto, userId: string, id?: string, code?: string): Promise<Order>;
    paymentForAdmin(dto: PaymentAdminDto, userId: string): Promise<{
        order: Order;
    }>;
    createOrderDetail(dto: CreateOrderDetailDto, userId: string, order?: Order): Promise<OrderDetail>;
    findOneOrderRefund(options?: any): Promise<OrderRefund>;
    findOneOrderRefundById(id: string, options?: any): Promise<OrderRefund>;
    findOneOrderRefundByCode(code: string, options?: any): Promise<OrderRefund>;
    getOrderRefundByCode(code: string, options?: any): Promise<OrderRefund>;
    findAllOrderRefund(dto: FilterOrderRefundDto, userId: string, pagination?: Pagination): Promise<{
        dataResult: OrderRefund[];
        total: number;
        pagination: Pagination;
    }>;
    createOrderRefund(orderCode: string, userId: string): Promise<OrderRefund>;
    updateOrderRefundByIdOrCode(dto: UpdateOrderRefundDto, userId: string, code?: string, id?: string): Promise<OrderRefund>;
}
