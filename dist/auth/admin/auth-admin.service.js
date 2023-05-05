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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAdminService = void 0;
const entities_1 = require("../../database/entities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enums_1 = require("../../enums");
const regex_util_1 = require("../../utils/regex.util");
const typeorm_2 = require("typeorm");
const auth_service_1 = require("../auth.service");
const moment = require("moment");
const config_1 = require("@nestjs/config");
const admin_service_1 = require("./../../api/admin/admin.service");
let AuthAdminService = class AuthAdminService {
    constructor(staffRepository, authService, adminService, dataSource) {
        this.staffRepository = staffRepository;
        this.authService = authService;
        this.adminService = adminService;
        this.dataSource = dataSource;
        this.configService = new config_1.ConfigService();
    }
    async updateStaffByAdminId(staffId, data) {
        return this.staffRepository.update({ id: staffId }, data);
    }
    async register(userId, dto) {
        const { phone, email, name, gender } = dto;
        if (phone) {
            if (!phone.match(regex_util_1.PHONE_REGEX)) {
                throw new common_1.BadRequestException('INVALID_PHONE_NUMBER');
            }
        }
        if (email && !email.match(regex_util_1.EMAIL_REGEX)) {
            throw new common_1.BadRequestException('INVALID_EMAIL');
        }
        const staffPhoneExist = await this.adminService.findOneByPhone(phone);
        const staffEmailExist = await this.adminService.findOneByEmail(email);
        if (staffPhoneExist || staffEmailExist) {
            throw new common_1.BadRequestException('STAFF_ALREADY_EXIST');
        }
        const queryRunner = await this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const passwordHashed = await this.authService.hashData(dto.password);
            const staffCred = new entities_1.Staff();
            staffCred.password = passwordHashed;
            staffCred.fullName = name;
            staffCred.phone = phone;
            staffCred.email = email;
            staffCred.gender = gender;
            staffCred.createdBy = userId;
            const staff = await this.staffRepository.save(staffCred);
            delete staff.createdAt;
            delete staff.updatedAt;
            delete staff.deletedAt;
            delete staff.createdBy;
            delete staff.updatedBy;
            delete staff.password;
            await queryRunner.commitTransaction();
            return staff;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            return err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async login(dto) {
        const { email, phone } = dto;
        if (!email && !phone) {
            throw new common_1.BadRequestException('EMAIL_OR_PHONE_REQUIRED');
        }
        let staffExist;
        if (email) {
            staffExist = await this.adminService.findOneByEmail(email, {
                select: {
                    password: true,
                },
            });
        }
        else if (phone) {
            staffExist = await this.adminService.findOneByPhone(phone, {
                select: {
                    password: true,
                },
            });
        }
        if (!staffExist || !(staffExist === null || staffExist === void 0 ? void 0 : staffExist.password)) {
            throw new common_1.BadRequestException('INVALID_USERNAME_OR_PASSWORD');
        }
        const isPasswordMatches = await this.authService.comparePassword(dto.password, staffExist.password);
        if (!isPasswordMatches) {
            throw new common_1.BadRequestException('INVALID_USERNAME_OR_PASSWORD');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const tokens = await this.authService.createTokens(staffExist, enums_1.RoleEnum.STAFF);
            await this.updateStaffByAdminId(staffExist.id, {
                refreshToken: tokens.refresh_token,
                accessToken: tokens.access_token,
                lastLogin: new Date(),
            });
            await queryRunner.commitTransaction();
            return tokens;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            return err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async logout(staffId) {
        return await this.updateStaffByAdminId(staffId, {
            refreshToken: null,
            accessToken: null,
        });
    }
    async refreshToken(refreshToken) {
        const staffExist = await this.adminService.findOneByRefreshToken(refreshToken);
        if (!staffExist || !staffExist.refreshToken) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        const tokens = await this.authService.createTokens(staffExist, enums_1.RoleEnum.STAFF);
        await this.updateStaffByAdminId(staffExist.id, {
            refreshToken: tokens.refresh_token,
            accessToken: tokens.access_token,
        });
        return tokens;
    }
    async sendOtp(dto) {
        const { oldEmail: email, phone: phone } = dto;
        let staff;
        if (email) {
            staff = await this.adminService.findOneByEmail(email);
        }
        else if (phone) {
            staff = await this.adminService.findOneByPhone(phone);
        }
        else {
            throw new common_1.BadRequestException('EMAIL_OR_PHONE_REQUIRED');
        }
        if (!staff) {
            throw new common_1.BadRequestException('USER_NOT_FOUND');
        }
        const otpCode = Math.floor(100000 + Math.random() * 900000) + '';
        const otpExpiredTime = this.configService.get('OTP_EXPIRE_MINUTE');
        const otpExpired = moment().add(otpExpiredTime, 'minutes').toDate();
        const saveCustomer = await this.adminService.updateOtp(staff.id, otpCode, otpExpired);
        if (!saveCustomer) {
            throw new common_1.BadRequestException('SEND_OTP_FAILED');
        }
        if (email) {
            await this.authService.sendEmailCodeOtp(email, otpCode, otpExpiredTime);
        }
        else {
            await this.authService.sendPhoneCodeOtp(phone, otpCode);
        }
        return {
            customer: {
                id: staff.id,
            },
            message: 'Gửi mã OTP thành công',
        };
    }
};
AuthAdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Staff)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService,
        admin_service_1.AdminService,
        typeorm_2.DataSource])
], AuthAdminService);
exports.AuthAdminService = AuthAdminService;
//# sourceMappingURL=auth-admin.service.js.map