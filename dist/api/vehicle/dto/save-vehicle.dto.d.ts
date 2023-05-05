import { ImageResource } from './../../../database/entities';
export declare class SaveVehicleDto {
    name: string;
    description: string;
    type: string;
    licensePlate: string;
    floorNumber: number;
    totalSeat: number;
    images?: ImageResource[];
}
