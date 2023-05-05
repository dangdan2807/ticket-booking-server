import { Vehicle } from './../../database/entities';
import { DataSource, Repository } from 'typeorm';
import { FilterVehicleDto, CreateVehicleDto, UpdateVehicleDto, VehicleDeleteMultiInput } from './dto';
import { ImageResourceService } from '../image-resource/image-resource.service';
import { Pagination } from './../../decorator';
import { SeatService } from '../seat/seat.service';
export declare class VehicleService {
    private readonly vehicleService;
    private imageResourceService;
    private seatService;
    private dataSource;
    constructor(vehicleService: Repository<Vehicle>, imageResourceService: ImageResourceService, seatService: SeatService, dataSource: DataSource);
    findOneVehicle(options?: any): Promise<Vehicle>;
    findOneVehicleById(id: string, options?: any): Promise<Vehicle>;
    findOneVehicleByCode(code: string, options?: any): Promise<Vehicle>;
    getVehicleTypes(): Promise<{
        dataResult: {
            key: string;
            value: any;
            numOfSeats: any;
        }[];
    }>;
    createVehicle(dto: CreateVehicleDto, userId: string): Promise<Vehicle>;
    getVehicleById(id: string, options?: any): Promise<Vehicle>;
    getVehicleByCode(code: string, options?: any): Promise<Vehicle>;
    findAllVehicle(dto: FilterVehicleDto, pagination?: Pagination): Promise<{
        dataResult: Vehicle[];
        pagination: Pagination;
        total: number;
    }>;
    updateVehicleById(dto: UpdateVehicleDto, userId: string, id: string): Promise<Vehicle>;
    deleteVehicleById(userId: string, id: string): Promise<Vehicle>;
    deleteMultipleVehicle(userId: string, dto: VehicleDeleteMultiInput): Promise<string[]>;
}
