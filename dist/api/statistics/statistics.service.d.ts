import { Customer, Order, OrderDetail, PromotionLine, Staff } from '../../database/entities';
import { DataSource, Repository } from 'typeorm';
import { RevenueStatisticsDto, StatisticsDto, TicketStatisticsDto, TopCustomerStatisticsDto } from './dto';
import { Pagination } from './../../decorator';
export declare class StatisticsService {
    private readonly orderRepository;
    private readonly orderDetailRepository;
    private readonly customerRepository;
    private readonly staffRepository;
    private readonly pLineRepository;
    private dataSource;
    constructor(orderRepository: Repository<Order>, orderDetailRepository: Repository<OrderDetail>, customerRepository: Repository<Customer>, staffRepository: Repository<Staff>, pLineRepository: Repository<PromotionLine>, dataSource: DataSource);
    getTotalRevenueLastDays(dto: StatisticsDto): Promise<number>;
    getTotalOrdersLastDays(dto: StatisticsDto): Promise<number>;
    getTotalTicketsSoldLastDays(dto: StatisticsDto): Promise<number>;
    getTotalCustomersLastDays(dto: StatisticsDto): Promise<number>;
    getStatisticsLastDays(dto: StatisticsDto): Promise<{
        totalRevenue: number;
        totalOrders: number;
        totalTicketsSold: number;
        totalCustomers: number;
    }>;
    getTopCustomersLastDays(dto: TopCustomerStatisticsDto): Promise<any[]>;
    getRevenueByDayLastDays(dto: StatisticsDto): Promise<any[]>;
    getTicketsSoldByRoute(dto: TicketStatisticsDto, pagination?: Pagination): Promise<{
        id: any;
        code: any;
        name: any;
        startDate: any;
        endDate: any;
        status: any;
        totalTickets: number;
        totalRevenue: number;
        finalTotalRevenue: number;
        totalDiscount: number;
        fromStation: {
            id: any;
            code: any;
            name: any;
        };
        toStation: {
            id: any;
            code: any;
            name: any;
        };
    }[]>;
    getRevenueCustomers(dto: RevenueStatisticsDto, pagination?: Pagination): Promise<any[]>;
    getRevenueEmployees(dto: RevenueStatisticsDto, pagination?: Pagination): Promise<any[]>;
    getStatisticsPromotionLines(dto: RevenueStatisticsDto, pagination?: Pagination): Promise<any[]>;
}
