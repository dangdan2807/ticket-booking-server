import { Pagination } from './../../decorator';
import { VehicleService } from './vehicle.service';
import { FilterVehicleDto, CreateVehicleDto, VehicleDeleteMultiInput, UpdateVehicleDto } from './dto';
export declare class VehicleController {
    private vehicleService;
    constructor(vehicleService: VehicleService);
    createNewVehicle(dto: CreateVehicleDto, user: any): Promise<import("../../database/entities").Vehicle>;
    getVehicleById(id: string): Promise<import("../../database/entities").Vehicle>;
    getVehicleType(): Promise<{
        dataResult: {
            key: string;
            value: any;
            numOfSeats: any;
        }[];
    }>;
    findAll(dto: FilterVehicleDto, pagination?: Pagination): Promise<{
        dataResult: import("../../database/entities").Vehicle[];
        pagination: Pagination;
        total: number;
    }>;
    updateStationById(user: any, id: string, dto: UpdateVehicleDto): Promise<import("../../database/entities").Vehicle>;
    deleteStationById(user: any, id: string): Promise<import("../../database/entities").Vehicle>;
    deleteMultiple(user: any, dto: VehicleDeleteMultiInput): Promise<string[]>;
}
