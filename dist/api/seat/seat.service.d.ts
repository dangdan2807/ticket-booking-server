import { Seat } from './../../database/entities';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { FilterSeatDto, CreateSeatDto, SeatDeleteMultiInput, UpdateSeatDto } from './dto';
import { Pagination } from './../../decorator';
export declare class SeatService {
    private readonly seatRepository;
    private dataSource;
    constructor(seatRepository: Repository<Seat>, dataSource: DataSource);
    findOneSeat(options: any): Promise<Seat>;
    findOneSeatById(id: string, options?: any): Promise<Seat>;
    findOneSeatByCode(code: string, options?: any): Promise<Seat>;
    getSeatById(id: string, options?: any): Promise<Seat>;
    getSeatByCode(code: string, options?: any): Promise<Seat>;
    createSeat(dto: CreateSeatDto, userId: string): Promise<Seat>;
    searchSeat(dto: FilterSeatDto, pagination?: Pagination): Promise<{
        dataResult: Seat[];
        pagination: Pagination;
        total: number;
    }>;
    searchSeatWithVehicleId(dto: FilterSeatDto, vehicleId: string, pagination?: Pagination): Promise<{
        dataResult: Seat[];
        pagination: Pagination;
        total: number;
    }>;
    findAllSeatByVehicleId(vehicleId: string, pagination?: Pagination): Promise<{
        dataResult: Seat[];
        pagination: Pagination;
        total: number;
    }>;
    updateSeatByIdOrCode(dto: UpdateSeatDto, userId: string, id?: string, code?: string, manager?: EntityManager): Promise<Seat>;
    deleteSeatByIdOrCode(userId: string, id?: string, code?: string): Promise<Seat>;
    deleteMultipleTripById(userId: string, dto: SeatDeleteMultiInput): Promise<{
        id: string;
        message: string;
    }[]>;
    deleteMultipleTripByCode(userId: string, dto: SeatDeleteMultiInput): Promise<({
        code: string;
        message: string;
        id?: undefined;
    } | {
        id: string;
        message: string;
        code?: undefined;
    })[]>;
}
