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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerGroupDetail2 = void 0;
const typeorm_1 = require("typeorm");
const customer_entities_1 = require("./customer.entities");
const customer_group_entities_1 = require("./customer-group.entities");
let CustomerGroupDetail2 = class CustomerGroupDetail2 {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', name: 'id', unsigned: true }),
    __metadata("design:type", Number)
], CustomerGroupDetail2.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entities_1.Customer, (customer) => customer.customerGroupDetails),
    (0, typeorm_1.JoinColumn)([{ name: 'customer_id' }]),
    __metadata("design:type", customer_entities_1.Customer)
], CustomerGroupDetail2.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_group_entities_1.CustomerGroup, (customerGroup) => customerGroup.customerGroupDetails),
    (0, typeorm_1.JoinColumn)([{ name: 'customer_group_id' }]),
    __metadata("design:type", customer_group_entities_1.CustomerGroup)
], CustomerGroupDetail2.prototype, "customerGroup", void 0);
CustomerGroupDetail2 = __decorate([
    (0, typeorm_1.Entity)('Customer_Group_Detail_2')
], CustomerGroupDetail2);
exports.CustomerGroupDetail2 = CustomerGroupDetail2;
//# sourceMappingURL=demo.entities.js.map