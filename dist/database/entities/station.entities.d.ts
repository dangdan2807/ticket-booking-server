import { ImageResource, Trip, Ward } from '.';
export declare class Station {
    id: string;
    name: string;
    address: string;
    fullAddress: string;
    code: string;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    ward: Ward;
    fromTrips?: Trip[];
    toTrips?: Trip[];
    images?: ImageResource[];
}
