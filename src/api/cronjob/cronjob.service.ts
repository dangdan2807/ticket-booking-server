import { CheckStatusZaloPayPaymentDto } from './../payment/dto';
import { OrderStatusEnum, PaymentMethodEnum } from './../../enums';
import { DataSource, Repository } from 'typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CronjobOrderPaymentDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, PaymentHistory } from './../../database/entities';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class CronjobService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private paymentService: PaymentService,
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {}

  async cronjobOrderPayment(dto: CronjobOrderPaymentDto) {
    try {
      const { secretKey } = dto;
      const secret = this.configService.get('SECRET_KEY_CRONJOB');
      if (secretKey !== secret) {
        throw new BadRequestException('SECRET_KEY_IS_NOT_VALID');
      }

      const orderCodes = await this.orderRepository
        .createQueryBuilder('q')
        .where('q.status = :status', { status: OrderStatusEnum.UNPAID })
        .select(['q.code'])
        .getMany();

      if (orderCodes.length <= 0) {
        console.log('No order need to cronjob');
      } else {
        const orderCodesInPH = await this.dataSource
          .getRepository(PaymentHistory)
          .createQueryBuilder('q')
          .where('q.orderCode IN (:...orderCodes)', {
            orderCodes: orderCodes.map((item) => item.code),
          })
          .andWhere('q.transId IS NOT NULL')
          .andWhere('q.createAppTime IS NOT NULL')
          .select(['q.orderCode'])
          .getMany();
        if (orderCodesInPH.length > 0) {
          const userId = await this.configService.get('ADMIN_ID');
          const cronjob = await orderCodes.map(async (item) => {
            const { code } = item;
            const dto = new CheckStatusZaloPayPaymentDto();
            dto.orderCode = code;
            dto.paymentMethod = PaymentMethodEnum.ZALOPAY;
            const order = await this.paymentService.checkStatusZaloPay(
              dto,
              userId,
            );
            return order;
          });
          await Promise.all(cronjob);
        } else {
          console.log('No order need to cronjob');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
