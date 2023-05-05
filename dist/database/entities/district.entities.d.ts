import { Ward } from './ward.entities';
export declare class District {
    constructor();
    id: number;
    name: string;
    type: string;
    nameWithType: string;
    code: number;
    parentCode: number;
    wards: Ward[];
}
