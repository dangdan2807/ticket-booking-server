import { DataSource, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CronjobOrderPaymentDto } from './dto';
import { Order } from './../../database/entities';
import { PaymentService } from '../payment/payment.service';
export declare class CronjobService {
    private readonly orderRepository;
    private paymentService;
    private dataSource;
    private configService;
    constructor(orderRepository: Repository<Order>, paymentService: PaymentService, dataSource: DataSource, configService: ConfigService);
    cronjobOrderPayment(dto: CronjobOrderPaymentDto): Promise<void>;
}
