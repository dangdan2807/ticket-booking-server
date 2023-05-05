import { ImageResource } from '../../../database/entities';
export declare class UpdateStationDto {
    name: string;
    address: string;
    wardCode: number;
    images?: ImageResource[];
}
