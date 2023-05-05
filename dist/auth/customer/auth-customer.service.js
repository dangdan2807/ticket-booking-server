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
exports.AuthCustomerService = void 0;
const customer_service_1 = require("../../api/customer/customer.service");
const entities_1 = require("../../database/entities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enums_1 = require("../../enums");
const typeorm_2 = require("typeorm");
const auth_service_1 = require("../auth.service");
const utils_1 = require("./../../utils");
const moment = require("moment");
const config_1 = require("@nestjs/config");
moment.locale('vi');
let AuthCustomerService = class AuthCustomerService {
    constructor(userRepository, authService, customerService, dataSource) {
        this.userRepository = userRepository;
        this.authService = authService;
        this.customerService = customerService;
        this.dataSource = dataSource;
        this.configService = new config_1.ConfigService();
    }
    async updateUserCredentialByUserId(userId, data) {
        return this.userRepository.update({ id: userId }, data);
    }
    async register(dto) {
        const { email, fullName, gender, birthday, phone, wardCode, address, isOtp, } = dto;
        if (email) {
            const userEmailExist = await this.customerService.findOneByEmail(email);
            if (userEmailExist) {
                throw new common_1.BadRequestException('EMAIL_ALREADY_EXIST');
            }
        }
        else if (phone) {
            const userPhoneExist = await this.customerService.findOneByPhone(phone);
            if (userPhoneExist) {
                throw new common_1.BadRequestException('PHONE_ALREADY_EXIST');
            }
        }
        else {
            throw new common_1.BadRequestException('EMAIL_OR_PHONE_REQUIRED');
        }
        const queryRunner = await this.dataSource.createQueryRunner();
        let saveUser;
        const otpCode = Math.floor(100000 + Math.random() * 900000) + '';
        const otpExpiredTime = this.configService.get('OTP_EXPIRE_MINUTE');
        const otpExpired = moment().add(otpExpiredTime, 'minutes').toDate();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const passwordHashed = await this.authService.hashData(dto.password);
            const ward = await this.dataSource.getRepository(entities_1.Ward).findOne({
                where: { code: wardCode ? wardCode : 0 },
                relations: { district: { province: true } },
            });
            if (!ward) {
                throw new common_1.BadRequestException('WARD_NOT_FOUND');
            }
            let code = (0, utils_1.generateCustomerCode)();
            let flag = true;
            while (flag) {
                const customerExist = await this.customerService.findOneByCode(code);
                if (!customerExist) {
                    flag = false;
                }
                else {
                    code = (0, utils_1.generateCustomerCode)();
                }
            }
            const user = new entities_1.Customer();
            user.code = code;
            user.password = passwordHashed;
            user.fullName = fullName;
            user.phone = phone;
            user.email = email;
            user.ward = ward;
            if (address) {
                user.address = address;
            }
            else {
                user.address = 'Không xác định';
            }
            if (wardCode) {
                user.fullAddress = `${address}, ${ward.name}, ${ward.district.name}, ${ward.district.province.name}`;
            }
            else {
                user.fullAddress = 'Không xác định';
            }
            if (!gender) {
                user.gender = enums_1.GenderEnum.OTHER;
            }
            else {
                user.gender = gender;
            }
            if (birthday) {
                user.birthday = birthday;
            }
            else {
                user.birthday = new Date('01-01-1970');
            }
            user.status = enums_1.UserStatusEnum.INACTIVATE;
            user.otpCode = otpCode;
            user.otpExpired = otpExpired;
            await queryRunner.commitTransaction();
            saveUser = await this.userRepository.save(user);
            delete saveUser.createdAt;
            delete saveUser.updatedAt;
            delete saveUser.deletedAt;
            delete saveUser.updatedBy;
            delete saveUser.password;
            delete saveUser.refreshToken;
            delete saveUser.accessToken;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            return err;
        }
        finally {
            await queryRunner.release();
        }
        if (isOtp) {
            if (email) {
                await this.authService.sendEmailCodeOtp(email, otpCode, otpExpiredTime);
            }
            else {
                await this.authService.sendPhoneCodeOtp(phone, otpCode);
            }
        }
        return saveUser;
    }
    async login(dto) {
        const { email, phone, password } = dto;
        let customer;
        if (!email && !phone) {
            throw new common_1.BadRequestException('EMAIL_OR_PHONE_REQUIRED');
        }
        if (email) {
            customer = await this.customerService.findOneByEmail(email, {
                select: {
                    id: true,
                    password: true,
                },
            });
        }
        else if (phone) {
            customer = await this.customerService.findOneByPhone(phone, {
                select: {
                    id: true,
                    password: true,
                },
            });
        }
        if (!customer || !(customer === null || customer === void 0 ? void 0 : customer.password)) {
            throw new common_1.BadRequestException('INVALID_USERNAME_OR_PASSWORD');
        }
        const isPasswordMatches = await this.authService.comparePassword(password, customer === null || customer === void 0 ? void 0 : customer.password);
        if (!isPasswordMatches) {
            throw new common_1.BadRequestException('INVALID_USERNAME_OR_PASSWORD');
        }
        const tokens = await this.authService.createTokens(customer, enums_1.RoleEnum.CUSTOMER);
        await this.updateUserCredentialByUserId(customer.id, {
            refreshToken: tokens.refresh_token,
            accessToken: tokens.access_token,
            lastLogin: new Date(),
        });
        return tokens;
    }
    async logout(userId) {
        return await this.updateUserCredentialByUserId(userId, {
            refreshToken: null,
            accessToken: null,
        });
    }
    async refreshTokens(refreshToken) {
        const userExist = await this.customerService.findCustomerByRefreshToken(refreshToken);
        if (!userExist || !userExist.refreshToken)
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        const tokens = await this.authService.createTokens(userExist, enums_1.RoleEnum.CUSTOMER);
        await this.updateUserCredentialByUserId(userExist.id, {
            refreshToken: tokens.refresh_token,
            accessToken: tokens.access_token,
        });
        return tokens;
    }
    async sendOtp(dto) {
        const { oldEmail, newEmail, phone } = dto;
        if (!oldEmail && !phone) {
            throw new common_1.BadRequestException('EMAIL_OR_PHONE_REQUIRED');
        }
        let customer;
        if (oldEmail) {
            customer = await this.customerService.findOneByEmail(oldEmail);
        }
        else if (phone) {
            customer = await this.customerService.findOneByPhone(phone);
        }
        else {
            throw new common_1.BadRequestException('EMAIL_OR_PHONE_REQUIRED');
        }
        if (!customer) {
            throw new common_1.BadRequestException('USER_NOT_FOUND');
        }
        const otpCode = Math.floor(100000 + Math.random() * 900000) + '';
        const otpExpiredTime = this.configService.get('OTP_EXPIRE_MINUTE');
        const otpExpired = moment().add(otpExpiredTime, 'minutes').toDate();
        const saveCustomer = await this.customerService.updateOtp(customer.id, otpCode, otpExpired);
        if (!saveCustomer) {
            throw new common_1.BadRequestException('SEND_OTP_FAILED');
        }
        if (oldEmail || newEmail) {
            await this.authService.sendEmailCodeOtp(newEmail || oldEmail, otpCode, otpExpiredTime);
        }
        else {
            if (newEmail) {
                await this.authService.sendEmailCodeOtp(newEmail, otpCode, otpExpiredTime);
            }
            else {
                await this.authService.sendPhoneCodeOtp(phone, otpCode);
            }
        }
        return {
            customer: {
                id: customer.id,
            },
            message: 'Gửi mã OTP thành công',
        };
    }
};
AuthCustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService,
        customer_service_1.CustomerService,
        typeorm_2.DataSource])
], AuthCustomerService);
exports.AuthCustomerService = AuthCustomerService;
//# sourceMappingURL=auth-customer.service.js.map