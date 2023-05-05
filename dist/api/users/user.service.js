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
exports.UsersService = void 0;
const entities_1 = require("./../../database/entities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(customerRepository, dataSource) {
        this.customerRepository = customerRepository;
        this.dataSource = dataSource;
    }
    async findOneById(userId, options) {
        return await this.customerRepository.findOne(Object.assign({ where: { id: userId } }, options));
    }
    async findAll(dto, pagination) {
        const { keywords } = dto;
        const query = this.customerRepository.createQueryBuilder('u');
        if (keywords) {
            query
                .orWhere('u.username like :query')
                .orWhere('u.name like :query')
                .orWhere('u.phone like :query')
                .orWhere('u.email like :query')
                .orWhere("LPAD(u.code::text, 8, '0') like :query")
                .setParameter('query', `%${keywords}%`);
        }
        const total = await query.clone().getCount();
        const dataResult = await query
            .offset(pagination.skip)
            .limit(pagination.take)
            .orderBy('u.updatedAt', 'DESC')
            .getMany();
        return { dataResult, pagination, total };
    }
    async findOne(id) {
        const userExist = await this.customerRepository
            .createQueryBuilder('u')
            .where('u.id = :id', { id })
            .getOne();
        if (!userExist)
            throw new common_1.BadRequestException('USER_NOT_FOUND');
        return userExist;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=user.service.js.map