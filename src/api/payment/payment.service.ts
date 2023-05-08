import {
  Staff,
  Order,
  OrderDetail,
  TicketDetail,
  Customer,
} from './../../database/entities';
import { CheckStatusZaloPayPaymentDto } from './dto';
import {
  OrderStatusEnum,
  PaymentHistoryStatusEnum,
  PaymentMethodEnum,
  SortEnum,
  TicketStatusEnum,
  UpdatePayHTypeDtoEnum,
  UserStatusEnum,
} from './../../enums';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CustomerService } from '../customer/customer.service';
import { AdminService } from '../admin/admin.service';
import { ConfigService } from '@nestjs/config';
import * as CryptoJS from 'crypto-js';
import axios from 'axios';
import * as qs from 'qs';
import { PaymentHistoryService } from '../payment-history/payment-history.service';
import {
  CreatePaymentHistoryDto,
  UpdatePaymentHistoryDto,
} from '../payment-history/dto';
import { MyMoment } from './../../utils';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly customerService: CustomerService,
    private readonly adminService: AdminService,
    private readonly paymentHService: PaymentHistoryService,
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {}

  private async findOneOrder(options: any) {
    return await this.orderRepository.findOne({
      where: { ...options?.where },
      select: {
        orderDetails: {
          id: true,
          total: true,
          note: true,
          orderCode: true,
          ticketDetail: {
            id: true,
            code: true,
            status: true,
            note: true,
            ticket: {
              id: true,
              code: true,
              startDate: true,
              endDate: true,
              tripDetail: {
                id: true,
                code: true,
                departureTime: true,
                expectedTime: true,
              },
            },
          },
        },
        customer: {
          id: true,
          status: true,
          phone: true,
          email: true,
          fullName: true,
          gender: true,
          address: true,
          fullAddress: true,
          note: true,
          birthday: true,
        },
        ...options?.select,
      },
      relations: {
        orderDetails: {
          ticketDetail: {
            ticket: {
              tripDetail: true,
            },
          },
        },
        staff: true,
        customer: true,
        paymentHistory: true,
        ...options?.relations,
      },
      order: {
        createdAt: SortEnum.DESC,
        ...options?.orderBy,
      },
      ...options?.other,
    });
  }

  private async findOneOrderByCode(code: string, options?: any) {
    if (options) {
      options.where = { code, ...options?.where };
    } else {
      options = { where: { code } };
    }
    return await this.findOneOrder(options);
  }

  async getZaloPayPaymentUrl(orderCode: string, userId: string) {
    if (!userId) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    const customer: Customer = await this.customerService.findOneById(userId);
    if (!customer) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    if (customer.status === UserStatusEnum.INACTIVATE) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }
    let paymentResult;
    try {
      const orderExist = await this.findOneOrderByCode(orderCode);
      if (!orderExist) {
        throw new BadRequestException('ORDER_NOT_FOUND');
      }
      switch (orderExist.status) {
        case OrderStatusEnum.PAID:
          throw new BadRequestException('ORDER_ALREADY_PAID');
          break;
        case OrderStatusEnum.CANCEL:
          throw new BadRequestException('ORDER_ALREADY_CANCEL');
          break;
        case OrderStatusEnum.RETURNED:
          throw new BadRequestException('ORDER_ALREADY_RETURNED');
          break;
        default:
          break;
      }
      const tripDetail =
        orderExist.orderDetails[0].ticketDetail.ticket.tripDetail;
      const currentDate = new Date(new MyMoment().format('YYYY-MM-DD HH:mm'));
      if (currentDate >= tripDetail.departureTime) {
        throw new BadRequestException('TRIP_DETAIL_HAS_PASSED_NOT_PAYMENT');
      }
      const config = {
        app_id: Number(this.configService.get('ZALO_PAY_APP_ID')),
        key1: this.configService.get('ZALO_PAY_KEY_1'),
        endpoint: this.configService.get('ZALO_PAY_ENDPOINT'),
        company_name: this.configService.get('COMPANY_NAME'),
      };
      const embed_data = {
        redirecturl: this.configService.get('REDIRECT_URL'),
      };
      const randomCode = Math.floor(Math.random() * 1000000);
      const transID = `${new MyMoment().format('YYMMDD')}_${orderCode}-${randomCode}`;
      const items = [
        {
          orderCode,
          transID,
        },
      ];
      const payload = {
        app_id: config.app_id,
        app_trans_id: transID,
        app_user: 'user123',
        app_time: Date.now(), // milliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: Number(orderExist.finalTotal),
        description: `${config.company_name} - Thanh toán vé #${orderCode}`,
        bank_code: 'CC',
        title: `${config.company_name} - Thanh toán vé #${orderCode}`,
        callback_url: this.configService.get('CALLBACK_URL'),
        mac: '',
      };
      const data =
        config.app_id +
        '|' +
        payload.app_trans_id +
        '|' +
        payload.app_user +
        '|' +
        payload.amount +
        '|' +
        payload.app_time +
        '|' +
        payload.embed_data +
        '|' +
        payload.item;
      payload.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
      await axios
        .post(config.endpoint, null, { params: payload })
        .then((result) => {
          paymentResult = {
            zalo: result.data,
            appTransId: payload.app_trans_id,
            appTime: payload.app_time,
          };
        })
        .catch((err) => console.log(err));
      const paymentHistory = await this.paymentHService.findPaymentHByOrderCode(
        orderCode,
      );
      if (paymentHistory) {
        const phUpdateDto = new UpdatePaymentHistoryDto();
        phUpdateDto.amount = orderExist.finalTotal;
        phUpdateDto.status = PaymentHistoryStatusEnum.ZALOPAY_PENDING;
        phUpdateDto.paymentMethod = PaymentMethodEnum.ZALOPAY;
        phUpdateDto.transId = payload.app_trans_id;
        phUpdateDto.createAppTime = payload.app_time;
        phUpdateDto.type = UpdatePayHTypeDtoEnum.GENERATE_NEW_LINK;
        await this.paymentHService.updatePaymentHistoryByOrderCode(
          orderCode,
          phUpdateDto,
        );
      } else {
        const phCreateDto = new CreatePaymentHistoryDto();
        phCreateDto.status = PaymentHistoryStatusEnum.ZALOPAY_PENDING;
        phCreateDto.amount = orderExist.finalTotal;
        phCreateDto.orderCode = orderExist.code;
        phCreateDto.paymentMethod = PaymentMethodEnum.ZALOPAY;
        phCreateDto.transId = payload.app_trans_id;
        phCreateDto.createAppTime = payload.app_time;
        await this.paymentHService.createPaymentHistory(phCreateDto, userId);
      }

      orderExist.paymentMethod = PaymentMethodEnum.ZALOPAY;
      orderExist.updatedBy = userId;
      await this.orderRepository.save(orderExist);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    if (!paymentResult) {
      throw new BadRequestException('CONNECT_ZALOPAY_FAIL');
    }
    return paymentResult;
  }

  async checkStatusZaloPay(dto: CheckStatusZaloPayPaymentDto, userId: string) {
    let saveOrder: Order;
    try {
      if (!userId) {
        throw new UnauthorizedException('UNAUTHORIZED');
      }
      const staff: Staff = await this.adminService.findOneById(userId);
      if (!staff) {
        throw new UnauthorizedException('UNAUTHORIZED');
      }
      if (!staff.isActive) {
        throw new BadRequestException('USER_NOT_ACTIVE');
      }
      const { orderCode, paymentMethod } = dto;
      if (!orderCode) {
        throw new BadRequestException('ORDER_CODE_REQUIRED');
      }

      const orderExist = await this.findOneOrderByCode(orderCode);
      if (!orderExist) {
        throw new BadRequestException('ORDER_NOT_FOUND');
      }
      const paymentHistory = await this.paymentHService.findPaymentHByOrderCode(
        orderCode,
      );
      if (!paymentHistory) {
        throw new BadRequestException('PAYMENT_HISTORY_NOT_FOUND');
      }
      switch (orderExist.status) {
        case OrderStatusEnum.PAID:
          throw new BadRequestException('ORDER_ALREADY_PAID');
        case OrderStatusEnum.CANCEL:
          throw new BadRequestException('ORDER_ALREADY_CANCEL');
        case OrderStatusEnum.RETURNED:
          throw new BadRequestException('ORDER_ALREADY_RETURNED');
        default:
          break;
      }
      if (paymentMethod !== PaymentMethodEnum.ZALOPAY) {
        throw new BadRequestException('PAYMENT_METHOD_NOT_FOUND');
      }
      orderExist.updatedBy = userId;
      if (!paymentHistory.transId || !paymentHistory.createAppTime) {
        throw new BadRequestException('TRANSACTION_ID_REQUIRED');
      }
      const config = {
        app_id: this.configService.get('ZALO_PAY_APP_ID'),
        key1: this.configService.get('ZALO_PAY_KEY_1'),
        key2: this.configService.get('ZALO_PAY_KEY_2'),
        endpoint: this.configService.get('ZALO_PAY_ENDPOINT_QUERY'),
      };
      const postData = {
        app_id: config.app_id,
        app_trans_id: paymentHistory.transId,
      };
      const data = `${postData.app_id}|${postData.app_trans_id}|${config.key1}`;
      postData['mac'] = CryptoJS.HmacSHA256(data, config.key1).toString();

      const postConfig = {
        method: 'post',
        url: config.endpoint,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify(postData),
      };
      let flag = 0;
      const logData = {
        orderCode,
        paymentMethod,
        transId: paymentHistory.transId,
        createAppTime: paymentHistory.createAppTime,
      };
      console.log('check payment: ', logData);

      await axios(postConfig).then(async (response) => {
        console.log('return_code: ', response.data.return_code);
        if (response.data.return_code === 1) {
          orderExist.paymentMethod = paymentMethod;
          orderExist.status = OrderStatusEnum.PAID;
          orderExist.note = 'Thanh toán thành công';
          const dtoPH = new UpdatePaymentHistoryDto();
          dtoPH.status = PaymentHistoryStatusEnum.SUCCESS;
          dtoPH.paymentMethod = paymentMethod;
          dtoPH.zaloTransId = response.data.zp_trans_id;
          dtoPH.paymentTime = new Date(response.data.server_time);
          dtoPH.type = UpdatePayHTypeDtoEnum.UPDATE;
          dtoPH.amount = orderExist.finalTotal;
          await this.paymentHService.updatePaymentHistoryByOrderCode(
            orderCode,
            dtoPH,
          );
          saveOrder = await this.orderRepository.save(orderExist);
          flag = 1;
        } else if (
          Date.now() > Number(paymentHistory.createAppTime) + 15 * 60 * 1000 ||
          response.data.return_code === 2
        ) {
          orderExist.note = 'Thanh toán thất bại';
          saveOrder = await this.orderRepository.save(orderExist);
          flag = 0;
          throw new BadRequestException('PAYMENT_FAIL');
        } else if (response.data.return_code === 3) {
          orderExist.note = 'ZaloPay đang xử lý thanh toán';
          flag = 2;
          saveOrder = await this.orderRepository.save(orderExist);
          throw new BadRequestException('PAYMENT_NOT_COMPLETE');
        }
      });

      if (flag === 0) {
        throw new BadRequestException('PAYMENT_FAIL');
      } else if (flag === 2) {
        throw new BadRequestException('PAYMENT_NOT_COMPLETE');
      }
      const orderDetails: OrderDetail[] = orderExist.orderDetails;
      const ticketDetails = orderDetails.map(async (orderDetail) => {
        let ticketDetail: TicketDetail = orderDetail.ticketDetail;
        ticketDetail.status = TicketStatusEnum.SOLD;
        ticketDetail = await this.dataSource
          .getRepository(TicketDetail)
          .save(ticketDetail);
        delete ticketDetail.deletedAt;
        return ticketDetail;
      });
      await Promise.all(ticketDetails);
      saveOrder = await this.findOneOrderByCode(orderCode);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return saveOrder;
  }
}
