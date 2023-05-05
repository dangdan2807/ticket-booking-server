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
exports.AdminService = void 0;
const enums_1 = require("./../../enums");
const auth_service_1 = require("./../../auth/auth.service");
const entities_1 = require("./../../database/entities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AdminService = class AdminService {
    constructor(adminRepository, authService) {
        this.adminRepository = adminRepository;
        this.authService = authService;
    }
    checkOTP(sendOTP, dbOTP, otpTime) {
        if (!dbOTP) {
            throw new common_1.BadRequestException('OTP_INVALID');
        }
        if (new Date() > otpTime) {
            throw new common_1.BadRequestException('OTP_EXPIRED');
        }
        if (sendOTP !== dbOTP) {
            throw new common_1.BadRequestException('OTP_INVALID');
        }
    }
    async findOneAdmin(options) {
        return await this.adminRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), relations: Object.assign({}, options === null || options === void 0 ? void 0 : options.relations), select: Object.assign({ id: true, lastLogin: true, isActive: true, phone: true, email: true, fullName: true, gender: true, address: true, note: true, birthDay: true, code: true, createdAt: true }, options === null || options === void 0 ? void 0 : options.select) }, options === null || options === void 0 ? void 0 : options.other));
    }
    async findOneById(id, options) {
        if (!id) {
            throw new common_1.BadRequestException('ID_REQUIRED');
        }
        if (options) {
            options.where = Object.assign({ id }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { id } };
        }
        return await this.findOneAdmin(options);
    }
    async findOneByPhone(phone, options) {
        if (!phone) {
            throw new common_1.BadRequestException('PHONE_REQUIRED');
        }
        if (options) {
            options.where = Object.assign({ phone }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { phone } };
        }
        return await this.findOneAdmin(options);
    }
    async findOneByEmail(email, options) {
        if (!email) {
            throw new common_1.BadRequestException('EMAIL_REQUIRED');
        }
        if (options) {
            options.where = Object.assign({ email }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { email } };
        }
        return await this.findOneAdmin(options);
    }
    async findOneByRefreshToken(refreshToken, options) {
        if (!refreshToken) {
            throw new common_1.BadRequestException('REFRESH_TOKEN_REQUIRED');
        }
        if (options) {
            options.where = Object.assign(Object.assign({ refreshToken }, options === null || options === void 0 ? void 0 : options.where), { select: Object.assign({ refreshToken: true, accessToken: true }, options === null || options === void 0 ? void 0 : options.select) });
        }
        else {
            options = {
                where: { refreshToken },
                select: {
                    refreshToken: true,
                    accessToken: true,
                },
            };
        }
        return await this.findOneAdmin(options);
    }
    async getAdminById(id, options) {
        const staffExist = await this.findOneById(id, options);
        if (!staffExist) {
            throw new common_1.BadRequestException('USER_NOT_FOUND');
        }
        return staffExist;
    }
    async profile(adminId) {
        const staffExist = this.findOneById(adminId);
        return staffExist;
    }
    async updatePassword(id, dto) {
        const userExist = await this.findOneById(id);
        if (!userExist) {
            throw new common_1.BadRequestException('USER_NOT_FOUND');
        }
        if (!userExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const isPasswordMatches = await this.authService.comparePassword(dto === null || dto === void 0 ? void 0 : dto.oldPassword, userExist === null || userExist === void 0 ? void 0 : userExist.password);
        if (!isPasswordMatches) {
            throw new common_1.BadRequestException('OLD_PASSWORD_MISMATCH');
        }
        if ((dto === null || dto === void 0 ? void 0 : dto.newPassword) !== (dto === null || dto === void 0 ? void 0 : dto.confirmNewPassword)) {
            throw new common_1.BadRequestException('PASSWORD_NEW_NOT_MATCH');
        }
        const passwordHash = await this.authService.hashData(dto.newPassword);
        return await this.adminRepository.update({ id: userExist.id }, { password: passwordHash, updatedBy: userExist.id });
    }
    async updateOtp(id, otpCode, otpExpired, otpType) {
        const admin = await this.getAdminById(id);
        admin.otpCode = otpCode;
        admin.otpExpired = otpExpired;
        if (otpType && otpType === enums_1.ActiveOtpTypeEnum.RESET_PASSWORD) {
            admin.noteStatus = enums_1.ActiveOtpTypeEnum.RESET_PASSWORD;
        }
        const saveCustomer = await this.adminRepository.save(admin);
        return saveCustomer;
    }
    async updateActive(id) {
        const admin = await this.getAdminById(id);
        if (admin.isActive) {
            throw new common_1.BadRequestException('USER_ALREADY_ACTIVE');
        }
        admin.isActive = true;
        admin.otpCode = null;
        admin.otpExpired = null;
        const saveCustomer = await this.adminRepository.save(admin);
        return saveCustomer;
    }
    async confirmAccount(dto) {
        const { phone, email, otp, type } = dto;
        if (!phone && !email) {
            throw new common_1.BadRequestException('EMAIL_OR_PHONE_REQUIRED');
        }
        if (!otp) {
            throw new common_1.BadRequestException('OTP_REQUIRED');
        }
        let staff;
        if (phone) {
            staff = await this.findOneByPhone(phone, {
                select: {
                    otpCode: true,
                    otpExpired: true,
                },
            });
        }
        else if (email) {
            staff = await this.findOneByEmail(email, {
                select: {
                    otpCode: true,
                    otpExpired: true,
                },
            });
        }
        if (!staff) {
            throw new common_1.BadRequestException('USER_NOT_FOUND');
        }
        if (type) {
            throw new common_1.BadRequestException('OTP_TYPE_IS_REQUIRED');
        }
        this.checkOTP(otp, staff.otpCode, staff.otpExpired);
        let saveStaff;
        if (type === enums_1.ActiveOtpTypeEnum.ACTIVE) {
            saveStaff = await this.updateActive(staff.id);
        }
        else if (type === enums_1.ActiveOtpTypeEnum.RESET_PASSWORD) {
            saveStaff = await this.updateOtp(staff.id, null, null, enums_1.ActiveOtpTypeEnum.RESET_PASSWORD);
        }
        return {
            customer: {
                id: saveStaff.id,
            },
            message: 'Kích hoạt tài khoản thành công',
        };
    }
    async resetPassword(dto) {
        const { phone, email, otp, newPassword, confirmNewPassword } = dto;
        if (!phone && !email) {
            throw new common_1.BadRequestException('EMAIL_OR_PHONE_REQUIRED');
        }
        if (!otp) {
            throw new common_1.BadRequestException('OTP_REQUIRED');
        }
        if (!newPassword) {
            throw new common_1.BadRequestException('NEW_PASSWORD_REQUIRED');
        }
        if (!confirmNewPassword) {
            throw new common_1.BadRequestException('CONFIRM_NEW_PASSWORD_REQUIRED');
        }
        let admin;
        if (phone) {
            admin = await this.findOneByPhone(phone, {
                select: {
                    otpCode: true,
                    otpExpired: true,
                },
            });
        }
        else if (email) {
            admin = await this.findOneByEmail(email, {
                select: {
                    otpCode: true,
                    otpExpired: true,
                },
            });
        }
        if (!admin) {
            throw new common_1.BadRequestException('USER_NOT_FOUND');
        }
        this.checkOTP(otp, admin.otpCode, admin.otpExpired);
        if (newPassword !== confirmNewPassword)
            throw new common_1.BadRequestException('PASSWORD_NEW_NOT_MATCH');
        const passwordHash = await this.authService.hashData(newPassword);
        admin.password = passwordHash;
        admin.updatedBy = admin.id;
        admin.otpCode = null;
        admin.otpExpired = null;
        admin.refreshToken = null;
        admin.accessToken = null;
        const saveCustomer = await this.adminRepository.save(admin);
        delete saveCustomer.password;
        delete saveCustomer.updatedBy;
        delete saveCustomer.refreshToken;
        delete saveCustomer.accessToken;
        return saveCustomer;
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Staff)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map