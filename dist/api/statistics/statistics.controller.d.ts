import { Pagination } from '../../decorator';
import { StatisticsService } from './statistics.service';
import { RevenueStatisticsDto, StatisticsDto, TicketStatisticsDto, TopCustomerStatisticsDto } from './dto';
export declare class StatisticsController {
    private statisticsService;
    constructor(statisticsService: StatisticsService);
    getStatisticsLastDays(dto: StatisticsDto): Promise<{
        totalRevenue: number;
        totalOrders: number;
        totalTicketsSold: number;
        totalCustomers: number;
    }>;
    getTotalRevenueLastDays(dto: StatisticsDto): Promise<number>;
    getTotalOrdersLastDays(dto: StatisticsDto): Promise<number>;
    getTotalTicketsSoldLastDays(dto: StatisticsDto): Promise<number>;
    getTotalCustomersLastDays(dto: StatisticsDto): Promise<number>;
    getTopCustomersLastDays(dto: TopCustomerStatisticsDto): Promise<any[]>;
    getRevenueByDayLastDays(dto: StatisticsDto): Promise<any[]>;
    getRevenueCustomersLastDays(dto: RevenueStatisticsDto, pagination?: Pagination): Promise<any[]>;
    getRevenueEmployeesLastDays(dto: RevenueStatisticsDto, pagination?: Pagination): Promise<any[]>;
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
    getPromotionLines(dto: RevenueStatisticsDto, pagination?: Pagination): Promise<any[]>;
}
