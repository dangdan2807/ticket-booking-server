import { UploadService } from './../upload/upload.service';
import { ImageResource } from './../../database/entities';
import { DataSource, Repository } from 'typeorm';
export declare class ImageResourceService {
    private readonly imageResourceRepository;
    private readonly uploadService;
    private dataSource;
    constructor(imageResourceRepository: Repository<ImageResource>, uploadService: UploadService, dataSource: DataSource);
    saveImageResource(imageResource: ImageResource, userId: string, vehicleId?: string, stationId?: string): Promise<ImageResource>;
    findImageResourcesByStationId(stationId: string, options?: any): Promise<ImageResource[]>;
    removeImageById(id: string): Promise<ImageResource>;
    removeImageResourcesByStationId(id: string): Promise<ImageResource[]>;
}
