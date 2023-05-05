import { Station, Vehicle } from './../../database/entities';
export declare class ImageResource {
    id: string;
    url: string;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    vehicle: Vehicle;
    station: Station;
}
