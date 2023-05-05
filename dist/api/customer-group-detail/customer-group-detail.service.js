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
exports.CustomerGroupDetailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../database/entities");
const typeorm_2 = require("typeorm");
let CustomerGroupDetailService = class CustomerGroupDetailService {
    constructor(customerGroupDetailRepository, dataSource) {
        this.customerGroupDetailRepository = customerGroupDetailRepository;
        this.dataSource = dataSource;
    }
    async saveCustomerGroupDetail(customerGroupId, customerId, adminId) {
        const customerGroup = await this.dataSource
            .getRepository(entities_1.CustomerGroup)
            .findOne({
            where: { id: customerGroupId },
        });
        if (!customerGroup) {
            throw new common_1.BadRequestException('CUSTOMER_GROUP_NOT_FOUND');
        }
        const customer = await this.dataSource.getRepository(entities_1.Customer).findOne({
            where: { id: customerId },
        });
        if (!customer) {
            throw new common_1.BadRequestException('CUSTOMER_NOT_FOUND');
        }
        const adminExist = await this.dataSource
            .getRepository(entities_1.Staff)
            .findOne({ where: { id: adminId, isActive: true } });
        if (!adminExist) {
            throw new common_1.UnauthorizedException('UNAUTHORIZED');
        }
        const customerGroupDetail = new entities_1.CustomerGroupDetail();
        customerGroupDetail.customers.push(customer);
        customerGroupDetail.customerGroups.push(customerGroup);
        return await this.customerGroupDetailRepository.save(customerGroupDetail);
    }
};
CustomerGroupDetailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.CustomerGroupDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], CustomerGroupDetailService);
exports.CustomerGroupDetailService = CustomerGroupDetailService;
//# sourceMappingURL=customer-group-detail.service.js.map