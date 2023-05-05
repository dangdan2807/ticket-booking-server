/// <reference types="multer" />
/// <reference types="node" />
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { DeleteFileUploadDto, UploadWithPathUploadDto } from './dto';
export declare class UploadService {
    private configService;
    constructor(configService: ConfigService);
    private bucket_region;
    private bucket_name;
    private folder_name;
    private access_key_id;
    private secret_access_key;
    private MAX_FILE_SIZE;
    private aws_base_url;
    private cloudinary_base_url;
    private cloudinary_name;
    private cloudinary_api_key;
    private cloudinary_api_secret;
    private s3;
    uploadFileWithAWS(file: Express.Multer.File): Promise<{
        Location: string;
    }>;
    uploadImageWithAWS(file: Express.Multer.File): Promise<{
        Location: string;
    }>;
    uploadVideoWithAWS(file: Express.Multer.File): Promise<{
        Location: string;
    }>;
    uploadFileWithPathAWS(path: string): Promise<{
        Location: string;
    }>;
    deleteFileWithAWS(path: string): Promise<void>;
    uploadFileWithCloudinary(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>;
    uploadImageWithCloudinary(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>;
    uploadFileWithPathCloudinary(dto: UploadWithPathUploadDto): Promise<{
        url: string;
        public_id: string;
        version: number;
        created_at: string;
    }>;
    uploadVideoWithCloudinary(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>;
    deleteFileWithCloudinary(dto: DeleteFileUploadDto): Promise<void>;
    uploadMultiFile(files: {
        files?: Express.Multer.File[];
        images?: Express.Multer.File[];
    }): Promise<{
        files: any[];
        images: any[];
    }>;
    uploadV2(filesIn: Array<Express.Multer.File>, options?: {
        folderName: string;
    }): Promise<any[]>;
    uploadFileS3Ver2(dataBuffer: Buffer, filename: string, options?: {
        folderName: string;
    }): Promise<S3.ManagedUpload.SendData>;
}
