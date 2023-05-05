import { Province, Ward } from '.';
export declare class District {
    id: string;
    name: string;
    type: string;
    codename: string;
    code: number;
    provinceCode: number;
    createdBy: string;
    updatedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    province: Province;
    wards: Ward[];
}
