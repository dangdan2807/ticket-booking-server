import {
  OrderStatusEnum,
  PaymentHistoryStatusEnum,
  PaymentMethodEnum,
  SortEnum,
  TicketStatusEnum,
  UpdatePayHTypeDtoEnum,
} from './../../enums';
import { Order, OrderDetail, TicketDetail } from './../../database/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as CryptoJS from 'crypto-js';
import { PaymentHistoryService } from '../payment-history/payment-history.service';
import { UpdatePaymentHistoryDto } from '../payment-history/dto';

@Injectable()
export class CallbackService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly paymentHistoryService: PaymentHistoryService,
    private configService: ConfigService,
    private dataSource: DataSource,
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
          },
        },
        customer: {
          id: true,
          status: true,
          phone: true,
          email: true,
          fullName: true,
        },
        ...options?.select,
      },
      relations: {
        orderDetails: { ticketDetail: true },
        customer: true,
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
    if (!code) {
      throw new BadRequestException('ORDER_CODE_IS_REQUIRED');
    }
    if (options) {
      options.where = { code, ...options?.where };
    } else {
      options = { where: { code } };
    }
    return await this.findOneOrder(options);
  }

  async callbackZaloPayV2(dto) {
    const config = {
      key2: await this.configService.get('ZALO_PAY_KEY_2'),
    };
    const result = {};
    const dataStr = dto.data;
    const reqMac = dto.mac;
    const mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    try {
      // kiểm tra callback hợp lệ (đến từ ZaloPay server)
      if (reqMac !== mac) {
        // callback không hợp lệ
        result['return_code'] = -1;
        result['return_message'] = 'mac not equal';
        console.log('mac not equal');
      } else {
        // thanh toán thành công
        // merchant cập nhật trạng thái cho đơn hàng
        const dataJson = JSON.parse(dataStr, config.key2);
        console.log(dataJson);
        const { item, zp_trans_id, server_time } = dataJson;
        const itemJson = JSON.parse(item);
        const orderCode = itemJson[0].orderCode;
        const orderExist = await this.findOneOrderByCode(orderCode);
        if (orderExist) {
          orderExist.paymentMethod = PaymentMethodEnum.ZALOPAY;
          orderExist.status = OrderStatusEnum.PAID;
          orderExist.updatedBy = orderExist.customer.id;
          orderExist.note = 'Thanh toán thành công';

          const paymentHistory =
            await this.paymentHistoryService.findPaymentHByOrderCode(orderCode);

          if (paymentHistory) {
            const phDto = new UpdatePaymentHistoryDto();
            phDto.status = PaymentHistoryStatusEnum.SUCCESS;
            phDto.paymentMethod = PaymentMethodEnum.ZALOPAY;
            phDto.zaloTransId = zp_trans_id;
            phDto.paymentTime = new Date(server_time);
            phDto.type = UpdatePayHTypeDtoEnum.UPDATE;
            await this.paymentHistoryService.updatePaymentHistoryByOrderCode(
              orderCode,
              phDto,
            );
            await this.orderRepository.save(orderExist); // Lưu đơn hàng
            const orderDetails: OrderDetail[] = orderExist.orderDetails; // Lấy chi tiết đơn hàng đã lưu
            const ticketDetails = orderDetails.map(async (orderDetail) => {
              let ticketDetail: TicketDetail = orderDetail.ticketDetail;
              ticketDetail.status = TicketStatusEnum.SOLD;
              ticketDetail = await this.dataSource
                .getRepository(TicketDetail)
                .save(ticketDetail); // Lưu chi tiết vé
              delete ticketDetail.deletedAt;
              return ticketDetail;
            });
            await Promise.all(ticketDetails); // Chờ tất cả các lệnh lưu chi tiết vé hoàn tất
            result['return_code'] = 1;
            result['return_message'] = 'success';
            console.log('thanh toán thành công');
          } else {
            result['return_code'] = 0;
            result['return_message'] = 'fail';
            console.log('không tìm payment history');
          }
        } else {
          result['return_code'] = 0;
          result['return_message'] = 'fail';
          console.log('không tìm thấy đơn hàng');
        }
      }
    } catch (error) {
      result['return_code'] = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
      result['return_message'] = error.message;
    }
    console.log('result =', result);
    // thông báo kết quả cho ZaloPay server
    return result;
  }
}
