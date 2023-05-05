import { District } from './district.entities';
export declare class Province {
    constructor();
    id: number;
    name: string;
    type: string;
    code: number;
    nameWithType: string;
    districts: District[];
}
