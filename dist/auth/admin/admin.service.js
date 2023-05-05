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
exports.AuthAdminService = void 0;
const entities_1 = require("./../../database/entities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enums_1 = require("./../../enums");
const regex_util_1 = require("./../../utils/regex.util");
const typeorm_2 = require("typeorm");
const auth_service_1 = require("../auth.service");
let AuthAdminService = class AuthAdminService {
    constructor(staffRepository, authService, dataSource) {
        this.staffRepository = staffRepository;
        this.authService = authService;
        this.dataSource = dataSource;
    }
    async findOneById(id, options) {
        return this.staffRepository.findOne(Object.assign({ where: { id } }, options));
    }
    async findOneByRefreshToken(refreshToken, options) {
        return this.staffRepository.findOne(Object.assign({ where: { refreshToken } }, options));
    }
    async findOneByEmail(email, options) {
        return this.staffRepository.findOne(Object.assign({ where: { email: email.toLowerCase() } }, options));
    }
    async updateStaffByAdminId(staffId, data) {
        return this.staffRepository.update({ id: staffId }, data);
    }
    async register(userId, dto) {
        if (dto.phone) {
            if (!dto.phone.match(regex_util_1.PHONE_REGEX)) {
                throw new common_1.BadRequestException('INVALID_PHONE_NUMBER');
            }
        }
        if (dto.email && !dto.email.match(regex_util_1.EMAIL_REGEX)) {
            throw new common_1.BadRequestException('INVALID_EMAIL');
        }
        const staffExist = await this.findOneByEmail(dto.email);
        if (staffExist) {
            throw new common_1.BadRequestException('STAFF_ALREADY_EXIST');
        }
        const queryRunner = await this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const passwordHashed = await this.authService.hashData(dto.password);
            const staffCred = new entities_1.Staff();
            staffCred.password = passwordHashed;
            staffCred.fullName = dto.name;
            staffCred.phone = dto.phone;
            staffCred.email = dto.email;
            staffCred.gender = dto.gender;
            staffCred.createdBy = userId;
            staffCred.updatedBy = userId;
            const staffCreated = await this.staffRepository.save(staffCred);
            await queryRunner.commitTransaction();
            const { createdAt, updatedAt, deletedAt, createdBy, updatedBy, password } = staffCreated, staff = __rest(staffCreated, ["createdAt", "updatedAt", "deletedAt", "createdBy", "updatedBy", "password"]);
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
    async profile(id) {
        const staffExist = this.findOneById(id);
        if (!staffExist) {
            throw new common_1.BadRequestException('USER_NOT_FOUND');
        }
        return staffExist;
    }
    async login(dto) {
        const staffExist = await this.findOneByEmail(dto.email);
        if (!staffExist) {
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
        const staffExist = await this.findOneByRefreshToken(refreshToken);
        if (!staffExist || !staffExist.refreshToken) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        console.log(staffExist);
        const tokens = await this.authService.createTokens(staffExist, enums_1.RoleEnum.STAFF);
        await this.updateStaffByAdminId(staffExist.id, {
            refreshToken: tokens.refresh_token,
            accessToken: tokens.access_token,
        });
        return tokens;
    }
};
AuthAdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Staff)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService,
        typeorm_2.DataSource])
], AuthAdminService);
exports.AuthAdminService = AuthAdminService;
//# sourceMappingURL=admin.service.js.map