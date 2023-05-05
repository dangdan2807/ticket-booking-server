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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const customer_service_1 = require("./../../api/customer/customer.service");
const entities_1 = require("./../../database/entities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enums_1 = require("./../../enums");
const regex_util_1 = require("../../utils/regex.util");
const typeorm_2 = require("typeorm");
const auth_service_1 = require("../auth.service");
let AuthUserService = class AuthUserService {
    constructor(userRepository, authService, customerService, dataSource) {
        this.userRepository = userRepository;
        this.authService = authService;
        this.customerService = customerService;
        this.dataSource = dataSource;
    }
    async updateUserCredentialByUserId(userId, data) {
        return this.userRepository.update({ id: userId }, data);
    }
    async register(dto) {
        if (!dto.phone.match(regex_util_1.PHONE_REGEX)) {
            throw new common_1.BadRequestException('INVALID_PHONE_NUMBER');
        }
        if (dto.email && !dto.email.match(regex_util_1.EMAIL_REGEX)) {
            throw new common_1.BadRequestException('INVALID_EMAIL');
        }
        const userExist = await this.customerService.findOneByEmail(dto.email);
        if (userExist) {
            throw new common_1.BadRequestException('USERNAME_ALREADY_EXIST');
        }
        const queryRunner = await this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const passwordHashed = await this.authService.hashData(dto.password);
            const user = new entities_1.Customer();
            user.password = passwordHashed;
            user.fullName = dto.name;
            user.phone = dto.phone;
            user.email = dto.email;
            user.gender = dto.gender;
            user.birthday = dto.birthday;
            await queryRunner.commitTransaction();
            const userCreated = await this.userRepository.save(user);
            const { createdAt, updatedAt, deletedAt, updatedBy, password } = userCreated, newUser = __rest(userCreated, ["createdAt", "updatedAt", "deletedAt", "updatedBy", "password"]);
            return newUser;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            return err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async profile(id) {
        const userExist = this.customerService.findOneById(id);
        if (!userExist)
            throw new common_1.BadRequestException('USER_NOT_FOUND');
        return userExist;
    }
    async login(dto) {
        const userExist = await this.customerService.findOneByEmail(dto.email);
        if (!userExist) {
            throw new common_1.BadRequestException('INVALID_USERNAME_OR_PASSWORD');
        }
        if (!(userExist === null || userExist === void 0 ? void 0 : userExist.password)) {
            throw new common_1.BadRequestException('INVALID_USERNAME_OR_PASSWORD');
        }
        const isPasswordMatches = await this.authService.comparePassword(dto === null || dto === void 0 ? void 0 : dto.password, userExist === null || userExist === void 0 ? void 0 : userExist.password);
        if (!isPasswordMatches) {
            throw new common_1.BadRequestException('INVALID_USERNAME_OR_PASSWORD');
        }
        const queryRunner = await this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const tokens = await this.authService.createTokens(userExist, enums_1.RoleEnum.CUSTOMER);
            await this.updateUserCredentialByUserId(userExist.id, {
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
    async logout(userId) {
        return await this.updateUserCredentialByUserId(userId, {
            refreshToken: null,
            accessToken: null,
        });
    }
    async refreshTokens(refreshToken) {
        const userExist = await this.customerService.findOneByRefreshToken(refreshToken);
        if (!userExist || !userExist.refreshToken)
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        const tokens = await this.authService.createTokens(userExist, enums_1.RoleEnum.CUSTOMER);
        await this.updateUserCredentialByUserId(userExist.id, {
            refreshToken: tokens.refresh_token,
            accessToken: tokens.access_token,
        });
        return tokens;
    }
};
AuthUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService,
        customer_service_1.CustomerService,
        typeorm_2.DataSource])
], AuthUserService);
exports.AuthUserService = AuthUserService;
//# sourceMappingURL=user.service.js.map