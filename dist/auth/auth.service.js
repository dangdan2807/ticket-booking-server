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
exports.AuthService = void 0;
const enums_1 = require("./../enums");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const typeorm_1 = require("typeorm");
const entities_1 = require("../database/entities");
const twilio_1 = require("twilio");
const nodemailer = require("nodemailer");
const utils_1 = require("./../utils");
let AuthService = class AuthService {
    constructor(configService, dataSource) {
        this.configService = configService;
        this.dataSource = dataSource;
        this.jwtService = new jwt_1.JwtService();
        this.twilioClient = new twilio_1.Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }
    async validateUser(email, password) {
        let user;
        const staff = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { email, deletedAt: null } });
        if (!staff) {
            user = await this.dataSource
                .getRepository(entities_1.Customer)
                .findOne({ where: { email, deletedAt: null } });
        }
        if (!staff && !user) {
            throw new common_1.UnauthorizedException('WRONG_CREDENTIALS');
        }
        const isMatch = await this.comparePassword(password, staff ? staff['password'] : user['password']);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('WRONG_CREDENTIALS');
        }
        return staff ? staff : user;
    }
    async comparePassword(data, encrypted) {
        return new Promise(async (resolve) => {
            await bcrypt.compare(data, encrypted, async (err, isMatch) => {
                if (err)
                    return err;
                resolve(isMatch);
            });
        });
    }
    async validateUserByJwt(payload) {
        let user;
        let access_token;
        if (payload.type === enums_1.RoleEnum.STAFF) {
            user = await this.dataSource.getRepository(entities_1.Staff).findOne({
                where: { id: payload.id, deletedAt: null },
            });
            access_token = user.accessToken;
        }
        if (payload.type === enums_1.RoleEnum.CUSTOMER) {
            user = await this.dataSource
                .getRepository(entities_1.Customer)
                .findOne({ where: { id: payload.id, deletedAt: null } });
            access_token = user.accessToken;
        }
        if (!user) {
            throw new common_1.UnauthorizedException('WRONG_CREDENTIALS');
        }
        return {
            id: user.id,
            email: user.email,
            access_token,
        };
    }
    async hashData(data) {
        return bcrypt.hashSync(data, await bcrypt.genSalt());
    }
    async createTokens(user, type) {
        const data = {
            id: user.id,
            email: user.email,
            type: type,
        };
        const [at, rt] = await Promise.all([
            await this.jwtService.signAsync(data, {
                secret: this.configService.get('JWT_ACCESS_SECRET_KEY'),
                expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
            }),
            await this.jwtService.signAsync(data, {
                secret: this.configService.get('JWT_REFRESH_SECRET_KEY'),
                expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
    async sendPhoneCodeOtp(phoneNumber, code) {
        const companyName = this.configService.get('COMPANY_NAME');
        try {
            const message = `${companyName} - Mã OTP của bạn là: ${code}`;
            const response = await this.twilioClient.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: `+84${phoneNumber.slice(1)}`,
            });
            return response;
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('SEND_SMS_FAILED');
        }
    }
    async sendEmailCodeOtp(email, otp, otpExpireMinute) {
        const fromEmail = this.configService.get('EMAIL');
        const companyName = this.configService.get('COMPANY_NAME');
        const transporter = nodemailer.createTransport({
            host: this.configService.get('SMTP_HOST'),
            port: this.configService.get('SMTP_PORT'),
            secure: false,
            auth: {
                user: fromEmail,
                pass: this.configService.get('EMAIL_PASSWORD'),
            },
        });
        const options = {
            from: fromEmail,
            to: email,
            subject: `${companyName} - Mã OTP xác nhận`,
            html: (0, utils_1.templateHtml)(otp, otpExpireMinute),
        };
        await transporter.sendMail(options);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_1.DataSource])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map