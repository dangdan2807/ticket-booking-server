import { Pagination } from './../../decorator';
import { CreateTicketDto, FilterTicketDto, UpdateTicketDto, FilterTicketDetailDto, UpdateTicketDetailDto } from './dto';
import { Ticket, TicketDetail } from './../../database/entities';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { SeatService } from '../seat/seat.service';
export declare class TicketService {
    private readonly ticketRepository;
    private readonly ticketDetailRepository;
    private readonly seatService;
    private dataSource;
    constructor(ticketRepository: Repository<Ticket>, ticketDetailRepository: Repository<TicketDetail>, seatService: SeatService, dataSource: DataSource);
    private selectTicketFieldsWithQ;
    private selectTicketDetailFieldsWithQ;
    private getTripDetailById;
    findOneTicket(options: any): Promise<Ticket>;
    findOneTicketByCode(code: string, options?: any): Promise<Ticket>;
    findOneTicketById(id: string, options?: any): Promise<Ticket>;
    createTicket(dto: CreateTicketDto, adminId: string): Promise<Ticket>;
    getTicketById(id: string, options?: any): Promise<Ticket>;
    getTicketByCode(code: string, options?: any): Promise<Ticket>;
    findAllTicket(dto: FilterTicketDto, pagination?: Pagination): Promise<{
        dataResult: Ticket[];
        pagination: Pagination;
        total: number;
    }>;
    updateTicketByIdOrCode(dto: UpdateTicketDto, adminId: string, id?: string, code?: string): Promise<Ticket>;
    findOneTicketDetail(options: any): Promise<TicketDetail>;
    findOneTicketDetailByCode(code: string, options?: any): Promise<TicketDetail>;
    findOneTicketDetailById(id: string, options?: any): Promise<TicketDetail>;
    getTicketDetailById(id: string, options?: any): Promise<TicketDetail>;
    getTicketDetailByCode(code: string, options?: any): Promise<TicketDetail>;
    getTicketDetailStatus(): Promise<{
        dataResult: any[];
    }>;
    findAllTicketDetail(dto: FilterTicketDetailDto, pagination?: Pagination): Promise<{
        dataResult: TicketDetail[];
        pagination: Pagination;
        total: number;
    }>;
    createTicketDetail(ticketId: string, seatId: string, adminId: string): Promise<TicketDetail>;
    updateTicketDetailById(id: string, dto: UpdateTicketDetailDto, userId: string, manager?: EntityManager): Promise<TicketDetail>;
}
