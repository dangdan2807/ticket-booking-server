import { TripService } from './trip.service';
import { Pagination } from './../../decorator';
import { FilterTripDto, CreateTripDto, UpdateTripDto, TripDeleteMultiInput } from './dto';
export declare class TripController {
    private tripService;
    constructor(tripService: TripService);
    getPromotionStatusEnum(): Promise<{
        dataResult: any[];
    }>;
    createNewVehicle(dto: CreateTripDto, user: any): Promise<{
        fromStation: {
            id: string;
            code: string;
            name: string;
        };
        toStation: {
            id: string;
            code: string;
            name: string;
        };
        id: string;
        code: string;
        name: string;
        note: string;
        startDate: Date;
        endDate: Date;
        status: import("./../../enums").ActiveStatusEnum;
        createdBy: string;
        updatedBy: string;
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date;
        tripDetails: import("../../database/entities").TripDetail[];
        promotionDetails: import("../../database/entities").PromotionDetail[];
        priceDetails: import("../../database/entities").PriceDetail[];
    }>;
    findAll(dto: FilterTripDto, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").Trip[];
        pagination: Pagination;
        total: number;
    }>;
    getTripById(id: string): Promise<import("../../database/entities").Trip>;
    getTripByCode(code: string): Promise<import("../../database/entities").Trip>;
    updateTripById(user: any, id: string, dto: UpdateTripDto): Promise<{
        id: string;
        name: string;
        note: string;
        startDate: Date;
        endDate: Date;
        isActive: import("./../../enums").ActiveStatusEnum;
        createdBy: string;
        updatedBy: string;
        createdAt: Date;
        updatedAt: Date;
        fromStation: {
            id: string;
            code: string;
            name: string;
        };
        toStation: {
            id: string;
            code: string;
            name: string;
        };
    }>;
    updateTripByCode(user: any, code: string, dto: UpdateTripDto): Promise<{
        id: string;
        name: string;
        note: string;
        startDate: Date;
        endDate: Date;
        isActive: import("./../../enums").ActiveStatusEnum;
        createdBy: string;
        updatedBy: string;
        createdAt: Date;
        updatedAt: Date;
        fromStation: {
            id: string;
            code: string;
            name: string;
        };
        toStation: {
            id: string;
            code: string;
            name: string;
        };
    }>;
    deleteTripById(user: any, id: string): Promise<{
        id: string;
        code: string;
        message: string;
    }>;
    deleteTripByCode(user: any, code: string): Promise<{
        id: string;
        code: string;
        message: string;
    }>;
    deleteMultiple(user: any, dto: TripDeleteMultiInput): Promise<{
        id: any;
        code: any;
        message: string;
    }[]>;
    deleteMultipleByCodes(user: any, dto: TripDeleteMultiInput): Promise<{
        id: any;
        code: any;
        message: string;
    }[]>;
}
