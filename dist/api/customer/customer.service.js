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
exports.CustomerService = void 0;
const enums_1 = require("./../../enums");
const entities_1 = require("../../database/entities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const utils_1 = require("./../../utils");
const bcrypt = require("bcrypt");
const moment = require("moment");
let CustomerService = class CustomerService {
    constructor(customerRepository, dataSource) {
        this.customerRepository = customerRepository;
        this.dataSource = dataSource;
        this.selectFieldsWithQ = [
            'u.id',
            'u.code',
            'u.lastLogin',
            'u.status',
            'u.phone',
            'u.email',
            'u.fullName',
            'u.gender',
            'u.address',
            'u.fullAddress',
            'u.note',
            'u.birthday',
            'u.createdAt',
            'u.updatedAt',
            'u.updatedBy',
            'cg.id',
            'cg.name',
            'cg.code',
            'cg.description',
            'cg.note',
            'cg.createdBy',
            'cg.createdAt',
            'cg.updatedAt',
        ];
        this.selectFieldsAddress = {
            select: {
                ward: {
                    id: true,
                    name: true,
                    type: true,
                    codename: true,
                    code: true,
                    districtCode: true,
                    district: {
                        id: true,
                        name: true,
                        type: true,
                        codename: true,
                        code: true,
                        provinceCode: true,
                        province: {
                            id: true,
                            name: true,
                            type: true,
                            codename: true,
                            code: true,
                        },
                    },
                },
            },
            relations: {
                ward: { district: { province: true } },
            },
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
    async getCustomerStatus() {
        return Object.keys(enums_1.UserStatusEnum).map((key) => enums_1.UserStatusEnum[key]);
    }
    async findOneCustomer(options) {
        return await this.customerRepository.findOne(Object.assign({ where: Object.assign({}, options === null || options === void 0 ? void 0 : options.where), select: Object.assign({ id: true, code: true, lastLogin: true, status: true, phone: true, email: true, fullName: true, gender: true, address: true, note: true, fullAddress: true, birthday: true, createdAt: true, updatedBy: true, ward: {
                    id: true,
                    name: true,
                    type: true,
                    codename: true,
                    code: true,
                    districtCode: true,
                    district: {
                        id: true,
                        name: true,
                        type: true,
                        codename: true,
                        code: true,
                        provinceCode: true,
                        province: {
                            id: true,
                            name: true,
                            type: true,
                            codename: true,
                            code: true,
                        },
                    },
                } }, options === null || options === void 0 ? void 0 : options.select), order: Object.assign({ createdAt: enums_1.SortEnum.DESC }, options === null || options === void 0 ? void 0 : options.order), relations: Object.assign({ customerGroup: true, ward: { district: { province: true } } }, options === null || options === void 0 ? void 0 : options.relations) }, options === null || options === void 0 ? void 0 : options.other));
    }
    async findOneByEmail(email, options) {
        if (options) {
            options.where = Object.assign({ email }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { email } };
        }
        return await this.findOneCustomer(options);
    }
    async findOneByPhone(phone, options) {
        if (options) {
            options.where = Object.assign({ phone }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { phone } };
        }
        return await this.findOneCustomer(options);
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
        return await this.findOneCustomer(options);
    }
    async findOneByCode(code, options) {
        if (!code) {
            throw new common_1.BadRequestException('CODE_REQUIRED');
        }
        if (options) {
            options.where = Object.assign({ code }, options === null || options === void 0 ? void 0 : options.where);
        }
        else {
            options = { where: { code } };
        }
        return await this.findOneCustomer(options);
    }
    async findCustomerByRefreshToken(refreshToken, options) {
        if (options) {
            options.where = Object.assign({ refreshToken }, options === null || options === void 0 ? void 0 : options.where);
            options.select = Object.assign({ refreshToken: true }, options === null || options === void 0 ? void 0 : options.select);
        }
        else {
            options = { where: { refreshToken }, select: { refreshToken: true } };
        }
        return await this.findOneCustomer(options);
    }
    async findAll(dto, pagination) {
        const { keywords, status, sort } = dto;
        const query = this.customerRepository.createQueryBuilder('u');
        if (keywords) {
            const newKeywords = keywords.trim();
            const subQuery = this.customerRepository
                .createQueryBuilder('q2')
                .where('q2.fullName LIKE :fullName', { fullName: `%${newKeywords}%` })
                .orWhere('q2.email LIKE :email', { email: `%${newKeywords}%` })
                .orWhere('q2.phone LIKE :phone', { phone: `%${newKeywords}%` })
                .orWhere('q2.address LIKE :address', { address: `%${newKeywords}%` })
                .orWhere('q2.fullAddress LIKE :fullAddress', {
                fullAddress: `%${newKeywords}%`,
            })
                .orWhere('q2.note LIKE :note', { note: `%${newKeywords}%` })
                .select('q2.id')
                .getQuery();
            query.andWhere(`q.id in (${subQuery})`, {
                fullName: `%${newKeywords}%`,
                email: `%${newKeywords}%`,
                phone: `%${newKeywords}%`,
                address: `%${newKeywords}%`,
                fullAddress: `%${newKeywords}%`,
            });
        }
        if (status) {
            query.andWhere('u.status = :status', { status });
        }
        const total = await query.clone().getCount();
        const dataResult = await query
            .leftJoinAndSelect('u.customerGroup', 'cg')
            .offset(pagination.skip)
            .limit(pagination.take)
            .orderBy('u.createdAt', sort || enums_1.SortEnum.DESC)
            .addOrderBy('u.fullName', enums_1.SortEnum.ASC)
            .addOrderBy('u.email', enums_1.SortEnum.ASC)
            .select(this.selectFieldsWithQ)
            .getMany();
        return { dataResult, pagination, total };
    }
    async getCustomerByEmail(email, options) {
        const userExist = await this.findOneByEmail(email, options);
        if (!userExist) {
            throw new common_1.BadRequestException('USER_NOT_FOUND');
        }
        return userExist;
    }
    async getCustomerById(id, options) {
        const userExist = await this.findOneById(id, options);
        if (!userExist)
            throw new common_1.BadRequestException('USER_NOT_FOUND');
        return userExist;
    }
    async updatePassword(id, dto) {
        const userExist = await this.getCustomerById(id);
        if (userExist.status == enums_1.UserStatusEnum.INACTIVATE) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const isPasswordMatches = await bcrypt.compare(dto === null || dto === void 0 ? void 0 : dto.oldPassword, userExist === null || userExist === void 0 ? void 0 : userExist.password);
        if (!isPasswordMatches) {
            throw new common_1.BadRequestException('OLD_PASSWORD_MISMATCH');
        }
        if ((dto === null || dto === void 0 ? void 0 : dto.newPassword) !== (dto === null || dto === void 0 ? void 0 : dto.confirmNewPassword)) {
            throw new common_1.BadRequestException('PASSWORD_NEW_NOT_MATCH');
        }
        const passwordHash = await bcrypt.hash(dto.newPassword, await bcrypt.genSalt());
        return await this.customerRepository.update({ id: userExist.id }, { password: passwordHash, updatedBy: userExist.id });
    }
    async updateCustomer(id, dto, userId, adminId) {
        const { fullName, email, address, gender, birthDate, wardId, wardCode, otp, } = dto;
        if (!userId && !adminId) {
            throw new common_1.NotFoundException('USER_NOT_FOUND');
        }
        const admin = await this.dataSource.getRepository(entities_1.Staff).findOne({
            where: {
                id: adminId,
            },
        });
        const customer = await this.findOneById(userId, {
            select: {
                otpCode: true,
                otpExpired: true,
            },
        });
        if (!customer && !admin) {
            throw new common_1.NotFoundException('USER_NOT_FOUND');
        }
        if ((userId && customer && customer.status === enums_1.UserStatusEnum.INACTIVATE) ||
            (adminId && admin && !admin.isActive)) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const oldCustomer = await this.findOneById(id);
        if (fullName) {
            oldCustomer.fullName = fullName;
        }
        if (address) {
            oldCustomer.address = address;
        }
        switch (gender) {
            case enums_1.GenderEnum.MALE:
                oldCustomer.gender = enums_1.GenderEnum.MALE;
                break;
            case enums_1.GenderEnum.FEMALE:
                oldCustomer.gender = enums_1.GenderEnum.FEMALE;
                break;
            case enums_1.GenderEnum.OTHER:
                oldCustomer.gender = enums_1.GenderEnum.OTHER;
                break;
            default:
                oldCustomer.gender = enums_1.GenderEnum.OTHER;
                break;
        }
        if (birthDate) {
            oldCustomer.birthday = birthDate;
        }
        if (wardId) {
            const ward = await this.dataSource.getRepository(entities_1.Ward).findOne({
                where: {
                    id: wardId,
                },
                relations: { district: { province: true } },
            });
            if (!ward) {
                throw new common_1.NotFoundException('WARD_NOT_FOUND');
            }
            oldCustomer.ward = ward;
        }
        else if (wardCode) {
            const ward = await this.dataSource.getRepository(entities_1.Ward).findOne({
                where: {
                    code: wardCode,
                },
                relations: { district: { province: true } },
            });
            if (!ward) {
                throw new common_1.NotFoundException('WARD_NOT_FOUND');
            }
            oldCustomer.ward = ward;
        }
        const district = oldCustomer.ward.district;
        const province = district.province;
        oldCustomer.fullAddress = `${oldCustomer.address}, ${oldCustomer.ward.name}, ${district.name}, ${province.name}`;
        if (email) {
            if (oldCustomer.email !== email) {
                const userExist = await this.findOneByEmail(email);
                if (userExist) {
                    throw new common_1.BadRequestException('EMAIL_ALREADY_EXIST');
                }
                this.checkOTP(otp, customer.otpCode, customer.otpExpired);
                oldCustomer.email = email;
            }
        }
        if (customer) {
            customer.updatedBy = userId;
        }
        else if (admin) {
            oldCustomer.updatedBy = adminId;
        }
        const saveCustomer = await this.customerRepository.save(oldCustomer);
        delete oldCustomer.ward.district;
        delete district.province;
        saveCustomer['district'] = district;
        saveCustomer['province'] = province;
        return saveCustomer;
    }
    async updateOtp(id, otpCode, otpExpired, otpType) {
        const customer = await this.getCustomerById(id);
        customer.otpCode = otpCode;
        customer.otpExpired = otpExpired;
        if (otpType && otpType === enums_1.ActiveOtpTypeEnum.RESET_PASSWORD) {
            customer.noteStatus = enums_1.ActiveOtpTypeEnum.RESET_PASSWORD;
        }
        const saveCustomer = await this.customerRepository.save(customer);
        return saveCustomer;
    }
    async updateActive(id) {
        const customer = await this.getCustomerById(id);
        if (customer.status === enums_1.UserStatusEnum.ACTIVE) {
            throw new common_1.BadRequestException('USER_ALREADY_ACTIVE');
        }
        customer.status = enums_1.UserStatusEnum.ACTIVE;
        customer.otpCode = null;
        customer.otpExpired = null;
        const saveCustomer = await this.customerRepository.save(customer);
        return saveCustomer;
    }
    async createCustomerForAdmin(userId, dto) {
        const { email, fullName, wardCode, gender, birthday, phone, customerGroupId, customerGroupCode, address, note, } = dto;
        const adminExist = await this.dataSource.getRepository(entities_1.Staff).findOne({
            where: { id: userId },
        });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        let code = (0, utils_1.generateCustomerCode)();
        let flag = true;
        while (flag) {
            const customerExist = await this.findOneByCode(code);
            if (!customerExist) {
                flag = false;
            }
            else {
                code = (0, utils_1.generateCustomerCode)();
            }
        }
        const customer = new entities_1.Customer();
        customer.code = code;
        customer.fullName = fullName;
        customer.note = note;
        switch (gender) {
            case enums_1.GenderEnum.FEMALE:
            case enums_1.GenderEnum.MALE:
            case enums_1.GenderEnum.OTHER:
                customer.gender = gender;
                break;
            default:
                customer.gender = enums_1.GenderEnum.OTHER;
                break;
        }
        if (birthday) {
            customer.birthday = birthday;
        }
        else {
            customer.birthday = moment().startOf('day').toDate();
        }
        if (email) {
            const userEmailExist = await this.findOneByEmail(email);
            if (userEmailExist) {
                throw new common_1.BadRequestException('EMAIL_ALREADY_EXIST');
            }
            customer.email = email;
        }
        const userPhoneExist = await this.findOneByPhone(phone);
        if (userPhoneExist) {
            throw new common_1.BadRequestException('PHONE_ALREADY_EXIST');
        }
        customer.phone = phone;
        const ward = await this.dataSource.getRepository(entities_1.Ward).findOne({
            where: {
                code: wardCode,
            },
            select: Object.assign({}, this.selectFieldsAddress.select.ward),
            relations: { district: { province: true } },
        });
        if (!ward) {
            throw new common_1.BadRequestException('WARD_NOT_FOUND');
        }
        customer.ward = ward;
        customer.address = address;
        customer.fullAddress = `${address}, ${ward.name}, ${ward.district.name}, ${ward.district.province.name}`;
        delete customer.ward.district;
        let customerGroupExist;
        if (customerGroupId) {
            customerGroupExist = await this.dataSource
                .getRepository(entities_1.CustomerGroup)
                .findOne({
                where: { id: customerGroupId },
            });
        }
        else if (customerGroupCode) {
            customerGroupExist = await this.dataSource
                .getRepository(entities_1.CustomerGroup)
                .findOne({
                where: { code: customerGroupCode },
            });
        }
        else {
            customerGroupExist = await this.dataSource
                .getRepository(entities_1.CustomerGroup)
                .findOne({
                where: { code: 'DEFAULT' },
            });
        }
        if (!customerGroupExist) {
            throw new common_1.BadRequestException('CUSTOMER_GROUP_NOT_FOUND');
        }
        customer.customerGroup = customerGroupExist;
        customer.createdBy = adminExist.id;
        customer.status = enums_1.UserStatusEnum.ACTIVE;
        const saveCustomer = await this.customerRepository.save(customer);
        delete saveCustomer.lastLogin;
        delete saveCustomer.refreshToken;
        delete saveCustomer.accessToken;
        delete saveCustomer.password;
        delete customer.deletedAt;
        return saveCustomer;
    }
    async updateCustomerForAdmin(id, dto, userId) {
        const { fullName, wardCode, gender, birthday, customerGroupId, customerGroupCode, address, status, note, } = dto;
        const adminExist = await this.dataSource.getRepository(entities_1.Staff).findOne({
            where: { id: userId },
        });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        const customer = await this.findOneById(id, {
            select: Object.assign({}, this.selectFieldsAddress.select),
            relations: this.selectFieldsAddress.relations,
        });
        if (fullName) {
            customer.fullName = fullName;
        }
        if (note) {
            customer.note = note;
        }
        if (gender) {
            switch (gender) {
                case enums_1.GenderEnum.FEMALE:
                case enums_1.GenderEnum.MALE:
                case enums_1.GenderEnum.OTHER:
                    customer.gender = gender;
                    break;
                default:
                    break;
            }
        }
        if (status) {
            switch (status) {
                case enums_1.UserStatusEnum.ACTIVE:
                case enums_1.UserStatusEnum.INACTIVATE:
                case enums_1.UserStatusEnum.SUSPENSION:
                    customer.status = status;
                    break;
                default:
                    break;
            }
        }
        if (birthday) {
            customer.birthday = birthday;
        }
        let customerGroupExist;
        if (customerGroupId) {
            customerGroupExist = await this.dataSource
                .getRepository(entities_1.CustomerGroup)
                .findOne({
                where: { id: customerGroupId },
            });
        }
        else if (customerGroupCode) {
            customerGroupExist = await this.dataSource
                .getRepository(entities_1.CustomerGroup)
                .findOne({
                where: { code: customerGroupCode },
            });
        }
        else {
            customerGroupExist = await this.dataSource
                .getRepository(entities_1.CustomerGroup)
                .findOne({
                where: { code: 'DEFAULT' },
            });
        }
        if (!customerGroupExist) {
            throw new common_1.BadRequestException('CUSTOMER_GROUP_NOT_FOUND');
        }
        customer.customerGroup = customerGroupExist;
        if (address) {
            customer.address = address;
        }
        if (wardCode) {
            const ward = await this.dataSource.getRepository(entities_1.Ward).findOne({
                where: {
                    code: wardCode,
                },
                relations: { district: { province: true } },
            });
            if (!ward) {
                throw new common_1.NotFoundException('WARD_NOT_FOUND');
            }
            customer.ward = ward;
        }
        const district = customer.ward.district;
        const province = district.province;
        customer.fullAddress = `${customer.address}, ${customer.ward.name}, ${district.name}, ${province.name}`;
        customer.updatedBy = adminExist.id;
        const saveCustomer = await this.customerRepository.save(customer);
        delete customer.refreshToken;
        delete customer.accessToken;
        delete customer.deletedAt;
        delete customer.password;
        delete customer.ward.district;
        delete district.province;
        saveCustomer['district'] = district;
        saveCustomer['province'] = province;
        return saveCustomer;
    }
    async addCustomerToCustomerGroup(dto, adminId) {
        const { customerId, customerGroupId, customerGroupCode } = dto;
        if (!customerGroupId && !customerGroupCode) {
            throw new common_1.BadRequestException('CUSTOMER_GROUP_ID_OR_CUSTOMER_GROUP_CODE_REQUIRED');
        }
        const customer = await this.getCustomerById(customerId);
        if (!customer) {
            throw new common_1.BadRequestException('USER_NOT_FOUND');
        }
        let customerGroup;
        if (customerGroupId) {
            customerGroup = await this.dataSource
                .getRepository(entities_1.CustomerGroup)
                .findOne({
                where: { id: customerGroupId },
            });
        }
        else if (customerGroupCode) {
            customerGroup = await this.dataSource
                .getRepository(entities_1.CustomerGroup)
                .findOne({
                where: { code: customerGroupCode },
            });
        }
        if (!customerGroup) {
            throw new common_1.BadRequestException('CUSTOMER_GROUP_NOT_FOUND');
        }
        const adminExist = await this.dataSource.getRepository(entities_1.Staff).findOne({
            where: { id: adminId },
        });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        customer.customerGroup = customerGroup;
        customer.updatedBy = adminExist.id;
        await this.customerRepository.save(customer);
        return {
            customer: {
                id: customerId,
            },
            customerGroup: {
                id: customerGroupId,
            },
            message: 'Thêm khách hàng vào nhóm thành công',
        };
    }
    async removeCustomerFromCustomerGroup(dto, adminId) {
        const { customerId, customerGroupId, customerGroupCode } = dto;
        if (!customerGroupId && !customerGroupCode) {
            throw new common_1.BadRequestException('CUSTOMER_GROUP_ID_OR_CUSTOMER_GROUP_CODE_REQUIRED');
        }
        const customer = await this.getCustomerById(customerId);
        if (!customer) {
            throw new common_1.BadRequestException('USER_NOT_FOUND');
        }
        let customerGroup;
        if (customerGroupId) {
            customerGroup = await this.dataSource
                .getRepository(entities_1.CustomerGroup)
                .findOne({
                where: { id: customerGroupId },
            });
        }
        else if (customerGroupCode) {
            customerGroup = await this.dataSource
                .getRepository(entities_1.CustomerGroup)
                .findOne({
                where: { code: customerGroupCode },
            });
        }
        if (!customerGroup) {
            throw new common_1.BadRequestException('CUSTOMER_GROUP_NOT_FOUND');
        }
        const adminExist = await this.dataSource.getRepository(entities_1.Staff).findOne({
            where: { id: adminId },
        });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        customer.customerGroup = null;
        customer.updatedBy = adminExist.id;
        await this.customerRepository.save(customer);
        return {
            customer: {
                id: customerId,
            },
            customerGroup: {
                id: customerGroupId,
            },
            message: 'Xoá khách hàng khỏi nhóm thành công',
        };
    }
    async deleteCustomerById(adminId, id) {
        const customer = await this.getCustomerById(id);
        if (!customer) {
            throw new common_1.BadRequestException('CUSTOMER_NOT_FOUND');
        }
        const adminExist = await this.dataSource.getRepository(entities_1.Staff).findOne({
            where: {
                id: adminId,
            },
        });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        if (!adminExist.isActive) {
            throw new common_1.BadRequestException('USER_NOT_ACTIVE');
        }
        customer.updatedBy = adminExist.id;
        customer.deletedAt = new Date();
        await this.customerRepository.save(customer);
        return {
            id: customer.id,
            message: 'Xoá khách hàng thành công',
        };
    }
    async searchCustomerForOrder(dto) {
        const { key: keywords } = dto;
        const query = this.customerRepository.createQueryBuilder('u');
        query
            .orWhere('u.phone LIKE :query')
            .orWhere('u.email LIKE :query')
            .setParameter('query', `%${keywords}%`)
            .leftJoinAndSelect('u.ward', 'w')
            .leftJoinAndSelect('w.district', 'd')
            .leftJoinAndSelect('d.province', 'p')
            .select([
            'u.id',
            'u.lastLogin',
            'u.status',
            'u.phone',
            'u.email',
            'u.fullName',
            'u.gender',
            'u.address',
            'u.fullAddress',
            'u.note',
            'u.birthday',
            'u.createdAt',
            'u.updatedAt',
            'u.updatedBy',
            'w',
            'd',
            'p',
        ]);
        const dataResult = await query.getMany();
        return { dataResult };
    }
};
CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map