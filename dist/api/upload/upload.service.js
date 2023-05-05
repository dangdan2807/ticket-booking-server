"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const PATH = require("path");
const fs = require("fs");
const aws_sdk_1 = require("aws-sdk");
const config_1 = require("@nestjs/config");
const utils_1 = require("./../../utils");
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
let UploadService = class UploadService {
    constructor(configService) {
        this.configService = configService;
        this.bucket_region = this.configService.get('AWS_S3_BUCKET_REGION');
        this.bucket_name = this.configService.get('AWS_S3_BUCKET_NAME') || '';
        this.folder_name = this.configService.get('AWS_S3_FOLDER_NAME') || '';
        this.access_key_id = this.configService.get('AWS_ACCESS_KEY_ID');
        this.secret_access_key = this.configService.get('AWS_SECRET_ACCESS_KEY');
        this.MAX_FILE_SIZE = this.configService.get('MAX_FILE_SIZE');
        this.aws_base_url = this.configService.get('AWS_BASE_URL');
        this.cloudinary_base_url = this.configService.get('CLOUDINARY_BASE_URL');
        this.cloudinary_name = this.configService.get('CLOUDINARY_CLOUD_NAME');
        this.cloudinary_api_key = this.configService.get('CLOUDINARY_API_KEY');
        this.cloudinary_api_secret = this.configService.get('CLOUDINARY_API_SECRET');
        this.s3 = new aws_sdk_1.S3({
            apiVersion: '2006-03-01',
            region: this.bucket_region,
            accessKeyId: this.access_key_id,
            secretAccessKey: this.secret_access_key,
        });
    }
    async uploadFileWithAWS(file) {
        if (!file)
            throw new common_1.BadRequestException('FILE_NOT_FOUND');
        if (file.size > this.MAX_FILE_SIZE) {
            throw new common_1.BadRequestException('MAX_SIZE_WARNING');
        }
        const fileName = `${new Date().getTime()}_${file.originalname}`;
        const params = {
            Bucket: this.bucket_name,
            Key: `${this.folder_name}/${fileName}`,
            Body: file.buffer,
            ACL: 'public-read',
            ContentType: file.mimetype,
        };
        try {
            const { Location } = await this.s3.upload(params).promise();
            return { Location };
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async uploadImageWithAWS(file) {
        if (!file)
            throw new common_1.BadRequestException('FILE_NOT_FOUND');
        if (!file.mimetype.match(utils_1.IMAGE_REGEX)) {
            throw new common_1.BadRequestException('INVALID_FORMAT_IMAGE');
        }
        if (file.size > this.MAX_FILE_SIZE) {
            throw new common_1.BadRequestException('MAX_SIZE_WARNING');
        }
        return await this.uploadFileWithAWS(file);
    }
    async uploadVideoWithAWS(file) {
        if (!file)
            throw new common_1.BadRequestException('FILE_NOT_FOUND');
        if (!file.mimetype.match(utils_1.VIDEO_REGEX)) {
            throw new common_1.BadRequestException('INVALID_FORMAT_VIDEO');
        }
        if (file.size > this.MAX_FILE_SIZE) {
            throw new common_1.BadRequestException('MAX_SIZE_WARNING');
        }
        return await this.uploadFileWithAWS(file);
    }
    async uploadFileWithPathAWS(path) {
        try {
            const fileName = `${new Date().getTime()}_${PATH.basename(path)}`;
            const file = fs.readFileSync(path);
            const params = {
                Bucket: this.bucket_name,
                Key: `${this.folder_name}/${fileName}`,
                Body: file,
                ACL: 'public-read',
            };
            const res = await this.s3.upload(params).promise();
            if (res.Location) {
                fs.unlinkSync(path);
            }
            return { Location: res.Location };
        }
        catch (error) {
            return null;
        }
    }
    async deleteFileWithAWS(path) {
        const imageName = path.replace(this.aws_base_url, '');
        try {
            await this.s3
                .deleteObject({
                Bucket: this.bucket_name,
                Key: `${this.folder_name}/${imageName}`,
            })
                .promise();
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async uploadFileWithCloudinary(file) {
        if (!file)
            throw new common_1.BadRequestException('FILE_NOT_FOUND');
        if (file.size > this.MAX_FILE_SIZE) {
            throw new common_1.BadRequestException('MAX_SIZE_WARNING');
        }
        cloudinary_1.v2.config({
            cloud_name: this.cloudinary_name,
            api_key: this.cloudinary_api_key,
            api_secret: this.cloudinary_api_secret,
        });
        const fileUpload = new Promise((resolve, reject) => {
            const upload = cloudinary_1.v2.uploader.upload_stream((error, result) => {
                if (error)
                    return reject(error);
                resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                    version: result.version,
                    created_at: result.created_at,
                });
            });
            stream_1.Readable.from(file.buffer).pipe(upload);
        });
        return fileUpload.then();
    }
    async uploadImageWithCloudinary(file) {
        if (!file)
            throw new common_1.BadRequestException('FILE_NOT_FOUND');
        if (!file.mimetype.match(utils_1.IMAGE_REGEX)) {
            throw new common_1.BadRequestException('INVALID_FORMAT_IMAGE');
        }
        if (file.size > this.MAX_FILE_SIZE) {
            throw new common_1.BadRequestException('MAX_SIZE_WARNING');
        }
        return await this.uploadFileWithCloudinary(file);
    }
    async uploadFileWithPathCloudinary(dto) {
        try {
            cloudinary_1.v2.config({
                cloud_name: this.cloudinary_name,
                api_key: this.cloudinary_api_key,
                api_secret: this.cloudinary_api_secret,
            });
            const uploadFile = await cloudinary_1.v2.uploader.upload(dto.path);
            return {
                url: uploadFile.secure_url,
                public_id: uploadFile.public_id,
                version: uploadFile.version,
                created_at: uploadFile.created_at,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async uploadVideoWithCloudinary(file) {
        if (!file)
            throw new common_1.BadRequestException('FILE_NOT_FOUND');
        if (!file.mimetype.match(utils_1.VIDEO_REGEX)) {
            throw new common_1.BadRequestException('INVALID_FORMAT_VIDEO');
        }
        if (file.size > this.MAX_FILE_SIZE) {
            throw new common_1.BadRequestException('MAX_SIZE_WARNING');
        }
        return await this.uploadFileWithCloudinary(file);
    }
    async deleteFileWithCloudinary(dto) {
        const imageName = dto.path
            .replace(this.cloudinary_base_url, '')
            .replace(/[\w]*\//i, '')
            .replace(/\.[^/.]+$/, '');
        try {
            cloudinary_1.v2.config({
                cloud_name: this.cloudinary_name,
                api_key: this.cloudinary_api_key,
                api_secret: this.cloudinary_api_secret,
            });
            await cloudinary_1.v2.uploader.destroy(imageName);
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async uploadMultiFile(files) {
        let listFile = [];
        let listImages = [];
        if (files === null || files === void 0 ? void 0 : files.images) {
            listImages = await this.uploadV2(files === null || files === void 0 ? void 0 : files.images, {
                folderName: 'images',
            });
        }
        if (files === null || files === void 0 ? void 0 : files.files) {
            listFile = await this.uploadV2(files === null || files === void 0 ? void 0 : files.files, {
                folderName: 'files',
            });
        }
        return { files: listFile, images: listImages };
    }
    async uploadV2(filesIn, options) {
        const filesS3 = [];
        for (const file of filesIn) {
            const fileS3 = await this.uploadFileS3Ver2(file.buffer, file.originalname, options);
            filesS3.push(fileS3);
        }
        return filesS3;
    }
    async uploadFileS3Ver2(dataBuffer, filename, options) {
        let path = `${new Date().getTime()}-${filename}`;
        if (options === null || options === void 0 ? void 0 : options.folderName) {
            let newPath = options === null || options === void 0 ? void 0 : options.folderName.trim();
            if (path.slice(-1) != '/') {
                newPath = newPath + '/';
            }
            path = newPath + path;
        }
        const uploadResult = await this.s3
            .upload({
            Bucket: this.bucket_name,
            Body: dataBuffer,
            ACL: 'public-read',
            Key: path,
        })
            .promise();
        return uploadResult;
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map