import { Order, Ticket } from './../../database/entities';
import { DataSource, Repository } from 'typeorm';
import { RecentSumStatisticsDto } from './dto';
export declare class ReportService {
    private readonly orderRepository;
    private readonly ticketRepository;
    private dataSource;
    constructor(orderRepository: Repository<Order>, ticketRepository: Repository<Ticket>, dataSource: DataSource);
    getTotalRevenueLastDays(dto: RecentSumStatisticsDto): Promise<any>;
    getTotalOrdersLastDays(dto: RecentSumStatisticsDto): Promise<any>;
    getTotalTicketsSoldLastDays(dto: RecentSumStatisticsDto): Promise<any>;
}
