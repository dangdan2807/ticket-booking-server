import { TripDetail, District } from '.';
export declare class Province {
    id: string;
    name: string;
    type: string;
    code: number;
    codename: string;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    districts: District[];
    fromTripDetails: TripDetail[];
    toTripDetails: TripDetail[];
}
