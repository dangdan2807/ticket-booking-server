import { ImageResource } from './../../../database/entities';
export declare class UpdateVehicleDto {
    name: string;
    description: string;
    type: string;
    licensePlate: string;
    floorNumber: number;
    totalSeat: number;
    images?: ImageResource[];
}
