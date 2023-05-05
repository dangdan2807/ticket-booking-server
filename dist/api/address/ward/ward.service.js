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
exports.WardService = void 0;
const admin_service_1 = require("./../../admin/admin.service");
const enums_1 = require("./../../../enums");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const entities_1 = require("./../../../database/entities");
const typeorm_2 = require("typeorm");
let WardService = class WardService {
    constructor(wardRepository, adminService, dataSource) {
        this.wardRepository = wardRepository;
        this.adminService = adminService;
        this.dataSource = dataSource;
    }
    async findOneWard(options) {
        return await this.wardRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), select: Object.assign({ deletedAt: false }, options === null || options === void 0 ? void 0 : options.select), relations: Object.assign({}, options === null || options === void 0 ? void 0 : options.relations), order: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.orderBy) }, options === null || options === void 0 ? void 0 : options.other));
    }
    async findOneById(id, options) {
        if (options) {
            options.where = Object.assign({ id }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { id } };
        }
        return await this.findOneWard(options);
    }
    async findOneByCode(code, options) {
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOneWard(options);
    }
    async findByDistrictCode(districtCode, pagination) {
        const query = this.wardRepository.createQueryBuilder('w');
        query.where('w.districtCode = :districtCode', { districtCode });
        const total = await query.clone().getCount();
        const dataResult = await query
            .orderBy('w.code', enums_1.SortEnum.DESC)
            .offset(pagination.skip)
            .limit(pagination.take)
            .getMany();
        return { dataResult, pagination, total };
    }
    async getWardById(id) {
        const ward = await this.findOneById(id);
        if (!ward) {
            throw new common_1.BadRequestException('WARD_NOT_FOUND');
        }
        return ward;
    }
    async getWardByCode(code) {
        const ward = await this.findOneByCode(code);
        if (!ward) {
            throw new common_1.BadRequestException('WARD_NOT_FOUND');
        }
        return ward;
    }
    async findAll(dto, pagination) {
        const { name, type, codename, districtCode } = dto;
        const query = this.wardRepository.createQueryBuilder('w');
        if (name) {
            query.andWhere('w.name LIKE :name', { name: `%${name}%` });
        }
        if (type) {
            query.andWhere('w.type LIKE :type', { type: `%${type}%` });
        }
        if (codename) {
            query.andWhere('w.codename LIKE :codename', {
                codename: `%${codename}%`,
            });
        }
        if (districtCode) {
            query.andWhere('w.districtCode = :districtCode', { districtCode });
        }
        const total = await query.clone().getCount();
        const dataResult = await query
            .orderBy('w.code', 'ASC')
            .offset(pagination.skip)
            .limit(pagination.take)
            .getMany();
        return { dataResult, pagination, total };
    }
    async createWard(dto, userId) {
        const { code, codename, type, districtCode, name } = dto;
        const district = await this.dataSource.getRepository(entities_1.District).findOne({
            where: { code: districtCode },
        });
        if (!district) {
            throw new common_1.BadRequestException('DISTRICT_NOT_FOUND');
        }
        const wardExists = await this.findOneByCode(code, {
            withDeleted: true,
        });
        if (!wardExists) {
            throw new common_1.BadRequestException('WARD_CODE_ALREADY_EXIST');
        }
        const ward = new entities_1.Ward();
        ward.name = name;
        ward.type = type;
        ward.code = code;
        ward.codename = codename;
        ward.district = district;
        ward.districtCode = district.code;
        const adminExist = await this.adminService.findOneById(userId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (adminExist && !adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        ward.createdBy = adminExist.id;
        return await this.wardRepository.save(ward);
    }
    async updateById(id, dto, userId) {
        const { type, name, codename, districtCode } = dto;
        const ward = await this.findOneById(id);
        if (!ward) {
            throw new common_1.BadRequestException('WARD_NOT_FOUND');
        }
        if (name) {
            ward.name = name;
        }
        if (type) {
            ward.type = type;
        }
        if (codename) {
            ward.codename = codename;
        }
        if (districtCode) {
            const dist = await this.dataSource
                .getRepository(entities_1.District)
                .findOne({ where: { code: districtCode } });
            if (!dist) {
                throw new common_1.BadRequestException('DISTRICT_NOT_FOUND');
            }
            ward.districtCode = dist.code;
            ward.district = dist;
        }
        const adminExist = await this.adminService.findOneById(userId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (adminExist && !adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        ward.updatedBy = adminExist.id;
        return await this.wardRepository.save(ward);
    }
    async updateByCode(code, dto, userId) {
        const { type, name, codename, districtCode } = dto;
        const ward = await this.findOneByCode(code);
        if (!ward) {
            throw new common_1.BadRequestException('WARD_NOT_FOUND');
        }
        if (name) {
            ward.name = name;
        }
        if (type) {
            ward.type = type;
        }
        if (codename) {
            ward.codename = codename;
        }
        if (districtCode) {
            const dist = await this.dataSource
                .getRepository(entities_1.District)
                .findOne({ where: { code: districtCode } });
            if (!dist) {
                throw new common_1.BadRequestException('DISTRICT_NOT_FOUND');
            }
            ward.districtCode = dist.code;
            ward.district = dist;
        }
        const adminExist = await this.adminService.findOneById(userId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (adminExist && !adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        ward.updatedBy = adminExist.id;
        return await this.wardRepository.save(ward);
    }
    async deleteById(id, userId) {
        const ward = await this.findOneById(id);
        if (!ward) {
            throw new common_1.BadRequestException('WARD_NOT_FOUND');
        }
        const adminExist = await this.adminService.findOneById(userId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (adminExist && !adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        ward.updatedBy = adminExist.id;
        ward.deletedAt = new Date();
        return await this.wardRepository.save(ward);
    }
    async deleteByCode(code, userId) {
        const ward = await this.findOneByCode(code);
        if (!ward) {
            throw new common_1.BadRequestException('WARD_NOT_FOUND');
        }
        const adminExist = await this.adminService.findOneById(userId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (adminExist && !adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        ward.updatedBy = adminExist.id;
        ward.deletedAt = new Date();
        return await this.wardRepository.save(ward);
    }
    async deleteMultipleWardById(userId, dto) {
        try {
            const { ids } = dto;
            const list = await Promise.all(ids.map(async (id) => await this.deleteById(id, userId)));
            return list;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async deleteMultipleWardByCode(userId, dto) {
        try {
            const { codes } = dto;
            const list = await Promise.all(codes.map(async (code) => await this.deleteByCode(code, userId)));
            return list;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
};
WardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Ward)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        admin_service_1.AdminService,
        typeorm_2.DataSource])
], WardService);
exports.WardService = WardService;
//# sourceMappingURL=ward.service.js.map