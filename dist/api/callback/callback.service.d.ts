import { Order } from './../../database/entities';
import { ConfigService } from '@nestjs/config';
import { DataSource, Repository } from 'typeorm';
import { PaymentHistoryService } from '../payment-history/payment-history.service';
export declare class CallbackService {
    private readonly orderRepository;
    private readonly paymentHistoryService;
    private configService;
    private dataSource;
    constructor(orderRepository: Repository<Order>, paymentHistoryService: PaymentHistoryService, configService: ConfigService, dataSource: DataSource);
    private findOneOrder;
    private findOneOrderByCode;
    callbackZaloPayV2(dto: any): Promise<{}>;
}
