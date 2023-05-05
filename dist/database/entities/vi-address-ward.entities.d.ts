import { District, Station, Staff, Customer } from './';
export declare class Ward {
    id: number;
    name: string;
    type: string;
    codename: string;
    code: number;
    districtCode: number;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    district: District;
    customers?: Customer[];
    staffs?: Staff[];
    stations?: Station[];
}
