import { ImageResource } from './../../../database/entities';
export declare class SaveStationDto {
    name: string;
    address: string;
    code: string;
    wardId: number;
    images?: ImageResource[];
}
