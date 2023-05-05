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
exports.UserService = void 0;
const enums_1 = require("./../../enums");
const entities_1 = require("./../../database/entities");
const auth_service_1 = require("./../../auth/auth.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const customer_service_1 = require("../customer/customer.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let UserService = class UserService {
    constructor(customerRepository, customerService, authService) {
        this.customerRepository = customerRepository;
        this.customerService = customerService;
        this.authService = authService;
    }
    async getCustomerStatus() {
        return this.customerService.getCustomerStatus();
    }
    async profile(id) {
        const userExist = this.customerService.getCustomerById(id);
        if (!userExist) {
            throw new common_1.UnauthorizedException('USER_NOT_FOUND');
        }
        return userExist;
    }
    async updatePassword(id, dto) {
        const userExist = await this.customerService.getCustomerById(id, {
            select: { password: true },
        });
        if (!userExist) {
            throw new common_1.BadRequestException('USER_NOT_FOUND');
        }
        if ((userExist === null || userExist === void 0 ? void 0 : userExist.status) === enums_1.UserStatusEnum.INACTIVATE) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        if (!(dto === null || dto === void 0 ? void 0 : dto.oldPassword)) {
            throw new common_1.BadRequestException('OLD_PASSWORD_REQUIRED');
        }
        if (!(dto === null || dto === void 0 ? void 0 : dto.newPassword)) {
            throw new common_1.BadRequestException('NEW_PASSWORD_REQUIRED');
        }
        if (!(dto === null || dto === void 0 ? void 0 : dto.confirmNewPassword)) {
            throw new common_1.BadRequestException('CONFIRM_NEW_PASSWORD_REQUIRED');
        }
        const isPasswordMatches = await this.authService.comparePassword(dto === null || dto === void 0 ? void 0 : dto.oldPassword, userExist === null || userExist === void 0 ? void 0 : userExist.password);
        if (!isPasswordMatches)
            throw new common_1.BadRequestException('PASSWORD_OLD_NOT_MATCH');
        if ((dto === null || dto === void 0 ? void 0 : dto.newPassword) !== (dto === null || dto === void 0 ? void 0 : dto.confirmNewPassword))
            throw new common_1.BadRequestException('PASSWORD_NEW_NOT_MATCH');
        if ((dto === null || dto === void 0 ? void 0 : dto.oldPassword) === (dto === null || dto === void 0 ? void 0 : dto.newPassword)) {
            throw new common_1.BadRequestException('PASSWORD_NEW_SAME_OLD');
        }
        const passwordHash = await this.authService.hashData(dto.newPassword);
        userExist.password = passwordHash;
        userExist.updatedBy = userExist.id;
        const saveCustomer = await this.customerRepository.save(userExist);
        delete saveCustomer.password;
        delete saveCustomer.updatedBy;
        delete saveCustomer.refreshToken;
        delete saveCustomer.accessToken;
        return saveCustomer;
    }
    async updateCustomer(id, dto, userId) {
        return await this.customerService.updateCustomer(id, dto, userId);
    }
    async resetPassword(dto) {
        const { phone, email, newPassword, confirmNewPassword } = dto;
        if (!phone && !email) {
            throw new common_1.BadRequestException('EMAIL_OR_PHONE_REQUIRED');
        }
        if (!newPassword) {
            throw new common_1.BadRequestException('NEW_PASSWORD_REQUIRED');
        }
        if (!confirmNewPassword) {
            throw new common_1.BadRequestException('CONFIRM_NEW_PASSWORD_REQUIRED');
        }
        let customer;
        if (phone) {
            customer = await this.customerService.findOneByPhone(phone, {
                select: { noteStatus: true },
            });
        }
        else if (email) {
            customer = await this.customerService.findOneByEmail(email, {
                select: { noteStatus: true },
            });
        }
        if (!customer) {
            throw new common_1.BadRequestException('USER_NOT_FOUND');
        }
        if (customer.status === enums_1.UserStatusEnum.INACTIVATE) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        if (customer.noteStatus !== enums_1.ActiveOtpTypeEnum.RESET_PASSWORD) {
            throw new common_1.BadRequestException('USER_NOT_RESET_PASSWORD');
        }
        if (newPassword !== confirmNewPassword)
            throw new common_1.BadRequestException('PASSWORD_NEW_NOT_MATCH');
        const passwordHash = await this.authService.hashData(newPassword);
        customer.password = passwordHash;
        customer.updatedBy = customer.id;
        customer.refreshToken = null;
        customer.accessToken = null;
        const saveCustomer = await this.customerRepository.save(customer);
        delete saveCustomer.password;
        delete saveCustomer.updatedBy;
        delete saveCustomer.refreshToken;
        delete saveCustomer.accessToken;
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
        let customer;
        if (phone) {
            customer = await this.customerService.findOneByPhone(phone, {
                select: {
                    otpCode: true,
                    otpExpired: true,
                },
            });
        }
        else if (email) {
            customer = await this.customerService.findOneByEmail(email, {
                select: {
                    otpCode: true,
                    otpExpired: true,
                },
            });
        }
        if (!customer) {
            throw new common_1.BadRequestException('USER_NOT_FOUND');
        }
        if (!type) {
            throw new common_1.BadRequestException('OTP_TYPE_IS_REQUIRED');
        }
        this.checkOTP(otp, customer.otpCode, customer.otpExpired);
        let saveCustomer;
        if (type === enums_1.ActiveOtpTypeEnum.ACTIVE) {
            saveCustomer = await this.customerService.updateActive(customer.id);
        }
        else if (type === enums_1.ActiveOtpTypeEnum.RESET_PASSWORD) {
            saveCustomer = await this.customerService.updateOtp(customer.id, null, null, enums_1.ActiveOtpTypeEnum.RESET_PASSWORD);
        }
        return {
            customer: {
                id: saveCustomer.id,
            },
            message: 'Kích hoạt tài khoản thành công',
        };
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
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    (0, swagger_1.ApiTags)('User'),
    __param(0, (0, typeorm_2.InjectRepository)(entities_1.Customer)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        customer_service_1.CustomerService,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map