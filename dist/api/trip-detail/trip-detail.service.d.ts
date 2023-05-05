import { TripDetail } from './../../database/entities';
import { DataSource, Repository } from 'typeorm';
import { CreateTripDetailDto, TripDetailDeleteMultiInput, UpdateTripDetailDto, FilterTripDetailDto, BusScheduleDto } from './dto';
import { DeleteDtoTypeEnum } from './../../enums';
import { Pagination } from './../../decorator';
import { TicketService } from '../ticket/ticket.service';
export declare class TripDetailService {
    private readonly tripDetailRepository;
    private readonly ticketService;
    private dataSource;
    constructor(tripDetailRepository: Repository<TripDetail>, ticketService: TicketService, dataSource: DataSource);
    private validateTripDetailExistTime;
    private tripDetailSelect;
    findOneTripDetail(options: any): Promise<TripDetail>;
    findTripDetailById(id: string, options?: any): Promise<TripDetail>;
    findTripDetailByCode(code: string, options?: any): Promise<TripDetail>;
    getTripDetailById(id: string, options?: any): Promise<TripDetail>;
    getTripDetailByCode(code: string, options?: any): Promise<TripDetail>;
    findAllTripDetail(dto: FilterTripDetailDto, pagination?: Pagination): Promise<{
        dataResult: TripDetail[];
        pagination: Pagination;
        total: number;
    }>;
    createTripDetail(dto: CreateTripDetailDto, userId: string): Promise<{
        id: string;
        code: string;
        departureTime: Date;
        expectedTime: Date;
        status: string;
        createdBy: string;
        updatedBy: string;
        createdAt: Date;
        updatedAt: Date;
        trip: {
            id: string;
            code: string;
        };
        vehicle: {
            id: string;
            code: string;
        };
    }>;
    updateTripDetailByIdOrCode(dto: UpdateTripDetailDto, userId: string, id?: string, code?: string): Promise<{
        id: string;
        code: string;
        departureTime: Date;
        expectedTime: Date;
        status: string;
        createdBy: string;
        updatedBy: string;
        createdAt: Date;
        updatedAt: Date;
        trip: {
            id: string;
            code: string;
        };
        vehicle: {
            id: string;
            code: string;
        };
    }>;
    deleteTripDetailByIdOrCode(userId: string, id?: string, code?: string): Promise<{
        id: string;
        code: string;
        message: string;
    }>;
    deleteMultipleTripDetailByIdsOrCodes(userId: string, dto: TripDetailDeleteMultiInput, type: DeleteDtoTypeEnum): Promise<{
        id: string;
        code: string;
        message: string;
    }[]>;
    getBusSchedule(dto: BusScheduleDto, userId: string): Promise<{
        dataResult: {
            id: string;
            code: string;
            departureTime: Date;
            expectedTime: Date;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            trip: {
                id: string;
                code: string;
                name: string;
                status: import("./../../enums").ActiveStatusEnum;
            };
            vehicle: {
                id: string;
                code: string;
                name: string;
                status: string;
                type: string;
                licensePlate: string;
                floorNumber: number;
                totalSeat: number;
            };
        }[];
        total: number;
    }>;
}
