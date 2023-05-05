import { TicketGroupService } from './ticket-group.service';
import { Pagination } from './../../decorator';
import { CreateTicketGroupDto, UpdateTicketGroupDto, DeleteMultiTicketGroupDto, FilterTicketGroupDto } from './dto';
export declare class TicketGroupController {
    private ticketGroupService;
    constructor(ticketGroupService: TicketGroupService);
    createTickerGroup(dto: CreateTicketGroupDto, user: any): Promise<any>;
    findAll(user: any, dto: FilterTicketGroupDto, pagination?: Pagination): Promise<{
        dataResult: TicketGroup[];
        pagination: Pagination;
        total: number;
    }>;
    getTickerGroupById(id: string, user: any): Promise<TicketGroup>;
    getTickerGroupByCode(code: string, user: any): Promise<TicketGroup>;
    updateTicketGroupById(user: any, id: string, dto: UpdateTicketGroupDto): Promise<any>;
    updateTickerGroupByCode(user: any, code: string, dto: UpdateTicketGroupDto): Promise<any>;
    deleteTicketGroupById(user: any, id: string): Promise<{
        id: any;
        message: string;
    }>;
    deleteTicketGroupByCode(user: any, code: string): Promise<{
        id: any;
        message: string;
    }>;
    deleteMultipleByIds(user: any, dto: DeleteMultiTicketGroupDto): Promise<{
        id: any;
        message: string;
    }[]>;
    deleteMultipleByCodes(user: any, dto: DeleteMultiTicketGroupDto): Promise<{
        id: any;
        message: string;
    }[]>;
}
