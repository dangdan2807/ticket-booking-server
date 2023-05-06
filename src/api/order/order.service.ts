import { Pagination } from './../../decorator';
import { TripDetailService } from './../trip-detail/trip-detail.service';
import {
  Order,
  OrderDetail,
  OrderRefund,
  OrderRefundDetail,
  PriceDetail,
  PromotionHistory,
  Seat,
  Staff,
  TicketDetail,
  TripDetail,
  Vehicle,
} from './../../database/entities';
import { DataSource, Repository } from 'typeorm';
import {
  CreateOrderDto,
  FilterOrderDto,
  UpdateOrderDto,
  FilterAllDto,
  CreateOrderDetailDto,
  FilterBillHistoryDto,
  FilterBillAvailableDto,
  PaymentAdminDto,
} from './dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  OrderStatusEnum,
  OrderUpdateStatusCustomerEnum,
  OrderRefundStatusEnum,
  PaymentMethodEnum,
  PromotionHistoryTypeEnum,
  PromotionTypeEnum,
  SortEnum,
  TicketStatusEnum,
  UserStatusEnum,
  PaymentHistoryStatusEnum,
} from './../../enums';
import { generateOrderCode } from './../../utils';
import { CustomerService } from '../customer/customer.service';
import { AdminService } from '../admin/admin.service';
import { SeatService } from '../seat/seat.service';
import { TicketService } from '../ticket/ticket.service';
import { PriceListService } from '../price-list/price-list.service';
import { UpdateTicketDetailDto } from '../ticket/dto';
import { PromotionLineService } from '../promotion-line/promotion-line.service';
import { PromotionHistoryService } from '../promotion-history/promotion-history.service';
import { CreatePromotionHistoryDto } from '../promotion-history/dto';
import moment from 'moment';
import {
  FilterOrderRefundDto,
  UpdateOrderRefundDto,
} from '../order-refund/dto';
import { ConfigService } from '@nestjs/config';
import { PaymentHistoryService } from '../payment-history/payment-history.service';
import { CreatePaymentHistoryDto } from '../payment-history/dto';
// moment.locale('vi');

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(OrderRefund)
    private readonly orderRefundRepository: Repository<OrderRefund>,
    @InjectRepository(OrderRefundDetail)
    private readonly orderRDRepository: Repository<OrderRefundDetail>,
    @InjectRepository(PromotionHistory)
    private readonly promotionHistoryRepository: Repository<PromotionHistory>,
    @InjectRepository(TicketDetail)
    private readonly ticketDetailRepository: Repository<TicketDetail>,
    private readonly customerService: CustomerService,
    private readonly adminService: AdminService,
    private readonly seatService: SeatService,
    private readonly ticketService: TicketService,
    private readonly tripDetailService: TripDetailService,
    private readonly priceListService: PriceListService,
    private readonly promotionLineService: PromotionLineService,
    private readonly promotionHistoryService: PromotionHistoryService,
    private readonly paymentHService: PaymentHistoryService,
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {}

  private SEAT_TYPE_DTO_ID = 'id';
  private SEAT_TYPE_DTO_CODE = 'code';

  private BILL_HISTORY_TYPE_HAS_DEPARTED = 'hasDeparted';
  private BILL_HISTORY_TYPE_NOT_DEPARTED = 'notDeparted';

  private selectFieldsOrderWithQ = [
    'q.id',
    'q.code',
    'q.status',
    'q.note',
    'q.total',
    'q.finalTotal',
    'q.createdAt',
    'c.fullName',
    's.fullName',
  ];

  private selectFieldsOrderRefundWithQ = [
    'q.id',
    'q.code',
    'q.note',
    'q.status',
    'q.total',
    'q.orderCode',
    'q.createdAt',
    'ord.id',
    'ord.total',
    'ord.note',
    'ord.orderRefundCode',
    'ord.createdAt',
    'c.id',
    'c.code',
    'c.status',
    'c.fullName',
    'c.gender',
    'c.phone',
    'c.email',
    'c.fullAddress',
    's.id',
    's.code',
    's.isActive',
    's.fullName',
    's.gender',
    's.phone',
    's.email',
    's.address',
  ];

  // order
  async findOneOrder(options: any) {
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
            seat: {
              id: true,
              code: true,
              name: true,
              vehicle: {
                id: true,
                code: true,
                name: true,
                licensePlate: true,
                totalSeat: true,
                status: true,
              },
            },
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
                trip: {
                  id: true,
                  code: true,
                  name: true,
                  status: true,
                  fromStation: {
                    id: true,
                    code: true,
                    name: true,
                    fullAddress: true,
                  },
                  toStation: {
                    id: true,
                    code: true,
                    name: true,
                    fullAddress: true,
                  },
                },
              },
            },
          },
        },
        staff: {
          id: true,
          code: true,
          isActive: true,
          phone: true,
          email: true,
          fullName: true,
          gender: true,
          birthDay: true,
        },
        customer: {
          id: true,
          code: true,
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
        promotionHistories: {
          id: true,
          code: true,
          amount: true,
          note: true,
          quantity: true,
          type: true,
          promotionLineCode: true,
          orderCode: true,
        },
        ...options?.select,
      },
      relations: {
        orderDetails: {
          ticketDetail: {
            seat: {
              vehicle: true,
            },
            ticket: {
              tripDetail: {
                trip: {
                  fromStation: true,
                  toStation: true,
                },
              },
            },
          },
        },
        staff: true,
        customer: true,
        promotionHistories: true,
        ...options?.relations,
      },
      order: {
        createdAt: SortEnum.DESC,
        ...options?.orderBy,
      },
      ...options?.other,
    });
  }

  async findOneOrderById(id: string, options?: any) {
    if (options) {
      options.where = { id, ...options?.where };
    } else {
      options = { where: { id } };
    }
    return await this.findOneOrder(options);
  }

  async findOneOrderByCode(code: string, options?: any) {
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

  async getOrderById(id: string, options?: any) {
    const order = await this.findOneOrderById(id, options);
    if (!order) {
      throw new BadRequestException('ORDER_NOT_FOUND');
    }
    return order;
  }

  async getOrderByCode(code: string, options?: any) {
    const order = await this.findOneOrderByCode(code, options);
    if (!order) {
      throw new BadRequestException('ORDER_NOT_FOUND');
    }
    return order;
  }

  async getOrderStatus() {
    return {
      dataResult: Object.keys(OrderStatusEnum).map(
        (key) => OrderStatusEnum[key],
      ),
    };
  }

  async getOrderRefundStatus() {
    return {
      dataResult: Object.keys(OrderRefundStatusEnum).map(
        (key) => OrderRefundStatusEnum[key],
      ),
    };
  }

  async getOrderUpdateStatus() {
    return {
      dataResult: Object.keys(OrderUpdateStatusCustomerEnum).map(
        (key) => OrderUpdateStatusCustomerEnum[key],
      ),
    };
  }

  async getPaymentMethod() {
    return {
      dataResult: Object.keys(PaymentMethodEnum).map(
        (key) => PaymentMethodEnum[key],
      ),
    };
  }

  private async findAll(
    dto: FilterAllDto,
    userId: string,
    pagination?: Pagination,
    isDeparted?: string,
  ) {
    const {
      keywords,
      status,
      minFinalTotal,
      maxFinalTotal,
      startDate,
      endDate,
      sort,
    } = dto;
    const customer = await this.customerService.findOneById(userId);
    const admin = await this.adminService.findOneById(userId);
    if (!userId) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    if (
      (customer && customer.status === UserStatusEnum.INACTIVATE) ||
      (admin && !admin.isActive)
    ) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }

    const query = this.orderRepository.createQueryBuilder('q');

    if (keywords) {
      const newKeywords = keywords.trim();
      const subQuery = this.orderRepository
        .createQueryBuilder('q2')
        .select('q2.id')
        .where('q2.code LIKE :code', { code: `%${newKeywords}%` })
        .orWhere('q2.note LIKE :note', { note: `%${newKeywords}%` })
        .getQuery();

      query.andWhere(`q.id IN (${subQuery})`, {
        code: `%${newKeywords}%`,
        note: `%${newKeywords}%`,
      });
    }

    if (status && status.length > 0) {
      if (status.length === 1) {
        switch (status[0]) {
          case OrderStatusEnum.UNPAID:
          case OrderStatusEnum.CANCEL:
          case OrderStatusEnum.PAID:
          case OrderStatusEnum.RETURNED:
            query.andWhere('q.status = :status', { status: status[0] });
            break;
          default:
            break;
        }
      } else if (status.length === 2) {
        switch (status[0]) {
          case OrderStatusEnum.UNPAID:
          case OrderStatusEnum.CANCEL:
          case OrderStatusEnum.PAID:
          case OrderStatusEnum.RETURNED:
            query.andWhere('q.status IN (:...status)', { status });
            break;
          default:
            break;
        }
      }
    }

    if (minFinalTotal) {
      query.andWhere('q.finalTotal >= :minFinalTotal', { minFinalTotal });
    }
    if (maxFinalTotal) {
      query.andWhere('q.finalTotal <= :maxFinalTotal', { maxFinalTotal });
    }

    if (customer) {
      query.andWhere('c.id = :customerId', { customerId: userId });
    }

    if (startDate) {
      const newStartDate = moment(startDate).startOf('day').toDate();
      query.andWhere('q.createdAt >= :newStartDate', { newStartDate });
    }
    if (endDate) {
      const newEndDate = moment(endDate).endOf('day').toDate();
      query.andWhere('q.createdAt <= :newEndDate', { newEndDate });
    }

    query
      .orderBy('q.createdAt', sort || SortEnum.DESC)
      .addOrderBy('q.finalTotal', SortEnum.ASC)
      .addOrderBy('q.code', SortEnum.ASC);

    if (status[0] === OrderStatusEnum.PAID && status.length === 1) {
      const currentDate = moment().toDate();
      if (
        isDeparted === this.BILL_HISTORY_TYPE_HAS_DEPARTED ||
        isDeparted === this.BILL_HISTORY_TYPE_NOT_DEPARTED
      ) {
        const subQuery = this.orderRepository.createQueryBuilder('q2');
        subQuery
          .leftJoinAndSelect('q2.customer', 'c2')
          .leftJoinAndSelect('q2.orderDetails', 'od2')
          .leftJoinAndSelect('od2.ticketDetail', 'td2')
          .leftJoinAndSelect('td2.ticket', 't2')
          .leftJoinAndSelect('t2.tripDetail', 'trd2')
          .where('c2.id = :customerId', { customerId: userId });
        if (isDeparted === this.BILL_HISTORY_TYPE_HAS_DEPARTED) {
          subQuery.andWhere('trd2.departureTime <= :currentDate', {
            currentDate,
          });
        } else if (isDeparted === this.BILL_HISTORY_TYPE_NOT_DEPARTED) {
          subQuery.andWhere('trd2.departureTime > :currentDate', {
            currentDate,
          });
        }
        subQuery.select('q2.id');

        query.andWhere(`q.id IN (${subQuery.getQuery()})`, {
          currentDate,
          customerId: userId,
        });
      }
    }

    const dataResult = await query
      .leftJoinAndSelect('q.customer', 'c')
      .leftJoinAndSelect('q.staff', 's')
      .select(this.selectFieldsOrderWithQ)
      .offset(pagination.skip || 0)
      .limit(pagination.take || 10)
      .getMany();

    const total = await query.getCount();

    return { dataResult, total, pagination };
  }

  async findAllOrder(
    dto: FilterOrderDto,
    userId: string,
    pagination?: Pagination,
  ) {
    const {
      keywords,
      status,
      sort,
      minFinalTotal,
      maxFinalTotal,
      startDate,
      endDate,
    } = dto;
    const filterDto = new FilterAllDto();
    filterDto.keywords = keywords;
    if (
      status === OrderStatusEnum.UNPAID ||
      status === OrderStatusEnum.CANCEL
    ) {
      filterDto.status = [status];
    } else {
      filterDto.status = [OrderStatusEnum.UNPAID, OrderStatusEnum.CANCEL];
    }
    filterDto.sort = sort;
    filterDto.minFinalTotal = minFinalTotal;
    filterDto.maxFinalTotal = maxFinalTotal;
    filterDto.startDate = startDate;
    filterDto.endDate = endDate;
    return await this.findAll(filterDto, userId, pagination);
  }

  async findAllBill(
    dto: FilterOrderDto,
    userId: string,
    pagination?: Pagination,
  ) {
    const {
      keywords,
      status,
      sort,
      minFinalTotal,
      maxFinalTotal,
      startDate,
      endDate,
    } = dto;
    const filterDto = new FilterAllDto();
    filterDto.keywords = keywords;
    if (
      status === OrderStatusEnum.PAID ||
      status === OrderStatusEnum.RETURNED
    ) {
      filterDto.status = [status];
    } else {
      filterDto.status = [OrderStatusEnum.PAID, OrderStatusEnum.RETURNED];
    }
    filterDto.sort = sort;
    filterDto.minFinalTotal = minFinalTotal;
    filterDto.maxFinalTotal = maxFinalTotal;
    filterDto.startDate = startDate;
    filterDto.endDate = endDate;
    return await this.findAll(filterDto, userId, pagination);
  }

  async findAllBillHistoryForCustomer(
    dto: FilterBillHistoryDto,
    userId: string,
    pagination?: Pagination,
  ) {
    const { keywords, status, sort, startDate, endDate } = dto;
    const filterDto = new FilterAllDto();
    filterDto.keywords = keywords;
    const isDeparted = this.BILL_HISTORY_TYPE_HAS_DEPARTED;
    if (
      status === OrderStatusEnum.PAID ||
      status === OrderStatusEnum.RETURNED
    ) {
      filterDto.status = [status];
    } else {
      filterDto.status = [OrderStatusEnum.PAID, OrderStatusEnum.RETURNED];
    }
    filterDto.sort = sort;
    filterDto.startDate = startDate;
    filterDto.endDate = endDate;
    return await this.findAll(filterDto, userId, pagination, isDeparted);
  }

  async findAllBillAvailableForCustomer(
    dto: FilterBillAvailableDto,
    userId: string,
    pagination?: Pagination,
  ) {
    const { keywords, sort, startDate, endDate } = dto;
    const filterDto = new FilterAllDto();
    filterDto.keywords = keywords;
    const isDeparted = this.BILL_HISTORY_TYPE_NOT_DEPARTED;
    filterDto.status = [OrderStatusEnum.PAID];
    filterDto.sort = sort;
    filterDto.startDate = startDate;
    filterDto.endDate = endDate;
    return await this.findAll(filterDto, userId, pagination, isDeparted);
  }

  async createOrder(dto: CreateOrderDto, creatorId: string) {
    const {
      note,
      seatIds,
      seatCodes,
      tripDetailCode,
      customerId,
      promotionLineCodes,
    } = dto;
    // check permission
    const customerCreator = await this.customerService.findOneById(creatorId);
    const admin = await this.adminService.findOneById(creatorId);
    if (!creatorId) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    if (
      (customerCreator &&
        customerCreator.status === UserStatusEnum.INACTIVATE) ||
      (admin && !admin.isActive)
    ) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }

    const customer = await this.customerService.findOneById(customerId);
    if (!customerId) {
      throw new UnauthorizedException('CUSTOMER_NOT_FOUND');
    }
    if (customer && customer.status === UserStatusEnum.INACTIVATE) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }

    // check trip detail
    const tripDetail = await this.tripDetailService.getTripDetailByCode(
      tripDetailCode,
      {
        relations: { trip: true },
      },
    );
    const currentDate = new Date(moment().format('YYYY-MM-DD HH:mm'));
    const currentDatePlus1Hours = new Date(
      moment().add(1, 'hours').format('YYYY-MM-DD HH:mm'),
    );
    if (currentDate >= tripDetail.departureTime) {
      throw new BadRequestException('TRIP_DETAIL_HAS_PASSED');
    } else if (
      customerCreator &&
      currentDatePlus1Hours >= tripDetail.departureTime
    ) {
      throw new BadRequestException('TRIP_DETAIL_HAS_PASSED_1_HOURS');
    }
    // check trip
    const trip = tripDetail.trip;
    if (trip.startDate > currentDate || trip.endDate < currentDate) {
      throw new BadRequestException('TRIP_NOT_ACTIVE');
    }

    const order = new Order();
    order.note = note;
    order.customer = customer;
    if (customerCreator) {
      order.createdBy = customerCreator.id;
    } else if (admin) {
      order.staff = admin;
      order.createdBy = admin.id;
    }
    order.status = OrderStatusEnum.UNPAID;
    // generate order code
    let code = generateOrderCode();
    let flag = true;
    while (flag) {
      const orderExist = await this.findOneOrderByCode(code);
      if (!orderExist) {
        flag = false;
      } else {
        code = generateOrderCode();
      }
    }
    order.code = code;
    order.total = 0;
    order.finalTotal = 0;

    const queryRunnerOrder =
      this.orderRepository.manager.connection.createQueryRunner();
    await queryRunnerOrder.connect();
    await queryRunnerOrder.startTransaction();
    const createOrder = await this.orderRepository.save(order);
    let orderDetails: Promise<OrderDetail>[];
    let saveOrder: Order;
    try {
      if (!seatIds && !seatCodes) {
        throw new BadRequestException('SEAT_IDS_OR_SEAT_CODES_REQUIRED');
      }
      let seatType;
      if (seatIds && seatIds.length > 0) {
        seatType = this.SEAT_TYPE_DTO_ID;
      } else if (seatCodes && seatCodes.length > 0) {
        seatType = this.SEAT_TYPE_DTO_CODE;
      }
      // create order detail
      if (seatType === this.SEAT_TYPE_DTO_ID) {
        orderDetails = seatIds.map(async (seatId) => {
          const dto = new CreateOrderDetailDto();
          dto.note = '';
          dto.seatId = seatId;
          dto.orderId = createOrder.id;
          dto.tripDetailCode = tripDetail.code;
          return await this.createOrderDetail(dto, creatorId, createOrder);
        });
      } else if (seatType === this.SEAT_TYPE_DTO_CODE) {
        orderDetails = seatCodes.map(async (seatCode) => {
          const dto = new CreateOrderDetailDto();
          dto.note = '';
          dto.seatCode = seatCode;
          dto.orderId = createOrder.id;
          dto.tripDetailCode = tripDetail.code;
          return await this.createOrderDetail(dto, creatorId, createOrder);
        });
      }

      createOrder.orderDetails = await Promise.all(orderDetails);
      if (!createOrder.orderDetails || createOrder.orderDetails?.length === 0) {
        throw new BadRequestException('CREATE_ORDER_DETAIL_FAILED');
      }
      createOrder.total = createOrder.orderDetails.reduce(
        (total, orderDetail) => total + orderDetail.total,
        0,
      );
      createOrder.finalTotal = createOrder.total;

      saveOrder = await queryRunnerOrder.manager.save(createOrder);
      await queryRunnerOrder.commitTransaction();
      delete saveOrder?.staff;
      delete saveOrder?.customer;
    } catch (error) {
      await queryRunnerOrder.rollbackTransaction();
      if (orderDetails && orderDetails.length > 0) {
        const orderDetailsArray = await Promise.all(orderDetails);
        await this.orderDetailRepository.remove(orderDetailsArray);
      }
      await this.orderRepository.remove(createOrder);
      if (error.message) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('INTERNAL_SERVER_ERROR');
      }
    } finally {
      await queryRunnerOrder.release();
    }

    // promotion history
    const queryRunnerOrder2 =
      this.orderRepository.manager.connection.createQueryRunner();
    await queryRunnerOrder2.connect();
    await queryRunnerOrder2.startTransaction();
    try {
      const dataResult = promotionLineCodes.map(async (promotionLineCode) => {
        const promotionLine =
          await this.promotionLineService.findOnePromotionLineByCode(
            promotionLineCode,
          );
        if (!promotionLine) {
          const promotionHistory = new PromotionHistory();
          promotionHistory.promotionLineCode = promotionLineCode;
          promotionHistory['message'] = 'Không tìm thấy khuyến mãi';
          return promotionHistory;
        }
        const dto = new CreatePromotionHistoryDto();
        dto.promotionLineCode = promotionLineCode;
        dto.orderCode = saveOrder.code;
        if (promotionLine.type === PromotionTypeEnum.PRODUCT_DISCOUNT) {
          dto.type = PromotionHistoryTypeEnum.PRODUCT_DISCOUNT;
        } else {
          dto.type = PromotionHistoryTypeEnum.PRODUCT_DISCOUNT_PERCENT;
        }
        return await this.promotionHistoryService.createPromotionHistory(
          dto,
          creatorId,
        );
      });
      const promotionHistories = await Promise.all(dataResult);
      const finalTotal = promotionHistories.reduce(
        (total, promotionHistory) => {
          if (promotionHistory.type !== PromotionHistoryTypeEnum.REFUND) {
            return total + promotionHistory.amount;
          }
        },
        saveOrder.finalTotal,
      );
      saveOrder.finalTotal = finalTotal;
      await queryRunnerOrder2.manager.save(saveOrder);
      await queryRunnerOrder2.commitTransaction();
      saveOrder.promotionHistories = promotionHistories;
    } catch (error) {
      await queryRunnerOrder2.rollbackTransaction();
    } finally {
      await queryRunnerOrder2.release();
    }
    return saveOrder;
  }

  async updateOrderByIdOrCode(
    dto: UpdateOrderDto,
    userId: string,
    id?: string,
    code?: string,
  ) {
    const admin = await this.adminService.findOneById(userId);
    const customer = await this.customerService.findOneById(userId);

    if (!userId) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    if (
      (customer && customer.status === UserStatusEnum.INACTIVATE) ||
      (admin && !admin.isActive)
    ) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }

    if (!id && !code) {
      throw new BadRequestException('ID_OR_CODE_REQUIRED');
    }
    let order: Order;
    if (id) {
      order = await this.findOneOrderById(id);
    } else {
      order = await this.findOneOrderByCode(code);
    }
    if (!order) {
      throw new BadRequestException('ORDER_NOT_FOUND');
    }
    if (customer) {
      if (order.customer.id !== customer.id) {
        throw new BadRequestException('ORDER_NOT_BELONG_TO_USER');
      }
      order.updatedBy = customer.id;
    } else {
      order.updatedBy = admin.id;
    }
    switch (order.status) {
      case OrderStatusEnum.CANCEL:
        throw new BadRequestException('ORDER_ALREADY_CANCEL');
        break;
      case OrderStatusEnum.RETURNED:
        throw new BadRequestException('ORDER_ALREADY_RETURNED');
        break;
      default:
        break;
    }
    const { note, status } = dto;
    order.note = note;
    const promotionHistories: PromotionHistory[] = order.promotionHistories;
    const ticketDetails: TicketDetail[] = order.orderDetails.map(
      (orderDetail) => orderDetail.ticketDetail,
    );
    let saveTicketDetails;
    const queryTickerDetail =
      this.ticketDetailRepository.manager.connection.createQueryRunner();
    await queryTickerDetail.connect();
    await queryTickerDetail.startTransaction();
    try {
      switch (status) {
        case OrderUpdateStatusCustomerEnum.CANCEL:
          if (order.status === OrderStatusEnum.PAID) {
            throw new BadRequestException('ORDER_ALREADY_PAID');
          }
          order.status = OrderStatusEnum.CANCEL;
          if (promotionHistories && promotionHistories.length > 0) {
            const destroyPromotionHistories = promotionHistories.map(
              async (promotionHistory) => {
                const dto = new CreatePromotionHistoryDto();
                dto.promotionLineCode = promotionHistory.promotionLineCode;
                dto.orderCode = promotionHistory.orderCode;
                dto.type = PromotionHistoryTypeEnum.CANCEL;
                return await this.promotionHistoryService.createPromotionHistory(
                  dto,
                  userId,
                );
              },
            );
            await Promise.all(destroyPromotionHistories);
          }
          saveTicketDetails = ticketDetails.map((ticketDetail) => {
            ticketDetail.status = TicketStatusEnum.NON_SOLD;
            return ticketDetail;
          });
          break;
        case OrderUpdateStatusCustomerEnum.RETURNED:
          if (order.status === OrderStatusEnum.UNPAID) {
            throw new BadRequestException('ORDER_NOT_PAID');
          }
          order.status = OrderStatusEnum.RETURNED;

          const currentDate = new Date(moment().format('YYYY-MM-DD HH:mm'));
          const tripDetail: TripDetail =
            order.orderDetails[0].ticketDetail.ticket.tripDetail;
          const departureTime = tripDetail.departureTime;
          const timeDiff = moment(departureTime).diff(currentDate, 'hours');
          if (customer && timeDiff < 12 && timeDiff > 0) {
            throw new BadRequestException('ORDER_CANNOT_CANCEL_12H_BEFORE');
          } else if (timeDiff <= 0) {
            throw new BadRequestException(
              'ORDER_CANNOT_CANCEL_AFTER_DEPARTURE',
            );
          }
          await this.createOrderRefund(order.code, userId);

          // hoàn trả khuyến mãi
          if (promotionHistories && promotionHistories.length > 0) {
            const destroyPromotionHistories = promotionHistories.map(
              async (promotionHistory) => {
                const dto = new CreatePromotionHistoryDto();
                dto.promotionLineCode = promotionHistory.promotionLineCode;
                dto.orderCode = promotionHistory.orderCode;
                dto.type = PromotionHistoryTypeEnum.REFUND;
                return await this.promotionHistoryService.createPromotionHistory(
                  dto,
                  userId,
                );
              },
            );
            await Promise.all(destroyPromotionHistories);
          }
          saveTicketDetails = ticketDetails.map((ticketDetail) => {
            ticketDetail.status = TicketStatusEnum.NON_SOLD;
            return ticketDetail;
          });
          break;
        default:
          break;
      }
      await queryTickerDetail.manager.save(saveTicketDetails);
      await queryTickerDetail.commitTransaction();

      const saveOrder = await this.orderRepository.save(order);
      return saveOrder;
    } catch (error) {
      await queryTickerDetail.rollbackTransaction();
      throw new BadRequestException(error.message);
    }
  }

  async paymentForAdmin(dto: PaymentAdminDto, userId: string) {
    if (!userId) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    const admin: Staff = await this.adminService.findOneById(userId);
    if (!admin) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    if (admin && !admin.isActive) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }
    const { orderCode } = dto;
    if (!orderCode) {
      throw new BadRequestException('ORDER_CODE_REQUIRED');
    }

    const orderExist = await this.findOneOrderByCode(orderCode);
    if (!orderExist) {
      throw new BadRequestException('ORDER_NOT_FOUND');
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
    orderExist.status = OrderStatusEnum.PAID;
    orderExist.paymentMethod = PaymentMethodEnum.CASH;
    const phDto = new CreatePaymentHistoryDto();
    phDto.amount = orderExist.finalTotal;
    phDto.createAppTime = Date.now();
    phDto.orderCode = orderCode;
    phDto.paymentMethod = PaymentMethodEnum.CASH;
    phDto.status = PaymentHistoryStatusEnum.SUCCESS;
    phDto.transId = `CASH_${orderCode}`;
    await this.paymentHService.createPaymentHistory(phDto, userId);

    orderExist.updatedBy = userId;
    await this.orderRepository.save(orderExist);

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
    const newOrder = await this.findOneOrderByCode(orderCode);
    return {
      order: newOrder,
    };
  }

  // order detail
  async createOrderDetail(
    dto: CreateOrderDetailDto,
    userId: string,
    order?: Order,
  ) {
    const queryRunnerOrderDetail =
      this.orderDetailRepository.manager.connection.createQueryRunner();
    await queryRunnerOrderDetail.connect();
    await queryRunnerOrderDetail.startTransaction();
    let orderExist: Order;
    try {
      // check permission
      const customer = await this.customerService.findOneById(userId);
      const admin = await this.adminService.findOneById(userId);

      if (!customer && !admin) {
        throw new UnauthorizedException('USER_NOT_FOUND');
      }
      if (
        (customer && customer.status === UserStatusEnum.INACTIVATE) ||
        (admin && !admin.isActive)
      ) {
        throw new BadRequestException('USER_NOT_ACTIVE');
      }

      const { note, orderId, seatId, seatCode, tripDetailCode } = dto;
      orderExist = order || (await this.findOneOrderById(orderId));
      if (!orderExist) {
        throw new BadRequestException('ORDER_NOT_FOUND');
      }
      switch (orderExist.status) {
        case OrderStatusEnum.CANCEL:
          throw new BadRequestException('ORDER_IS_CANCELLED');
          break;
        case OrderStatusEnum.PAID:
          throw new BadRequestException('ORDER_IS_PAID');
          break;
        default:
          break;
      }

      const orderDetail = new OrderDetail();
      orderDetail.note = note;
      orderDetail.order = orderExist;
      orderDetail.orderCode = orderExist.code;
      if (customer) {
        orderDetail.createdBy = customer.id;
      } else if (admin) {
        orderDetail.createdBy = admin.id;
      }
      // get ticket detail
      if (!seatId && !seatCode) {
        throw new BadRequestException('SEAT_ID_OR_SEAT_CODE_REQUIRED');
      }

      let seat: Seat;
      if (seatId) {
        seat = await this.seatService.findOneSeatById(seatId);
      } else if (seatCode) {
        seat = await this.seatService.findOneSeatByCode(seatCode);
      }
      if (!seat) {
        throw new NotFoundException('SEAT_NOT_FOUND');
      }

      const ticketDetail = await this.ticketService.findOneTicketDetail({
        where: {
          seat: { id: seat.id },
          ticket: {
            tripDetail: { code: tripDetailCode },
          },
        },
        relations: {
          seat: { vehicle: true },
          ticket: { tripDetail: { trip: true } },
        },
      });
      if (!ticketDetail) {
        throw new NotFoundException('TICKET_NOT_FOUND');
      }
      if (
        ticketDetail.status === TicketStatusEnum.SOLD ||
        ticketDetail.status === TicketStatusEnum.PENDING
      ) {
        throw new BadRequestException('SEAT_IS_SOLD');
      }
      const vehicle: Vehicle = ticketDetail.seat.vehicle;
      const trip = ticketDetail.ticket.tripDetail.trip;
      delete ticketDetail.seat;
      delete ticketDetail.ticket;

      orderDetail.ticketDetail = ticketDetail;
      // get price detail
      const ticketDetailId = ticketDetail.id;
      const currentDate = moment().startOf('day').toDate();

      const { dataResult } =
        await this.priceListService.findPriceDetailForBooking({
          seatType: vehicle.type,
          tripCode: trip.code,
          applyDate: currentDate,
          tripDetailCode: undefined,
        });
      if (!dataResult) {
        throw new NotFoundException('PRICE_DETAIL_NOT_FOUND');
      }
      const priceDetail: PriceDetail = dataResult;
      delete priceDetail.trip;
      delete priceDetail.priceList;
      if (!priceDetail) {
        throw new NotFoundException('PRICE_DETAIL_NOT_FOUND');
      }
      orderDetail.priceDetail = priceDetail;
      orderDetail.total = priceDetail.price;

      const createOrderDetail = await queryRunnerOrderDetail.manager.save(
        orderDetail,
      );
      if (!createOrderDetail) {
        throw new BadRequestException('CREATE_ORDER_DETAIL_FAILED');
      }

      // update ticket detail status
      const ticketDetailDto = new UpdateTicketDetailDto();
      ticketDetailDto.status = TicketStatusEnum.PENDING;
      const saveTicketDetail = await this.ticketService.updateTicketDetailById(
        ticketDetailId,
        ticketDetailDto,
        userId,
        queryRunnerOrderDetail.manager,
      );
      if (!saveTicketDetail) {
        throw new BadRequestException('UPDATE_TICKET_DETAIL_FAILED');
      }

      await queryRunnerOrderDetail.commitTransaction();

      delete createOrderDetail.deletedAt;
      delete createOrderDetail.order;
      delete createOrderDetail.priceDetail;
      delete createOrderDetail.ticketDetail;
      return createOrderDetail;
    } catch (error) {
      await queryRunnerOrderDetail.rollbackTransaction();
      if (orderExist) {
        await this.orderRepository.remove(orderExist);
      }
      if (error.message) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('INTERNAL_SERVER_ERROR');
      }
    } finally {
      await queryRunnerOrderDetail.release();
    }
  }

  // order refund
  async findOneOrderRefund(options?: any) {
    return await this.orderRefundRepository.findOne({
      where: { ...options?.where },
      relations: { order: true, ...options?.relations },
      select: { ...options?.select },
      order: { ...options?.order },
      ...options?.other,
    });
  }

  async findOneOrderRefundById(id: string, options?: any) {
    if (options) {
      options.where = { id, ...options?.where };
    } else {
      options = { where: { id } };
    }
    return await this.findOneOrderRefund(options);
  }

  async findOneOrderRefundByCode(code: string, options?: any) {
    if (options) {
      options.where = { code, ...options?.where };
    } else {
      options = { where: { code } };
    }
    return await this.findOneOrderRefund(options);
  }

  async getOrderRefundByCode(code: string, options?: any) {
    const orderRefund = await this.findOneOrderRefundByCode(code, options);
    if (!orderRefund) {
      throw new NotFoundException('ORDER_REFUND_NOT_FOUND');
    }
    return orderRefund;
  }

  async findAllOrderRefund(
    dto: FilterOrderRefundDto,
    userId: string,
    pagination?: Pagination,
  ) {
    const {
      keywords,
      status,
      startDate,
      endDate,
      minTotal,
      maxTotal,
      sort,
      customerCode,
      staffCode,
    } = dto;
    const admin = await this.adminService.findOneById(userId);
    const customer = await this.customerService.findOneById(userId);
    if (!userId) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    if (
      (customer && customer.status === UserStatusEnum.INACTIVATE) ||
      (admin && !admin.isActive)
    ) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }

    const query = this.orderRefundRepository.createQueryBuilder('q');

    if (keywords) {
      const subQuery = this.orderRefundRepository.createQueryBuilder('q1');
      subQuery
        .where('q1.code LIKE :code', { code: `%${keywords}%` })
        .orWhere('q1.note LIKE :note', { note: `%${keywords}%` })
        .orWhere('q1.orderCode LIKE :orderCode', {
          orderCode: `%${keywords}%`,
        })
        .select('q1.id');
      query.andWhere(`q.id IN (${subQuery.getQuery()})`, {
        code: `%${keywords}%`,
        note: `%${keywords}%`,
        orderCode: `%${keywords}%`,
      });
    }
    if (status) {
      query.andWhere('q.status = :status', { status });
    }
    if (startDate) {
      query.andWhere('q.createdAt >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('q.createdAt <= :endDate', { endDate });
    }
    if (minTotal) {
      query.andWhere('q.total >= :minTotal', { minTotal });
    }
    if (maxTotal) {
      query.andWhere('q.total <= :maxTotal', { maxTotal });
    }
    if (customer) {
      query.andWhere('q.customerCode = :customerCode', {
        customerCode: customer.code,
      });
    }
    if (!customer && customerCode) {
      query.andWhere('q.customerCode = :customerCode', { customerCode });
    }
    if (staffCode) {
      query.andWhere('q.staffCode = :staffCode', { staffCode });
    }
    query
      .orderBy('q.createdAt', sort || SortEnum.DESC)
      .addOrderBy('q.total', SortEnum.ASC)
      .addOrderBy('q.code', SortEnum.ASC);

    const dataResult = await query
      .leftJoinAndSelect('q.orderRefundDetails', 'ord')
      .leftJoinAndSelect('q.customer', 'c')
      .leftJoinAndSelect('q.staff', 's')
      .select(this.selectFieldsOrderRefundWithQ)
      .offset(pagination.skip || 0)
      .limit(pagination.take || 10)
      .getMany();

    const total = await query.getCount();

    return { dataResult, total, pagination };
  }

  async createOrderRefund(orderCode: string, userId: string) {
    const adminExist = await this.adminService.findOneById(userId);
    const customerExist = await this.customerService.findOneById(userId);
    if (!userId) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    if (
      (customerExist && customerExist.status === UserStatusEnum.INACTIVATE) ||
      (adminExist && !adminExist.isActive)
    ) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }

    const orderExist = await this.findOneOrderByCode(orderCode);
    if (!orderExist) {
      throw new BadRequestException('ORDER_NOT_FOUND');
    }

    switch (orderExist.status) {
      case OrderStatusEnum.CANCEL:
        throw new BadRequestException('ORDER_IS_CANCELLED');
        break;
      case OrderStatusEnum.UNPAID:
        throw new BadRequestException('ORDER_IS_UNPAID');
        break;
      case OrderStatusEnum.RETURNED:
        throw new BadRequestException('ORDER_IS_RETURNED');
        break;
      default:
        break;
    }
    const orderRefundExist = await this.findOneOrderRefundByCode(orderCode);
    if (orderRefundExist) {
      throw new BadRequestException('ORDER_IS_RETURNED', {
        description: `Đơn hàng đã được trả lại có mã là ${orderRefundExist.code}`,
      });
    }

    const orderRefund = new OrderRefund();
    orderRefund.order = orderExist;
    orderRefund.orderCode = orderExist.code;
    orderRefund.code = orderExist.code;
    orderRefund.total = orderExist.finalTotal;
    const customer = orderExist.customer;
    orderRefund.customerCode = customer.code;
    orderRefund.customer = customer;
    if (customerExist) {
      orderRefund.createdBy = customerExist.id;
    } else {
      orderRefund.staffCode = adminExist.code;
      orderRefund.staff = adminExist;
      orderRefund.createdBy = adminExist.id;
    }
    orderRefund.status = OrderRefundStatusEnum.PENDING;
    const promotionHistories = orderExist.promotionHistories;

    const createOrderRefund = await this.orderRefundRepository.save(
      orderRefund,
    );
    if (!createOrderRefund) {
      throw new BadRequestException('CREATE_ORDER_REFUND_FAILED');
    }
    const orderDetails = orderExist.orderDetails;

    const queryOrderRD =
      this.orderRDRepository.manager.connection.createQueryRunner();
    await queryOrderRD.connect();
    await queryOrderRD.startTransaction();

    const queryPromotionH =
      this.promotionHistoryRepository.manager.connection.createQueryRunner();
    await queryPromotionH.connect();
    await queryPromotionH.startTransaction();
    try {
      const orderRefundDetail = orderDetails.map(async (orderDetail) => {
        delete createOrderRefund.order;
        delete orderDetail.ticketDetail.seat.vehicle;
        delete orderDetail.ticketDetail.ticket;
        const orderRefundDetail = new OrderRefundDetail();
        orderRefundDetail.total = orderDetail.total;
        orderRefundDetail.orderRefundCode = createOrderRefund.code;
        orderRefundDetail.orderRefund = createOrderRefund;
        orderRefundDetail.ticketDetail = orderDetail.ticketDetail;
        orderRefundDetail.orderDetail = orderDetail;
        const createOrderRD = await queryOrderRD.manager.save(
          orderRefundDetail,
        );
        if (!createOrderRD) {
          throw new BadRequestException('CREATE_ORDER_REFUND_DETAIL_FAILED');
        }
        delete createOrderRD.orderRefund;
        return createOrderRD;
      });
      const createOrderRDs = await Promise.all(orderRefundDetail);
      orderRefund.orderRefundDetails = createOrderRDs;

      const savePromotionHistories = promotionHistories.map(
        async (promotionHistory) => {
          promotionHistory.orderRefund = createOrderRefund;
          const savePH = await queryPromotionH.manager.save(promotionHistory);
          delete savePH.orderRefund;
          return savePH;
        },
      );
      const createPHs = await Promise.all(savePromotionHistories);
      orderRefund.promotionHistories = createPHs;
      await queryPromotionH.commitTransaction();
      await queryOrderRD.commitTransaction();
    } catch (error) {
      await queryPromotionH.rollbackTransaction();
      await queryOrderRD.rollbackTransaction();
      if (createOrderRefund) {
        await this.orderRefundRepository.remove(createOrderRefund);
      }
      if (error?.message) {
        throw new BadRequestException(error?.message);
      } else {
        throw new BadRequestException('INTERNAL_SERVER_ERROR');
      }
    } finally {
      await queryOrderRD.release();
    }
    return createOrderRefund;
  }

  async updateOrderRefundByIdOrCode(
    dto: UpdateOrderRefundDto,
    userId: string,
    code?: string,
    id?: string,
  ) {
    const { note, status } = dto;
    if (!userId) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    const admin = await this.adminService.findOneById(userId);
    if (!admin.isActive) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }

    let orderRefund: OrderRefund;
    if (code) {
      orderRefund = await this.findOneOrderRefundByCode(code);
    } else if (id) {
      orderRefund = await this.findOneOrderRefundById(id);
    }
    if (!orderRefund) {
      throw new BadRequestException('ORDER_REFUND_NOT_FOUND');
    }
    if (note) {
      orderRefund.note = note;
    }
    if (status) {
      orderRefund.status = status;
    }
    orderRefund.updatedBy = admin.id;
    const updateOrderRefund = await this.orderRefundRepository.save(
      orderRefund,
    );
    if (!updateOrderRefund) {
      throw new BadRequestException('UPDATE_ORDER_REFUND_FAILED');
    }
    return updateOrderRefund;
  }
}
