import { ReportService } from './report.service';
import { RecentSumStatisticsDto } from './dto';
export declare class ReportController {
    private reportService;
    constructor(reportService: ReportService);
    getTotalRevenueLastDays(dto: RecentSumStatisticsDto): Promise<any>;
    getTotalOrdersLastDays(dto: RecentSumStatisticsDto): Promise<any>;
}
