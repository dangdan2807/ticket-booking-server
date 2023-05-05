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
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
const utils_1 = require("./../../utils");
let OtpService = class OtpService {
    constructor(configService) {
        this.configService = configService;
    }
    async sendMail(to, otp, otpExpireMinute) {
        const transporter = nodemailer.createTransport({
            host: this.configService.get('SMTP_HOST'),
            port: this.configService.get('SMTP_PORT'),
            secure: false,
            auth: {
                user: this.configService.get('EMAIL'),
                pass: this.configService.get('EMAIL_PASSWORD'),
            },
        });
        await transporter.sendMail({
            from: this.configService.get('SMTP_USER'),
            to,
            subject: 'PD Bus - Mã OTP xác nhận',
            html: (0, utils_1.templateHtml)(otp, otpExpireMinute),
        });
    }
};
OtpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], OtpService);
exports.OtpService = OtpService;
//# sourceMappingURL=otp.service.js.map