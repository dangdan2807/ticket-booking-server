import { TripDetail, Seat, ImageResource } from '.';
export declare class Vehicle {
    id: string;
    code: string;
    name: string;
    description: string;
    type: string;
    status: string;
    licensePlate: string;
    floorNumber: number;
    totalSeat: number;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    seats: Seat[];
    tripDetails: TripDetail[];
    images: ImageResource[];
}
