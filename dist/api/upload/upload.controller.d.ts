/// <reference types="multer" />
import { DeleteFileUploadDto, UploadWithPathUploadDto } from './dto';
import { UploadService } from './upload.service';
export declare class UploadController {
    private uploadService;
    constructor(uploadService: UploadService);
    uploadFile(file: Express.Multer.File): Promise<import("cloudinary").UploadApiResponse | import("cloudinary").UploadApiErrorResponse>;
    uploadImage(file: Express.Multer.File): Promise<import("cloudinary").UploadApiResponse | import("cloudinary").UploadApiErrorResponse>;
    uploadVideo(file: Express.Multer.File): Promise<import("cloudinary").UploadApiResponse | import("cloudinary").UploadApiErrorResponse>;
    uploadFileWithPath(dto: UploadWithPathUploadDto): Promise<{
        url: string;
        public_id: string;
        version: number;
        created_at: string;
    }>;
    deleteFile(dto: DeleteFileUploadDto): Promise<void>;
    uploadfile(files: {
        files?: Express.Multer.File[];
        images?: Express.Multer.File[];
    }): Promise<{
        files: any[];
        images: any[];
    }>;
}
