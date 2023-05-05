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
exports.DistrictService = void 0;
const admin_service_1 = require("./../../admin/admin.service");
const enums_1 = require("./../../../enums");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./../../../database/entities");
const typeorm_2 = require("typeorm");
let DistrictService = class DistrictService {
    constructor(districtRepository, adminService, dataSource) {
        this.districtRepository = districtRepository;
        this.adminService = adminService;
        this.dataSource = dataSource;
    }
    async findOneDistrict(options) {
        return await this.districtRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), relations: Object.assign({}, options === null || options === void 0 ? void 0 : options.relations), select: Object.assign({ deletedAt: false }, options === null || options === void 0 ? void 0 : options.select), order: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.order) }, options === null || options === void 0 ? void 0 : options.other));
    }
    async findOneById(id, options) {
        if (options) {
            options.where = Object.assign({ id }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { id } };
        }
        return await this.findOneDistrict(options);
    }
    async findOneByCode(code, options) {
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOneDistrict(options);
    }
    async findByProvinceCode(provinceCode, pagination) {
        const query = this.districtRepository.createQueryBuilder('d');
        query.where('d.provinceCode = :provinceCode', { provinceCode });
        const total = await query.clone().getCount();
        const dataResult = await query
            .orderBy('d.code', 'ASC')
            .offset(pagination.skip)
            .limit(pagination.take)
            .getMany();
        return { dataResult, pagination, total };
    }
    async findAll(dto, pagination) {
        const { name, type, codename, provinceCode } = dto;
        const query = this.districtRepository.createQueryBuilder('d');
        if (name) {
            query.andWhere('d.name LIKE :name', { name: `%${name}%` });
        }
        if (type) {
            query.andWhere('d.type LIKE :type', { type: `%${type}%` });
        }
        if (codename) {
            query.andWhere('d.codename LIKE :codename', {
                codename: `%${codename}%`,
            });
        }
        if (provinceCode) {
            query.andWhere('d.provinceCode = :provinceCode', { provinceCode });
        }
        const total = await query.clone().getCount();
        const dataResult = await query
            .orderBy('d.code', 'ASC')
            .offset(pagination.skip)
            .limit(pagination.take)
            .getMany();
        return { dataResult, pagination, total };
    }
    async createDistrict(dto, userId) {
        const { code, codename, name, provinceCode, type } = dto;
        const province = await this.dataSource.getRepository(entities_1.Province).findOne({
            where: { code: provinceCode },
        });
        if (!province) {
            throw new common_1.BadRequestException('PROVINCE_NOT_FOUND');
        }
        const districtExist = await this.findOneByCode(code, {
            withDeleted: true,
        });
        if (districtExist) {
            throw new common_1.BadRequestException('DISTRICT_CODE_EXISTED');
        }
        const district = new entities_1.District();
        district.name = name;
        district.type = type;
        district.code = code;
        district.codename = codename;
        district.provinceCode = province.code;
        district.province = province;
        const adminExist = await this.adminService.findOneById(userId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        district.createdBy = adminExist.id;
        return await this.districtRepository.save(district);
    }
    async updateByIdOrCode(dto, userId, id, code) {
        const { codename, name, provinceCode, type } = dto;
        if (!id && !code) {
            throw new common_1.BadRequestException('ID_OR_CODE_REQUIRED');
        }
        let district;
        if (id) {
            district = await this.findOneById(id);
        }
        else {
            district = await this.findOneByCode(code);
        }
        if (!district) {
            throw new common_1.BadRequestException('DISTRICT_NOT_FOUND');
        }
        if (district.name) {
            district.name = name;
        }
        if (type) {
            district.type = type;
        }
        if (codename) {
            district.codename = codename;
        }
        if (provinceCode) {
            const province = await this.dataSource.getRepository(entities_1.Province).findOne({
                where: { code: provinceCode },
            });
            if (!province) {
                throw new common_1.BadRequestException('PROVINCE_NOT_FOUND');
            }
            district.provinceCode = province.code;
            district.province = province;
        }
        const adminExist = await this.adminService.findOneById(userId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (adminExist && !adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        district.updatedBy = adminExist.id;
        return await this.districtRepository.save(district);
    }
    async deleteByIdOrCode(userId, id, code) {
        if (!id && !code) {
            throw new common_1.BadRequestException('ID_OR_CODE_REQUIRED');
        }
        let district;
        if (id) {
            district = await this.findOneById(id);
        }
        else {
            district = await this.findOneByCode(code);
        }
        if (!district) {
            throw new common_1.BadRequestException('PROVINCE_NOT_FOUND');
        }
        const adminExist = await this.adminService.findOneById(userId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        district.updatedBy = adminExist.id;
        district.deletedAt = new Date();
        return await this.districtRepository.save(district);
    }
    async deleteMultipleDistrictByIdsOrCodes(userId, dto, type) {
        try {
            const { list } = dto;
            const adminExist = await this.dataSource
                .getRepository(entities_1.Staff)
                .findOne({ where: { id: userId } });
            if (!adminExist) {
                throw new common_1.UnauthorizedException('UNAUTHORIZED');
            }
            if (!adminExist.isActive) {
                throw new common_1.BadRequestException('USER_NOT_ACTIVE');
            }
            const newList = await Promise.all(list.map(async (data) => {
                if (!data) {
                    return {
                        id: type === enums_1.DeleteDtoTypeEnum.ID ? data : undefined,
                        code: type === enums_1.DeleteDtoTypeEnum.CODE ? data : undefined,
                        message: `${type} không được để trống`,
                    };
                }
                let district;
                if (type === enums_1.DeleteDtoTypeEnum.ID) {
                    district = await this.findOneById(data);
                }
                else {
                    const code = parseInt(data);
                    district = await this.findOneByCode(code);
                }
                if (!district) {
                    return {
                        id: type === enums_1.DeleteDtoTypeEnum.ID ? data : undefined,
                        code: type === enums_1.DeleteDtoTypeEnum.CODE ? data : undefined,
                        message: 'Không tìm thấy quận/huyện',
                    };
                }
                district.updatedBy = adminExist.id;
                district.deletedAt = new Date();
                await this.districtRepository.save(district);
                return {
                    id: district.id,
                    code: district.code,
                    message: 'Xoá thành công',
                };
            }));
            return newList;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
};
DistrictService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.District)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        admin_service_1.AdminService,
        typeorm_2.DataSource])
], DistrictService);
exports.DistrictService = DistrictService;
//# sourceMappingURL=district.service.js.map