import { Customer, Order, OrderDetail } from '../../database/entities';
import { DataSource, Repository } from 'typeorm';
import { RevenueCustomerStatisticsDto, StatisticsDto, TicketStatisticsDto, TopCustomerStatisticsDto } from './dto';
import { Pagination } from './../../decorator';
export declare class StatisticsService {
    private readonly orderRepository;
    private readonly orderDetailRepository;
    private readonly customerRepository;
    private dataSource;
    constructor(orderRepository: Repository<Order>, orderDetailRepository: Repository<OrderDetail>, customerRepository: Repository<Customer>, dataSource: DataSource);
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
    }[]>;
    getRevenueCustomers(dto: RevenueCustomerStatisticsDto, pagination?: Pagination): Promise<any[]>;
}
