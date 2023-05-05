import { ImageResource } from '../../../database/entities';
import { VehicleTypeEnum } from '../../../enums';
export declare class CreateVehicleDto {
    code: string;
    name: string;
    description: string;
    type?: VehicleTypeEnum;
    licensePlate: string;
    floorNumber?: number;
    totalSeat: number;
    images?: ImageResource[];
}
