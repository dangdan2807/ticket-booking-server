import { FilterTicketDto, UpdateTicketDto, FilterTicketDetailDto } from './dto';
import { Pagination } from './../../decorator';
import { TicketService } from './ticket.service';
export declare class TicketController {
    private ticketService;
    constructor(ticketService: TicketService);
    findAllTicket(dto: FilterTicketDto, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").Ticket[];
        pagination: Pagination;
        total: number;
    }>;
    getTicketById(id: string): Promise<import("../../database/entities").Ticket>;
    getTicketByCode(code: string): Promise<import("../../database/entities").Ticket>;
    updateTripDetailById(user: any, id: string, dto: UpdateTicketDto): Promise<import("../../database/entities").Ticket>;
    updateTripDetailByCode(user: any, code: string, dto: UpdateTicketDto): Promise<import("../../database/entities").Ticket>;
    getPromotionStatusEnum(): Promise<{
        dataResult: any[];
    }>;
    findAllTicketDetail(dto: FilterTicketDetailDto, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").TicketDetail[];
        pagination: Pagination;
        total: number;
    }>;
    getTicketDetailById(id: string): Promise<import("../../database/entities").TicketDetail>;
    getTicketDetailByCode(code: string): Promise<import("../../database/entities").TicketDetail>;
}
