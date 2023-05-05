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
exports.ProvinceService = void 0;
const admin_service_1 = require("./../../admin/admin.service");
const enums_1 = require("./../../../enums");
const entities_1 = require("./../../../database/entities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ProvinceService = class ProvinceService {
    constructor(provinceRepository, adminService) {
        this.provinceRepository = provinceRepository;
        this.adminService = adminService;
    }
    async findOneProvince(options) {
        return await this.provinceRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), relations: Object.assign({}, options === null || options === void 0 ? void 0 : options.relations), select: Object.assign({ deletedAt: false }, options === null || options === void 0 ? void 0 : options.select), order: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.order) }, options === null || options === void 0 ? void 0 : options.other));
    }
    async findOneById(id, options) {
        if (options) {
            options.where = Object.assign({ id }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { id } };
        }
        return await this.findOneProvince(options);
    }
    async findOneByCode(code, options) {
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOneProvince(options);
    }
    async findAll(dto, pagination) {
        const { name, type, codename } = dto;
        const query = this.provinceRepository.createQueryBuilder('p');
        if (name) {
            query.andWhere('p.name LIKE :name', { name: `%${name}%` });
        }
        if (type) {
            query.andWhere('p.type LIKE :type', { type: `%${type}%` });
        }
        if (codename) {
            query.andWhere('p.codename LIKE :codename', {
                codename: `%${codename}%`,
            });
        }
        const total = await query.clone().getCount();
        const dataResult = await query
            .orderBy('p.code', 'ASC')
            .offset(pagination.skip)
            .limit(pagination.take)
            .getMany();
        return { dataResult, pagination, total };
    }
    async createProvince(dto, userId) {
        const { code, codename, name, type } = dto;
        const provinceExists = await this.findOneByCode(code, {
            withDeleted: true,
        });
        if (provinceExists) {
            throw new common_1.BadRequestException('PROVINCE_CODE_ALREADY_EXIST');
        }
        const province = new entities_1.Province();
        province.name = name;
        province.type = type;
        province.code = code;
        province.codename = codename;
        const adminExist = await this.adminService.findOneById(userId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        province.createdBy = adminExist.id;
        return await this.provinceRepository.save(province);
    }
    async updateById(id, dto, userId) {
        const { name, type, codename } = dto;
        const province = await this.findOneById(id);
        if (!province) {
            throw new common_1.BadRequestException('PROVINCE_NOT_FOUND');
        }
        if (name) {
            province.name = name;
        }
        if (type) {
            province.type = type;
        }
        if (codename) {
            province.codename = codename;
        }
        const adminExist = await this.adminService.findOneById(userId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.UnauthorizedException('USER_NOT_ACTIVE');
        }
        province.updatedBy = adminExist.id;
        return await this.provinceRepository.save(province);
    }
    async updateByCode(code, dto, userId) {
        const { name, type, codename } = dto;
        const province = await this.findOneByCode(code);
        if (!province) {
            throw new common_1.BadRequestException('PROVINCE_NOT_FOUND');
        }
        if (name) {
            province.name = name;
        }
        if (type) {
            province.type = type;
        }
        if (codename) {
            province.codename = codename;
        }
        const adminExist = await this.adminService.findOneById(userId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.UnauthorizedException('USER_NOT_ACTIVE');
        }
        province.updatedBy = adminExist.id;
        return await this.provinceRepository.save(province);
    }
    async deleteById(id, userId) {
        const province = await this.findOneById(id);
        if (!province) {
            throw new common_1.BadRequestException('PROVINCE_NOT_FOUND');
        }
        const adminExist = await this.adminService.findOneById(userId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.UnauthorizedException('USER_NOT_ACTIVE');
        }
        province.updatedBy = adminExist.id;
        province.deletedAt = new Date();
        return await this.provinceRepository.save(province);
    }
    async deleteByCode(code, userId) {
        const province = await this.findOneByCode(code);
        if (!province) {
            throw new common_1.BadRequestException('PROVINCE_NOT_FOUND');
        }
        const adminExist = await this.adminService.findOneById(userId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.UnauthorizedException('USER_NOT_ACTIVE');
        }
        province.updatedBy = adminExist.id;
        province.deletedAt = new Date();
        return await this.provinceRepository.save(province);
    }
    async deleteMultipleProvinceById(userId, dto) {
        try {
            const { ids } = dto;
            const list = await Promise.all(ids.map(async (id) => await this.deleteById(id, userId)));
            return list;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async deleteMultipleProvinceByCode(userId, dto) {
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
ProvinceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Province)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        admin_service_1.AdminService])
], ProvinceService);
exports.ProvinceService = ProvinceService;
//# sourceMappingURL=province.service.js.map