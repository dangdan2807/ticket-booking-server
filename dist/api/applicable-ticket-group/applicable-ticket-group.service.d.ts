import { ApplicableTicketGroup } from './../../database/entities';
import { DataSource, Repository } from 'typeorm';
import { CreateApplicableTGDto, RemoveApplicableTGDto } from './dto';
export declare class ApplicableTicketGroupService {
    private readonly applicableTGRepository;
    private dataSource;
    constructor(applicableTGRepository: Repository<ApplicableTicketGroup>, dataSource: DataSource);
    createApplicableTicketGroup(dto: CreateApplicableTGDto, adminId: string): Promise<any>;
    removeApplicableTicketGroup(dto: RemoveApplicableTGDto, adminId: string): Promise<ApplicableTicketGroup>;
}
