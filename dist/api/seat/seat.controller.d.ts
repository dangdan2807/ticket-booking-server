import { SeatService } from './seat.service';
import { Pagination } from './../../decorator';
import { FilterSeatDto, CreateSeatDto, SeatDeleteMultiInput, UpdateSeatDto } from './dto';
export declare class SeatController {
    private seatService;
    constructor(seatService: SeatService);
    createSeat(dto: CreateSeatDto, user: any): Promise<import("../../database/entities").Seat>;
    getSeatById(id: string): Promise<import("../../database/entities").Seat>;
    getSeatByCode(code: string): Promise<import("../../database/entities").Seat>;
    getSeatByVehicleId(vehicleId: string, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").Seat[];
        pagination: Pagination;
        total: number;
    }>;
    searchSeat(dto: FilterSeatDto, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").Seat[];
        pagination: Pagination;
        total: number;
    }>;
    searchSeatWithVehicleId(vehicleId: string, dto: FilterSeatDto, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").Seat[];
        pagination: Pagination;
        total: number;
    }>;
    updateSeatById(user: any, id: string, dto: UpdateSeatDto): Promise<import("../../database/entities").Seat>;
    updateSeatByCode(user: any, code: string, dto: UpdateSeatDto): Promise<import("../../database/entities").Seat>;
    deleteStationById(user: any, id: string): Promise<import("../../database/entities").Seat>;
    deleteStationByCode(user: any, code: string): Promise<import("../../database/entities").Seat>;
    deleteMultipleByIds(user: any, dto: SeatDeleteMultiInput): Promise<{
        id: string;
        message: string;
    }[]>;
    deleteMultipleByCodes(user: any, dto: SeatDeleteMultiInput): Promise<({
        code: string;
        message: string;
        id?: undefined;
    } | {
        id: string;
        message: string;
        code?: undefined;
    })[]>;
}
