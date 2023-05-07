import {
  OrderStatusEnum,
  PromotionHistoryTypeEnum,
  TicketStatusEnum,
} from '../../enums';
import {
  Customer,
  Order,
  OrderDetail,
  PromotionLine,
  Staff,
} from '../../database/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  RevenueStatisticsDto,
  StatisticsDto,
  TicketStatisticsDto,
  TopCustomerStatisticsDto,
} from './dto';
import * as moment from 'moment';
import { Pagination } from './../../decorator';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    @InjectRepository(PromotionLine)
    private readonly pLineRepository: Repository<PromotionLine>,
    private dataSource: DataSource,
  ) {}

  // tính tổng doanh thu
  async getTotalRevenueLastDays(dto: StatisticsDto): Promise<number> {
    // week, month
    const { type } = dto;
    let numOrDate = 1;
    if (type === 'week' || !type) {
      numOrDate = 7;
    } else if (type === 'month') {
      numOrDate = 30;
    }
    const { sum } = await this.orderRepository
      .createQueryBuilder('q')
      .select('SUM(q.finalTotal)', 'sum')
      .where(`q.createdAt >= DATE_SUB(NOW(), INTERVAL ${numOrDate} DAY)`)
      .andWhere('q.status = :status', { status: OrderStatusEnum.PAID })
      .getRawOne();

    return Number(sum);
  }

  // tính tổng hoá đơn
  async getTotalOrdersLastDays(dto: StatisticsDto): Promise<number> {
    // week, month
    const { type } = dto;
    let numOrDate = 1;
    if (type === 'week' || !type) {
      numOrDate = 7;
    } else if (type === 'month') {
      numOrDate = 30;
    }

    const { count } = await this.orderRepository
      .createQueryBuilder('q')
      .select('COUNT(q.id)', 'count')
      .where(`q.createdAt >= DATE_SUB(NOW(), INTERVAL ${numOrDate} DAY)`)
      .andWhere('q.status = :status', { status: OrderStatusEnum.PAID })
      .getRawOne();
    return Number(count);
  }

  // Tính tổng số vé bán ra
  async getTotalTicketsSoldLastDays(dto: StatisticsDto) {
    // week, month
    const { type } = dto;
    let numOrDate = 1;
    if (type === 'week' || !type) {
      numOrDate = 7;
    } else if (type === 'month') {
      numOrDate = 30;
    }

    const orderDetails = await this.orderDetailRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.ticketDetail', 'td')
      .leftJoinAndSelect('q.order', 'oo')
      .where(`q.createdAt >= DATE_SUB(NOW(), INTERVAL ${numOrDate} DAY)`)
      .andWhere('td.status = :soldStatus', {
        soldStatus: TicketStatusEnum.SOLD,
      })
      .getMany();

    return orderDetails.length;
  }

  // Tính tổng số khách hàng mua vé
  async getTotalCustomersLastDays(dto: StatisticsDto): Promise<number> {
    // week, month
    const { type } = dto;
    let numOrDate = 1;
    if (type === 'week' || !type) {
      numOrDate = 7;
    } else if (type === 'month') {
      numOrDate = 30;
    }

    const { count } = await this.orderRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.customer', 'c')
      .select('COUNT(DISTINCT c.id)', 'count')
      .where(`q.createdAt >= DATE_SUB(NOW(), INTERVAL ${numOrDate} DAY)`)
      .andWhere('q.status = :status', { status: OrderStatusEnum.PAID })
      .getRawOne();
    return Number(count);
  }

  //
  async getStatisticsLastDays(dto: StatisticsDto) {
    const [totalRevenue, totalOrders, totalTicketsSold, totalCustomers] =
      await Promise.all([
        this.getTotalRevenueLastDays(dto),
        this.getTotalOrdersLastDays(dto),
        this.getTotalTicketsSoldLastDays(dto),
        this.getTotalCustomersLastDays(dto),
      ]);
    return {
      totalRevenue,
      totalOrders,
      totalTicketsSold,
      totalCustomers,
    };
  }

  // tìm 5 khách hàng mua vé với số tiền nhiều nhất trong 7 or 30 ngày gần đây
  async getTopCustomersLastDays(dto: TopCustomerStatisticsDto) {
    // week, month
    const { type, limit } = dto;
    let startDate;
    const endDate = moment().endOf('day').toDate();
    if (type === 'week' || !type) {
      startDate = moment().subtract(7, 'days').startOf('day').toDate();
    } else if (type === 'month') {
      startDate = moment().subtract(30, 'days').startOf('day').toDate();
    }

    const topCustomersDto = new RevenueStatisticsDto();
    topCustomersDto.startDate = startDate;
    topCustomersDto.endDate = endDate;
    const topCustomers = await this.getRevenueCustomers(topCustomersDto, {
      take: limit || 5,
      skip: 0,
    });
    return topCustomers;
  }

  // tính doanh thu theo từng ngày trong 7 ngày gần đây
  async getRevenueByDayLastDays(dto: StatisticsDto) {
    // week, month
    const { type } = dto;
    let numOrDate = 1;
    if (type === 'week' || !type) {
      numOrDate = 7;
    } else if (type === 'month') {
      numOrDate = 30;
    }

    const revenueByDay = await this.orderRepository
      .createQueryBuilder('q')
      .select(['DATE(q.createdAt) as day', 'SUM(q.finalTotal) as total'])
      .where(`q.createdAt >= DATE_SUB(NOW(), INTERVAL ${numOrDate} DAY)`)
      .andWhere('q.status = :status', { status: OrderStatusEnum.PAID })
      .groupBy('day')
      .getRawMany();

    return revenueByDay;
  }

  // tính tổng số vé bán được theo tuyến trong khoảng thời gian a -> b
  async getTicketsSoldByRoute(
    dto: TicketStatisticsDto,
    pagination?: Pagination,
  ) {
    const { keyword, startDate, endDate } = dto;
    const newStartDate = startDate
      ? moment(startDate).startOf('day').toDate()
      : moment().subtract(7, 'days').startOf('day').toDate();
    const newEndDate = endDate
      ? moment(endDate).endOf('day').toDate()
      : moment().endOf('day').toDate();

    let newKeywords;
    let subQuery;
    if (keyword) {
      newKeywords = keyword.trim();
      subQuery = this.orderRepository
        .createQueryBuilder('q2')
        .innerJoin('q2.orderDetails', 'od2')
        .innerJoin('od2.ticketDetail', 'td2')
        .innerJoin('td2.ticket', 't2')
        .innerJoin('t2.tripDetail', 'trd2')
        .innerJoin('trd2.trip', 'tr2')
        .where('tr2.code LIKE :code', { code: `%${newKeywords}%` })
        .orWhere('tr2.name LIKE :name', { name: `%${newKeywords}%` })
        .orWhere('tr2.note LIKE :note', { note: `%${newKeywords}%` })
        .select('tr2.id')
        .getQuery();
    }

    const queryBuilder = await this.orderRepository
      .createQueryBuilder('q')
      .innerJoin('q.orderDetails', 'od')
      .innerJoin('od.ticketDetail', 'td')
      .innerJoin('td.ticket', 't')
      .innerJoin('t.tripDetail', 'trd')
      .innerJoin('trd.trip', 'tr')
      .innerJoin('tr.fromStation', 'fs')
      .innerJoin('tr.toStation', 'ts')
      .select([
        'tr.id as id',
        'tr.code as code',
        'tr.name as name',
        'tr.startDate as startDate',
        'tr.endDate as endDate',
        'tr.status as status',
        'COUNT(t.id) as totalTickets',
        'sum(q.total) as totalRevenue',
        'sum(q.finalTotal) as finalTotalRevenue',
        'sum(q.total - q.finalTotal) as totalDiscount',
        'fs.id as fromStationId',
        'fs.code as fromStationCode',
        'fs.name as fromStationName',
        'ts.id as toStationId',
        'ts.code as toStationCode',
        'ts.name as toStationName',
      ])
      .where('q.createdAt BETWEEN :startDate AND :endDate', {
        startDate: newStartDate,
        endDate: newEndDate,
      });
    if (keyword) {
      queryBuilder.andWhere('tr.id IN (' + subQuery + ')', {
        code: `%${newKeywords}%`,
        name: `%${newKeywords}%`,
        note: `%${newKeywords}%`,
      });
    }
    queryBuilder
      .andWhere('q.status = :status', { status: OrderStatusEnum.PAID })
      .andWhere('td.deletedAt IS NULL')
      .andWhere('t.deletedAt IS NULL')
      .andWhere('trd.deletedAt IS NULL')
      .groupBy('tr.id')
      .orderBy('totalTickets', 'DESC')
      .offset(pagination.skip || 0)
      .limit(pagination.take || 10);

    const result = await queryBuilder.getRawMany();
    return result.map((item) => ({
      id: item.id,
      code: item.code,
      name: item.name,
      startDate: item.startDate,
      endDate: item.endDate,
      status: item.status,
      totalTickets: parseInt(item.totalTickets),
      totalRevenue: parseFloat(item.totalRevenue),
      finalTotalRevenue: parseFloat(item.finalTotalRevenue),
      totalDiscount: parseFloat(item.totalDiscount),
      fromStation: {
        id: item['fromStationId'],
        code: item['fromStationCode'],
        name: item['fromStationName'],
      },
      toStation: {
        id: item['toStationId'],
        code: item['toStationCode'],
        name: item['toStationName'],
      },
    }));
  }

  // tính doanh thu theo khách hàng trong khoảng thời gian a -> b
  async getRevenueCustomers(
    dto: RevenueStatisticsDto,
    pagination?: Pagination,
  ) {
    // week, month
    const { keyword, startDate, endDate } = dto;
    const newStartDate = startDate
      ? moment(startDate).startOf('day').toDate()
      : moment().subtract(7, 'days').startOf('day').toDate();
    const newEndDate = endDate
      ? moment(endDate).endOf('day').toDate()
      : moment().endOf('day').toDate();

    let subQuery;
    let newKeywords;
    if (keyword) {
      newKeywords = keyword.trim();
      subQuery = this.customerRepository
        .createQueryBuilder('q2')
        .where('q2.fullName LIKE :fullName', { fullName: `%${newKeywords}%` })
        .orWhere('q2.email LIKE :email', { email: `%${newKeywords}%` })
        .orWhere('q2.phone LIKE :phone', { phone: `%${newKeywords}%` })
        .orWhere('q2.address LIKE :address', { address: `%${newKeywords}%` })
        .orWhere('q2.fullAddress LIKE :fullAddress', {
          fullAddress: `%${newKeywords}%`,
        })
        .select('q2.id')
        .getQuery();
    }

    const query = this.customerRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.orders', 'o')
      .leftJoinAndSelect('q.ward', 'w')
      .leftJoinAndSelect('q.customerGroup', 'cg')
      .where(`o.createdAt BETWEEN :startDate AND :endDate`, {
        startDate: newStartDate,
        endDate: newEndDate,
      })
      .andWhere('o.status = :status', { status: OrderStatusEnum.PAID });
    if (keyword) {
      query.andWhere(`q.id in (${subQuery})`, {
        fullName: `%${newKeywords}%`,
        email: `%${newKeywords}%`,
        phone: `%${newKeywords}%`,
        address: `%${newKeywords}%`,
        fullAddress: `%${newKeywords}%`,
      });
    }
    query
      .groupBy('q.id')
      .select([
        'q.id as customerId',
        'q.fullName as fullName',
        'q.phone as phone',
        'q.email as email',
        'q.gender as gender',
        'q.status as status',
        'w.code as wardCode',
        'cg.code as customerGroupCode',
        'cg.name as customerGroupName',
        'SUM(o.total) as total',
        'SUM(o.finalTotal) as finalTotal',
        'SUM(o.total - o.finalTotal) as totalDiscount',
        'COUNT(o.id) as numberOfOrders',
      ])
      .orderBy('total', 'DESC')
      .offset(pagination.skip || 0)
      .limit(pagination.take || 10);

    const dataResult = await query.getRawMany();

    // Lấy số lượng hoá đơn cho mỗi khách hàng trong 7 ngày gần đây
    const numberOfOrdersByCustomers = await this.customerRepository
      .createQueryBuilder('q2')
      .leftJoin('q2.orders', 'o2')
      .where(`o2.createdAt BETWEEN :startDate AND :endDate`, {
        startDate: newStartDate,
        endDate: newEndDate,
      })
      .andWhere('o2.status = :status', { status: OrderStatusEnum.PAID })
      .select(['q2.id as customerId', 'COUNT(o2.id) as numberOfOrders'])
      .groupBy('q2.id')
      .getRawMany();

    // Kết hợp kết quả của hai truy vấn và trả về kết quả cuối cùng
    const result = dataResult.map((customer) => {
      const numberOfOrders = numberOfOrdersByCustomers.find(
        (item) => item.customerId === customer.customerId,
      )?.numberOfOrders;
      return {
        ...customer,
        numberOfOrders: Number(numberOfOrders),
      };
    });

    return result;
  }

  // tính doanh thu theo nhân viên trong khoảng thời gian a -> b
  async getRevenueEmployees(
    dto: RevenueStatisticsDto,
    pagination?: Pagination,
  ) {
    // week, month
    const { keyword, startDate, endDate } = dto;
    const newStartDate = startDate
      ? moment(startDate).startOf('day').toDate()
      : moment().subtract(7, 'days').startOf('day').toDate();
    const newEndDate = endDate
      ? moment(endDate).endOf('day').toDate()
      : moment().endOf('day').toDate();

    let subQuery;
    let newKeywords;
    if (keyword) {
      newKeywords = keyword.trim();
      subQuery = this.staffRepository
        .createQueryBuilder('q2')
        .where('q2.code LIKE :code', { code: `%${newKeywords}%` })
        .orWhere('q2.fullName LIKE :fullName', { fullName: `%${newKeywords}%` })
        .orWhere('q2.email LIKE :email', { email: `%${newKeywords}%` })
        .orWhere('q2.phone LIKE :phone', { phone: `%${newKeywords}%` })
        .orWhere('q2.address LIKE :address', { address: `%${newKeywords}%` })
        .select('q2.id')
        .getQuery();
    }

    const query = this.staffRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.orders', 'o')
      .where(`o.createdAt BETWEEN :startDate AND :endDate`, {
        startDate: newStartDate,
        endDate: newEndDate,
      })
      .andWhere('o.status = :status', { status: OrderStatusEnum.PAID });
    if (keyword) {
      query.andWhere(`q.id in (${subQuery})`, {
        code: `%${newKeywords}%`,
        fullName: `%${newKeywords}%`,
        email: `%${newKeywords}%`,
        phone: `%${newKeywords}%`,
        address: `%${newKeywords}%`,
      });
    }
    query
      .select([
        'q.id as staffId',
        'q.fullName as fullName',
        'q.code as code',
        'q.email as email',
        'q.phone as phone',
        'SUM(o.total) as total',
        'SUM(o.finalTotal) as finalTotal',
        'SUM(o.total - o.finalTotal) as totalDiscount',
        'COUNT(o.id) as numberOfOrders',
      ])
      .groupBy('q.id')
      .orderBy('total', 'DESC')
      .offset(pagination.skip || 0)
      .limit(pagination.take || 10);

    const dataResult = await query.getRawMany();

    // Lấy số lượng hoá đơn cho mỗi khách hàng trong 7 ngày gần đây
    const numberOfOrdersByCustomers = await this.staffRepository
      .createQueryBuilder('q2')
      .leftJoin('q2.orders', 'o2')
      .where(`o2.createdAt BETWEEN :startDate AND :endDate`, {
        startDate: newStartDate,
        endDate: newEndDate,
      })
      .andWhere('o2.status = :status', { status: OrderStatusEnum.PAID })
      .select(['q2.id as staffId', 'COUNT(o2.id) as numberOfOrders'])
      .groupBy('q2.id')
      .getRawMany();

    // Kết hợp kết quả của hai truy vấn và trả về kết quả cuối cùng
    const result = dataResult.map((customer) => {
      const numberOfOrders = numberOfOrdersByCustomers.find(
        (item) => item.staffId === customer.staffId,
      )?.numberOfOrders;
      return {
        ...customer,
        numberOfOrders: Number(numberOfOrders),
      };
    });

    return result;
  }

  // Lấy danh sách khuyến mãi đã áp dụng trong khoảng thời gian a -> b
  async getStatisticsPromotionLines(
    dto: RevenueStatisticsDto,
    pagination?: Pagination,
  ) {
    const { startDate, endDate, keyword } = dto;
    const newStartDate = startDate
      ? moment(startDate).startOf('day').toDate()
      : moment().subtract(7, 'days').startOf('day').toDate();
    const newEndDate = endDate
      ? moment(endDate).endOf('day').toDate()
      : moment().endOf('day').toDate();

    let subQuery;
    let newKeywords;
    const query = this.orderRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.promotionHistories', 'ph')
      .leftJoinAndSelect('ph.promotionLine', 'pl')
      .leftJoinAndSelect('pl.promotionDetail', 'pd')
      .where(`q.createdAt BETWEEN :startDate AND :endDate`, {
        startDate: newStartDate,
        endDate: newEndDate,
      })
      .andWhere('q.status = :status', { status: OrderStatusEnum.PAID })
      .andWhere('ph.quantity > 0')
      .andWhere('ph.type not in (:type)', {
        type: [
          PromotionHistoryTypeEnum.CANCEL,
          PromotionHistoryTypeEnum.REFUND,
        ],
      });
    if (keyword) {
      newKeywords = keyword.trim();
      subQuery = this.pLineRepository
        .createQueryBuilder('q2')
        .where('q2.code LIKE :code', { code: `%${newKeywords}%` })
        .select('q2.id')
        .getQuery();
      query.andWhere(`pl.id in (${subQuery})`, { code: `%${newKeywords}%` });
    }
    query
      .select([
        'pl.id as promotionLineId',
        'pl.code as code',
        'pl.couponCode as couponCode',
        'pl.title as title',
        'pl.description as description',
        'pl.startDate as startDate',
        'pl.endDate as endDate',
        'pl.type as type',
        'pl.applyAll as applyAll',
        'pl.useQuantity as useQuantity',
        'pl.maxQuantity as maxQuantity',
        'SUM(ph.quantity) as totalUseQuantityInTime',
        'pl.useBudget as useBudget',
        'pl.maxBudget as maxBudget',
        'SUM(ph.amount) * (-1) as totalUseBudgetInTime',
        // promotionDetail
        'pd.id as promotionDetail_id',
        'pd.quantityBuy as promotionDetail_quantityBuy',
        'pd.purchaseAmount as promotionDetail_purchaseAmount',
        'pd.reductionAmount as promotionDetail_reductionAmount',
        'pd.percentDiscount as promotionDetail_percentDiscount',
        'pd.maxReductionAmount as promotionDetail_maxReductionAmount',
      ])
      .groupBy('pl.id')
      .orderBy('pl.id', 'DESC')
      .offset(pagination.skip || 0)
      .limit(pagination.take || 10);

    const dataResult = await query.getRawMany();
    const result = dataResult.map((item) => {
      // convert filed first word = promotionDetail_<item> => promotionDetail.item
      const newObject = {};
      Object.keys(item).forEach((key) => {
        if (key.includes('promotionDetail_')) {
          const newKey = key.replace('promotionDetail_', '');
          newObject[newKey] = item[key];
          delete item[key];
        }
      });
      return {
        ...item,
        totalUseQuantity: Number(item.totalUseQuantity),
        promotionDetail: { ...newObject },
      };
    });

    return result;
  }
}
