import { Vehicle, Trip, Province, Ticket } from '.';
export declare class TripDetail {
    id: string;
    code: string;
    departureTime: Date;
    expectedTime: Date;
    status: string;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    trip: Trip;
    vehicle: Vehicle;
    fromProvince: Province;
    toProvince: Province;
    tickets: Ticket[];
}
