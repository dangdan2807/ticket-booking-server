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
exports.StaffService = void 0;
const staff_entities_1 = require("../../database/entities/staff.entities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enums_1 = require("../../enums");
const regex_util_1 = require("../../utils/regex.util");
const typeorm_2 = require("typeorm");
const auth_service_1 = require("../auth.service");
let StaffService = class StaffService {
    constructor(staffRepository, authService, dataSource) {
        this.staffRepository = staffRepository;
        this.authService = authService;
        this.dataSource = dataSource;
    }
    async findOneById(id, options) {
        return this.staffRepository.findOne(Object.assign({ where: { id } }, options));
    }
    async findOneByUsername(username, options) {
        return this.staffRepository.findOne(Object.assign({ where: { email: username } }, options));
    }
    async updateAdminCredentialByAdminId(staffId, data) {
    }
    async register(userId, dto) {
        if (!dto.phone.match(regex_util_1.PHONE_REGEX))
            throw new common_1.BadRequestException('INVALID_PHONE_NUMBER');
        if (dto.email && !dto.email.match(regex_util_1.EMAIL_REGEX))
            throw new common_1.BadRequestException('INVALID_EMAIL');
        const staffExist = await this.findOneByUsername(dto.email);
        if (staffExist) {
            throw new common_1.BadRequestException('USERNAME_ALREADY_EXIST');
        }
        const queryRunner = await this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const passwordHashed = await this.authService.hashData(dto.password);
            const staffCred = new staff_entities_1.Staff();
            staffCred.password = passwordHashed;
            const admin = new staff_entities_1.Staff();
            admin.fullName = dto.name;
            admin.phone = dto.phone;
            admin.email = dto.email;
            admin.gender = dto.gender;
            const adminCreated = await this.staffRepository.save(admin);
            await queryRunner.commitTransaction();
            delete admin.createdAt;
            delete admin.updatedAt;
            return adminCreated;
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
        const adminExist = this.findOneById(id);
        if (!adminExist)
            throw new common_1.BadRequestException('USER_NOT_FOUND');
        return adminExist;
    }
    async login(dto) {
        const adminExist = await this.findOneByUsername(dto.username, {
            relations: ['adminUserCredential'],
        });
        if (!adminExist) {
            throw new common_1.BadRequestException('INVALID_USERNAME_OR_PASSWORD');
        }
        const isPasswordMatches = await this.authService.comparePassword(dto.password, adminExist.password);
        if (!isPasswordMatches) {
            throw new common_1.BadRequestException('INVALID_USERNAME_OR_PASSWORD');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.startTransaction();
            const tokens = await this.authService.createTokens(adminExist, enums_1.RoleEnum.STAFF);
            await queryRunner.commitTransaction();
            console.log(adminExist);
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
    async logout(adminId) {
    }
    async refreshTokens(adminId) {
        const adminExist = await this.findOneById(adminId, {
            relations: ['adminUserCredential'],
        });
        if (!adminExist || !adminExist.refreshToken)
            throw new common_1.UnauthorizedException();
        const tokens = await this.authService.createTokens(adminExist, enums_1.RoleEnum.STAFF);
        console.log(adminExist);
        return tokens;
    }
};
StaffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_entities_1.Staff)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService,
        typeorm_2.DataSource])
], StaffService);
exports.StaffService = StaffService;
//# sourceMappingURL=staff.service.js.map