import { Pagination } from './../../decorator';
import { TripDetailService } from './trip-detail.service';
import { FilterTripDetailDto, CreateTripDetailDto, TripDetailDeleteMultiInput, UpdateTripDetailDto, BusScheduleDto } from './dto';
export declare class TripDetailController {
    private tripDetailService;
    constructor(tripDetailService: TripDetailService);
    createTripDetail(dto: CreateTripDetailDto, user: any): Promise<{
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
    getBusSchedule(user: any, dto: BusScheduleDto): Promise<{
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
    findAll(dto: FilterTripDetailDto, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").TripDetail[];
        pagination: Pagination;
        total: number;
    }>;
    getTripDetailById(id: string): Promise<import("../../database/entities").TripDetail>;
    getTripDetailByCode(code: string): Promise<import("../../database/entities").TripDetail>;
    updateTripDetailById(user: any, id: string, dto: UpdateTripDetailDto): Promise<{
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
    updateTripDetailByCode(user: any, code: string, dto: UpdateTripDetailDto): Promise<{
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
    deleteTripDetailById(user: any, id: string): Promise<{
        id: string;
        code: string;
        message: string;
    }>;
    deleteTripDetailByCode(user: any, code: string): Promise<{
        id: string;
        code: string;
        message: string;
    }>;
    deleteMultipleTripDetailByIds(user: any, dto: TripDetailDeleteMultiInput): Promise<{
        id: string;
        code: string;
        message: string;
    }[]>;
    deleteMultipleTripDetailByCode(user: any, dto: TripDetailDeleteMultiInput): Promise<{
        id: string;
        code: string;
        message: string;
    }[]>;
}
