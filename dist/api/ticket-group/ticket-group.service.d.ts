import { DeleteMultiTicketGroupDto } from './dto/delete-multi-ticket-group.dto';
import { Pagination } from './../../decorator';
import { TicketGroup } from './../../database/entities';
import { DataSource, Repository } from 'typeorm';
import { CreateTicketGroupDto, FilterTicketGroupDto, UpdateTicketGroupDto } from './dto';
export declare class TicketGroupService {
    private readonly tickerGroupRepository;
    private dataSource;
    constructor(tickerGroupRepository: Repository<TicketGroup>, dataSource: DataSource);
    private selectFieldsWithQ;
    findOneTicketGroup(options: any): Promise<TicketGroup>;
    findOneTicketGroupById(id: string, options?: any): Promise<TicketGroup>;
    findOneTicketGroupByCode(code: string, options?: any): Promise<TicketGroup>;
    getTicketGroupById(id: string, adminId: string, options?: any): Promise<TicketGroup>;
    getTicketGroupByCode(code: string, adminId: string, options?: any): Promise<TicketGroup>;
    createTicketGroup(dto: CreateTicketGroupDto, adminId: string): Promise<any>;
    findAllTicketGroup(dto: FilterTicketGroupDto, pagination?: Pagination): Promise<{
        dataResult: TicketGroup[];
        pagination: Pagination;
        total: number;
    }>;
    updateTicketGroupById(id: string, dto: UpdateTicketGroupDto, adminId: string): Promise<any>;
    updateTicketGroupByCode(code: string, dto: UpdateTicketGroupDto, adminId: string): Promise<any>;
    deleteTicketGroupById(id: string, adminId: string): Promise<{
        id: any;
        message: string;
    }>;
    deleteTicketGroupByCode(code: string, adminId: string): Promise<{
        id: any;
        message: string;
    }>;
    deleteMultipleTicketGroupsByIds(adminId: string, dto: DeleteMultiTicketGroupDto): Promise<{
        id: any;
        message: string;
    }[]>;
    deleteMultipleTicketGroupsByCodes(adminId: string, dto: DeleteMultiTicketGroupDto): Promise<{
        id: any;
        message: string;
    }[]>;
}
