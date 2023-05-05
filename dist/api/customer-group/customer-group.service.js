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
exports.CustomerGroupService = void 0;
const admin_service_1 = require("./../admin/admin.service");
const enums_1 = require("./../../enums");
const entities_1 = require("./../../database/entities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_service_1 = require("../customer/customer.service");
let CustomerGroupService = class CustomerGroupService {
    constructor(customerGroupRepository, adminService, customerService) {
        this.customerGroupRepository = customerGroupRepository;
        this.adminService = adminService;
        this.customerService = customerService;
    }
    async findOneCustomerGroup(options) {
        return await this.customerGroupRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), relations: Object.assign({}, options === null || options === void 0 ? void 0 : options.relations), select: Object.assign({ deletedAt: false }, options === null || options === void 0 ? void 0 : options.select), order: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.order) }, options === null || options === void 0 ? void 0 : options.other));
    }
    async findCustomerGroupByCode(code, options) {
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOneCustomerGroup(options);
    }
    async findCustomerGroupById(id, options) {
        if (options) {
            options.where = Object.assign({ id }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { id } };
        }
        return await this.findOneCustomerGroup(options);
    }
    async createCustomerGroup(dto, adminId) {
        const { code, name, description, note } = dto;
        const customerGroupExist = await this.findCustomerGroupByCode(code);
        if (customerGroupExist) {
            throw new common_1.BadRequestException('CUSTOMER_GROUP_CODE_EXIST');
        }
        const customerGroup = new entities_1.CustomerGroup();
        if (!name) {
            throw new common_1.BadRequestException('NAME_IS_REQUIRED');
        }
        customerGroup.code = code;
        customerGroup.name = name;
        customerGroup.description = description;
        customerGroup.note = note;
        const adminExist = await this.adminService.findOneById(adminId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        customerGroup.createdBy = adminExist.id;
        const newCustomerGroup = await this.customerGroupRepository.save(customerGroup);
        delete newCustomerGroup.deletedAt;
        return newCustomerGroup;
    }
    async getCustomerGroupById(id, adminId, options) {
        const adminExist = await this.adminService.findOneById(adminId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const customerGroup = await this.findCustomerGroupById(id, options);
        if (!customerGroup) {
            throw new common_1.BadRequestException('CUSTOMER_GROUP_NOT_FOUND');
        }
        return customerGroup;
    }
    async getCustomerGroupByCode(code, adminId, options) {
        const adminExist = await this.adminService.findOneById(adminId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const customerGroup = await this.findCustomerGroupByCode(code, options);
        if (!customerGroup) {
            throw new common_1.BadRequestException('CUSTOMER_GROUP_NOT_FOUND');
        }
        return customerGroup;
    }
    async findAllCustomerGroup(dto, adminId, pagination) {
        const adminExist = await this.adminService.findOneById(adminId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const { keywords, sort } = dto;
        const query = this.customerGroupRepository.createQueryBuilder('q');
        if (keywords) {
            const newKeywords = keywords.trim();
            const subQuery = this.customerGroupRepository
                .createQueryBuilder('q2')
                .select('q2.id')
                .where('q2.code LIKE :code', { code: `%${newKeywords}%` })
                .orWhere('q2.name LIKE :name', { name: `%${newKeywords}%` })
                .orWhere('q2.description LIKE :description', {
                description: `%${newKeywords}%`,
            })
                .orWhere('q2.note LIKE :note', { note: `%${newKeywords}%` })
                .getQuery();
            query.andWhere(`q.id in (${subQuery})`, {
                code: `%${newKeywords}%`,
                name: `%${newKeywords}%`,
                description: `%${newKeywords}%`,
                note: `%${newKeywords}%`,
            });
        }
        query
            .orderBy('q.createdAt', sort || enums_1.SortEnum.DESC)
            .addOrderBy('q.code', enums_1.SortEnum.ASC)
            .addOrderBy('q.name', enums_1.SortEnum.ASC);
        const dataResult = await query
            .offset(pagination.skip)
            .limit(pagination.take)
            .getMany();
        const total = await query.clone().getCount();
        return { dataResult, total, pagination };
    }
    async updateCustomerGroupById(adminId, id, dto) {
        const customerGroup = await this.getCustomerGroupById(id, adminId);
        const { name, description, note } = dto;
        if (name) {
            customerGroup.name = name;
        }
        if (description) {
            customerGroup.description = description;
        }
        if (note) {
            customerGroup.note = note;
        }
        const adminExist = await this.adminService.findOneById(adminId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        customerGroup.updatedBy = adminExist.id;
        const saveCustomerGroup = await this.customerGroupRepository.save(customerGroup);
        delete saveCustomerGroup.deletedAt;
        return saveCustomerGroup;
    }
    async updateCustomerGroupByCode(adminId, code, dto) {
        const customerGroup = await this.getCustomerGroupByCode(code, adminId);
        if (!customerGroup) {
            throw new common_1.BadRequestException('CUSTOMER_GROUP_NOT_FOUND');
        }
        const { name, description, note } = dto;
        if (name) {
            customerGroup.name = name;
        }
        if (description) {
            customerGroup.description = description;
        }
        if (note) {
            customerGroup.note = note;
        }
        const adminExist = await this.adminService.findOneById(adminId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        customerGroup.updatedBy = adminExist.id;
        const saveCustomerGroup = await this.customerGroupRepository.save(customerGroup);
        delete saveCustomerGroup.deletedAt;
        return saveCustomerGroup;
    }
    async deleteCustomerGroupById(adminId, id) {
        const customerGroup = await this.getCustomerGroupById(id, adminId, {
            relations: ['customers'],
        });
        if (!customerGroup) {
            throw new common_1.BadRequestException('CUSTOMER_GROUP_NOT_FOUND');
        }
        if (customerGroup.customers.length > 0) {
            throw new common_1.BadRequestException('CUSTOMER_GROUP_HAS_CUSTOMERS');
        }
        const adminExist = await this.adminService.findOneById(adminId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        customerGroup.updatedBy = adminExist.id;
        customerGroup.deletedAt = new Date();
        const saveCustomerGroup = await this.customerGroupRepository.save(customerGroup);
        return {
            id: saveCustomerGroup.id,
            message: 'Xoá nhóm khách hàng thành công',
        };
    }
    async deleteCustomerGroupByCode(adminId, code) {
        const customerGroup = await this.getCustomerGroupByCode(code, adminId);
        if (!customerGroup) {
            throw new common_1.BadRequestException('CUSTOMER_GROUP_NOT_FOUND');
        }
        if (customerGroup.customers.length > 0) {
            throw new common_1.BadRequestException('CUSTOMER_GROUP_HAS_CUSTOMERS');
        }
        const adminExist = await this.adminService.findOneById(adminId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        customerGroup.updatedBy = adminExist.id;
        customerGroup.deletedAt = new Date();
        const saveCustomerGroup = await this.customerGroupRepository.save(customerGroup);
        return {
            id: saveCustomerGroup.id,
            message: 'Xoá nhóm khách hàng thành công',
        };
    }
    async deleteMultipleCustomerGroupByIds(adminId, dto) {
        try {
            const { ids } = dto;
            const list = await Promise.all(ids.map(async (id) => {
                await this.deleteCustomerGroupById(adminId, id);
            }));
            return list;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async deleteMultipleCustomerGroupByCodes(adminId, dto) {
        try {
            const { ids } = dto;
            const list = await Promise.all(ids.map(async (code) => {
                await this.deleteCustomerGroupByCode(adminId, code);
            }));
            return list;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async getCustomersByGroupId(groupId, adminId, dto, pagination) {
        const adminExist = await this.adminService.findOneById(adminId);
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const customerGroup = await this.getCustomerGroupById(groupId, adminId);
        if (!customerGroup) {
            throw new common_1.BadRequestException('CUSTOMER_GROUP_NOT_FOUND');
        }
        const { keywords, gender, sort } = dto;
        const query = this.customerGroupRepository.createQueryBuilder('q');
        query.where('q.id = :groupId', { groupId });
        query.leftJoinAndSelect('q.customers', 'c');
        if (keywords) {
            query
                .orWhere('c.fullName LIKE :fullName', { fullName: `%${keywords}%` })
                .orWhere('c.phone LIKE :phone', { phone: `%${keywords}%` })
                .orWhere('c.email LIKE :email', { email: `%${keywords}%` })
                .orWhere('c.address LIKE :address', { address: `%${keywords}%` })
                .orWhere('c.fullAddress LIKE :fullAddress', {
                fullAddress: `%${keywords}%`,
            });
        }
        if (gender) {
            query.andWhere('c.gender = :gender', { gender });
        }
        if (sort) {
            query
                .orderBy('c.fullName', enums_1.SortEnum.ASC)
                .orderBy('c.email', sort)
                .orderBy('c.phone', sort)
                .addOrderBy('c.createdAt', sort);
        }
        else {
            query
                .orderBy('c.fullName', enums_1.SortEnum.ASC)
                .orderBy('c.email', enums_1.SortEnum.ASC)
                .orderBy('c.phone', enums_1.SortEnum.ASC)
                .addOrderBy('c.createdAt', enums_1.SortEnum.DESC);
        }
        const dataResult = await query
            .select([
            'q.id',
            'q.name',
            'q.code',
            'q.description',
            'q.note',
            'q.createdAt',
            'q.createdBy',
            'c.id',
            'c.status',
            'c.phone',
            'c.email',
            'c.fullName',
            'c.gender',
            'c.address',
            'c.note',
            'c.birthday',
            'c.createdAt',
        ])
            .take(pagination.take)
            .skip(pagination.skip)
            .getOne();
        const total = await query.clone().getCount();
        return { dataResult, pagination, total };
    }
};
CustomerGroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.CustomerGroup)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        admin_service_1.AdminService,
        customer_service_1.CustomerService])
], CustomerGroupService);
exports.CustomerGroupService = CustomerGroupService;
//# sourceMappingURL=customer-group.service.js.map