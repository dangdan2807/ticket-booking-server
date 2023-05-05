"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
exports.CloudinaryProvider = {
    provide: 'Cloudinary',
    useFactory() {
        return cloudinary_1.v2.config({
            cloud_name: 'dangdan2807',
            api_key: '275291133989876',
            api_secret: 'y9C2RPdrzLxPH4-p_Z-V3bKtsJs',
        });
    },
};
//# sourceMappingURL=cloudinary.provider.js.map