import { Order } from './../../database/entities';
import { CheckStatusZaloPayPaymentDto } from './dto';
import { DataSource, Repository } from 'typeorm';
import { CustomerService } from '../customer/customer.service';
import { AdminService } from '../admin/admin.service';
import { ConfigService } from '@nestjs/config';
import { PaymentHistoryService } from '../payment-history/payment-history.service';
export declare class PaymentService {
    private readonly orderRepository;
    private readonly customerService;
    private readonly adminService;
    private readonly paymentHService;
    private dataSource;
    private configService;
    constructor(orderRepository: Repository<Order>, customerService: CustomerService, adminService: AdminService, paymentHService: PaymentHistoryService, dataSource: DataSource, configService: ConfigService);
    private findOneOrder;
    private findOneOrderByCode;
    getZaloPayPaymentUrl(orderCode: string, userId: string): Promise<any>;
    checkStatusZaloPay(dto: CheckStatusZaloPayPaymentDto, userId: string): Promise<Order>;
}
