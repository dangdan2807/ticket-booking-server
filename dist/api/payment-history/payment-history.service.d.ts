import { Pagination } from './../../decorator';
import { ConfigService } from '@nestjs/config';
import { DataSource, Repository } from 'typeorm';
import { CustomerService } from '../customer/customer.service';
import { AdminService } from '../admin/admin.service';
import { CreatePaymentHistoryDto, FilterPaymentHistoryDto, UpdatePaymentHistoryDto } from './dto';
import { Order, PaymentHistory } from './../../database/entities';
export declare class PaymentHistoryService {
    private readonly orderRepository;
    private readonly paymentHRepository;
    private readonly customerService;
    private readonly adminService;
    private dataSource;
    private configService;
    constructor(orderRepository: Repository<Order>, paymentHRepository: Repository<PaymentHistory>, customerService: CustomerService, adminService: AdminService, dataSource: DataSource, configService: ConfigService);
    private findOneOrder;
    private findOneOrderByCode;
    private getOrderByCode;
    findOnePaymentHistory(options: any): Promise<PaymentHistory>;
    findOnePaymentHistoryByCode(code: string, options?: any): Promise<PaymentHistory>;
    findOnePaymentHistoryById(id: string, options?: any): Promise<PaymentHistory>;
    findPaymentHByOrderCode(orderCode: string, options?: any): Promise<PaymentHistory>;
    getPaymentHistoryByCode(code: string, options?: any): Promise<PaymentHistory>;
    getPaymentHistoryById(id: string, options?: any): Promise<PaymentHistory>;
    getPaymentHistoryByOrderCode(orderCode: string, options?: any): Promise<PaymentHistory>;
    findAllPaymentHistory(dto: FilterPaymentHistoryDto, userId: string, pagination?: Pagination): Promise<{
        dataResult: PaymentHistory[];
        total: number;
        pagination: Pagination;
    }>;
    createPaymentHistory(dto: CreatePaymentHistoryDto, userId: string): Promise<PaymentHistory>;
    updatePaymentHistoryByOrderCode(orderCode: string, dto: UpdatePaymentHistoryDto): Promise<PaymentHistory>;
}
