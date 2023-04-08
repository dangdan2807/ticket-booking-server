import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingDto, PaymentDto } from './dto';
import { CreateOrderDto } from '../order/dto';
import { OrderService } from '../order/order.service';

@Injectable()
export class BookingService {
  constructor(private readonly orderService: OrderService) {}

  async booking(dto: CreateBookingDto, userId: string) {
    const { seatIds, seatCodes, tripDetailCode, promotionLineCodes } = dto;
    const dtoOrder = new CreateOrderDto();
    if (!seatCodes && !seatIds) {
      throw new BadRequestException('SEAT_IDS_OR_SEAT_CODES_REQUIRED');
    }
    if (seatIds && seatIds.length > 0) {
      dtoOrder.seatIds = seatIds;
    }
    if (seatCodes && seatCodes.length > 0) {
      dtoOrder.seatCodes = seatCodes;
    }
    dtoOrder.tripDetailCode = tripDetailCode;
    dtoOrder.note = '';
    dtoOrder.customerId = userId;
    dtoOrder.promotionLineCodes = promotionLineCodes;
    const order = await this.orderService.createOrder(dtoOrder, userId);
    return order;
  }

  async payment(dto: PaymentDto, userId: string) {
    const { orderCode, paymentMethod } = dto;
    const order = await this.orderService.payment(
      orderCode,
      paymentMethod,
      // paymentAmount,
      userId,
    );
    return order;
  }
}
