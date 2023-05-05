import { CreateTripDto, FilterTripDto, UpdateTripDto, TripDeleteMultiInput } from './dto';
import { Trip } from './../../database/entities';
import { DataSource, Repository } from 'typeorm';
import { DeleteDtoTypeEnum, ActiveStatusEnum } from './../../enums';
import { Pagination } from './../../decorator';
export declare class TripService {
    private readonly tripRepository;
    private dataSource;
    constructor(tripRepository: Repository<Trip>, dataSource: DataSource);
    private tripSelectFieldsWithQ;
    findOneTrip(options?: any): Promise<Trip>;
    findOneTripById(id: string, options?: any): Promise<Trip>;
    findOneTripByCode(code: string, options?: any): Promise<Trip>;
    getTripStatus(): Promise<{
        dataResult: any[];
    }>;
    createTrip(dto: CreateTripDto, userId: string): Promise<{
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
        status: ActiveStatusEnum;
        createdBy: string;
        updatedBy: string;
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date;
        tripDetails: import("./../../database/entities").TripDetail[];
        promotionDetails: import("./../../database/entities").PromotionDetail[];
        priceDetails: import("./../../database/entities").PriceDetail[];
    }>;
    findAllTrip(dto: FilterTripDto, pagination?: Pagination): Promise<{
        dataResult: Trip[];
        pagination: Pagination;
        total: number;
    }>;
    getTripById(id: string, options?: any): Promise<Trip>;
    getTripByCode(code: string, options?: any): Promise<Trip>;
    updateTripByIdOrCode(dto: UpdateTripDto, userId: string, id?: string, code?: string): Promise<{
        id: string;
        name: string;
        note: string;
        startDate: Date;
        endDate: Date;
        isActive: ActiveStatusEnum;
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
    deleteTripByIdOrCode(adminId: string, id?: string, code?: string): Promise<{
        id: string;
        code: string;
        message: string;
    }>;
    deleteMultipleTripByIdsOrCodes(userId: string, dto: TripDeleteMultiInput, type: DeleteDtoTypeEnum): Promise<{
        id: any;
        code: any;
        message: string;
    }[]>;
}
