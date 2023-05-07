import { Pagination } from './../../decorator';
import { SortEnum, TicketStatusEnum, UserStatusEnum } from './../../enums';
import {
  CreateTicketDto,
  FilterTicketDto,
  UpdateTicketDto,
  FilterTicketDetailDto,
  UpdateTicketDetailDto,
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Customer,
  Staff,
  Ticket,
  TicketDetail,
  TripDetail,
} from './../../database/entities';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { SeatService } from '../seat/seat.service';
import * as moment from 'moment';
// moment.locale('vi');

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(TicketDetail)
    private readonly ticketDetailRepository: Repository<TicketDetail>,
    private readonly seatService: SeatService,
    private dataSource: DataSource,
  ) {}

  private selectTicketFieldsWithQ = [
    'q.id',
    'q.code',
    'q.note',
    'q.startDate',
    'q.endDate',
    'q.tripDetailCode',
    'q.createdBy',
    'q.updatedBy',
    'q.createdAt',
    'q.updatedAt',
    't.id',
    't.code',
    's.id',
    's.code',
    's.name',
    's.floor',
  ];

  private selectTicketDetailFieldsWithQ = [
    'q.id',
    'q.code',
    'q.status',
    'q.note',
    'q.createdAt',
    'q.updatedAt',
    't.id',
    't.code',
    's.id',
    's.code',
    's.name',
    's.floor',
  ];

  // other
  private async getTripDetailById(id: string) {
    return await this.dataSource.getRepository(TripDetail).findOne({
      where: { id },
      relations: {
        vehicle: { seats: true },
      },
      select: {
        deletedAt: false,
        vehicle: {
          id: true,
          name: true,
          description: true,
          type: true,
          licensePlate: true,
          floorNumber: true,
          totalSeat: true,
        },
      },
    });
  }

  // ticket service
  async findOneTicket(options: any) {
    return await this.ticketRepository.findOne({
      where: { ...options?.where },
      relations: { ticketDetails: { seat: true }, ...options?.relations },
      select: {
        deletedAt: false,
        ...options?.select,
      },
      orderBy: {
        createdAt: SortEnum.DESC,
        ...options?.orderBy,
      },
      ...options,
    });
  }

  async findOneTicketByCode(code: string, options?: any) {
    if (options) {
      options.where = { code, ...options?.where };
    } else {
      options = { where: { code } };
    }
    return await this.findOneTicket(options);
  }

  async findOneTicketById(id: string, options?: any) {
    if (options) {
      options.where = { id, ...options?.where };
    } else {
      options = { where: { id } };
    }
    return await this.findOneTicket(options);
  }

  async createTicket(dto: CreateTicketDto, adminId: string) {
    const adminExist = await this.dataSource
      .getRepository(Staff)
      .findOne({ where: { id: adminId } });
    if (!adminExist) {
      throw new UnauthorizedException('USER_NOT_FOUND');
    }
    if (!adminExist.isActive) {
      throw new UnauthorizedException('USER_NOT_ACTIVE');
    }

    const { code, note, startDate, endDate, tripDetailId } = dto;

    const ticketExist = await this.findOneTicketByCode(code);
    if (ticketExist) {
      throw new BadRequestException('TICKET_CODE_EXISTED');
    }

    const ticket = new Ticket();
    ticket.code = code;
    ticket.note = note;

    // const currentDate = moment().toDate();

    if (!startDate) {
      throw new BadRequestException('TICKET_START_DATE_IS_REQUIRED');
    }
    // if (startDate <= currentDate) {
    //   throw new BadRequestException(
    //     'TICKET_START_DATE_GREATER_THAN_CURRENT_DATE',
    //   );
    // }
    ticket.startDate = startDate;
    if (!endDate) {
      throw new BadRequestException('TICKET_END_DATE_IS_REQUIRED');
    }
    if (endDate <= startDate) {
      throw new BadRequestException(
        'TICKET_END_DATE_GREATER_THAN_TICKET_START_DATE',
      );
    }
    ticket.endDate = endDate;
    const tripDetail = await this.getTripDetailById(tripDetailId);
    if (!tripDetail) {
      throw new NotFoundException('TRIP_DETAIL_NOT_FOUND');
    }
    const seats = tripDetail?.vehicle?.seats;
    ticket.tripDetail = tripDetail;
    ticket.tripDetailCode = tripDetail.code;
    ticket.createdBy = adminExist.id;
    const saveTicket = await this.ticketRepository.save(ticket);
    delete saveTicket.deletedAt;
    delete saveTicket.tripDetail;

    if (seats && seats.length > 0) {
      for (const seat of seats) {
        await this.createTicketDetail(saveTicket.id, seat.id, adminId);
      }
    }

    return saveTicket;
  }

  async getTicketById(id: string, options?: any) {
    const ticket = await this.findOneTicketById(id, options);
    if (!ticket) {
      throw new BadRequestException('TICKET_NOT_FOUND');
    }
    return ticket;
  }

  async getTicketByCode(code: string, options?: any) {
    const ticket = await this.findOneTicketByCode(code, options);
    if (!ticket) {
      throw new BadRequestException('TICKET_NOT_FOUND');
    }
    return ticket;
  }

  async findAllTicket(dto: FilterTicketDto, pagination?: Pagination) {
    const { keywords, sort } = dto;
    let { startDate, endDate } = dto;

    const query = this.ticketRepository.createQueryBuilder('q');
    if (keywords) {
      const newKeywords = keywords.trim();
      const subQuery = this.ticketRepository
        .createQueryBuilder('q2')
        .where('q2.code LIKE :code', { code: `%${newKeywords}%` })
        .orWhere('q2.note LIKE :note', { note: `%${newKeywords}%` })
        .select('q2.id');
      query.andWhere('q.id IN (' + subQuery.getQuery() + ')', {
        code: `%${newKeywords}%`,
        note: `%${newKeywords}%`,
      });
    }
    if (startDate) {
      startDate = new Date(startDate);
      query.andWhere('q.startDate >= :startDate', { startDate });
    }
    if (endDate) {
      endDate = new Date(endDate);
      query.andWhere('q.endDate <= :endDate', { endDate });
    }
    query.orderBy('q.createdAt', sort || SortEnum.DESC);

    const total = await query.getCount();
    const dataResult = await query
      .leftJoinAndSelect('q.ticketDetails', 't')
      .leftJoinAndSelect('t.seat', 's')
      .select(this.selectTicketFieldsWithQ)
      .offset(pagination.skip)
      .limit(pagination.take)
      .getMany();

    return { dataResult, pagination, total };
  }

  async updateTicketByIdOrCode(
    dto: UpdateTicketDto,
    adminId: string,
    id?: string,
    code?: string,
  ) {
    if (!id && !code) {
      throw new BadRequestException('ID_OR_CODE_IS_REQUIRED');
    }
    let ticket: Ticket;
    if (id) {
      ticket = await this.getTicketById(id);
    } else if (code) {
      ticket = await this.getTicketByCode(code);
    }
    const { note, startDate, endDate, tripDetailId } = dto;
    if (note) {
      ticket.note = note;
    }
    if (tripDetailId) {
      const tripDetail = await this.getTripDetailById(tripDetailId);
      if (!tripDetail) {
        throw new NotFoundException('TRIP_DETAIL_NOT_FOUND');
      }
      ticket.tripDetailCode = tripDetail.code;
      ticket.tripDetail = tripDetail;
    }
    const currentDate = moment().toDate();
    if (startDate) {
      if (startDate <= currentDate) {
        throw new BadRequestException(
          'TICKET_START_DATE_GREATER_THAN_CURRENT_DATE',
        );
      }
      ticket.startDate = startDate;
    }
    if (endDate) {
      if (endDate <= startDate) {
        throw new BadRequestException(
          'TICKET_END_DATE_GREATER_THAN_TICKET_START_DATE',
        );
      }
      ticket.endDate = endDate;
    }
    const adminExist = await this.dataSource
      .getRepository(Staff)
      .findOne({ where: { id: adminId } });
    if (!adminExist) {
      throw new UnauthorizedException('USER_NOT_FOUND');
    }
    if (!adminExist.isActive) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }
    ticket.updatedBy = adminExist.id;
    const saveTicket = await this.ticketRepository.save(ticket);
    delete saveTicket.deletedAt;
    return saveTicket;
  }

  // ticket detail service
  async findOneTicketDetail(options: any) {
    return await this.ticketDetailRepository.findOne({
      where: { ...options?.where },
      relations: {
        ticket: true,
        seat: true,
        ...options?.relations,
      },
      select: {
        deletedAt: false,
        ...options?.select,
      },
      orderBy: {
        createdAt: SortEnum.DESC,
        ...options?.orderBy,
      },
      ...options,
    });
  }

  async findOneTicketDetailByCode(code: string, options?: any) {
    if (options) {
      options.where = { code, ...options?.where };
    } else {
      options = { where: { code } };
    }
    return await this.findOneTicketDetail(options);
  }

  async findOneTicketDetailById(id: string, options?: any) {
    if (options) {
      options.where = { id, ...options?.where };
    } else {
      options = { where: { id } };
    }
    return await this.findOneTicketDetail(options);
  }

  async getTicketDetailById(id: string, options?: any) {
    const ticketDetail = await this.findOneTicketDetailById(id, options);
    if (!ticketDetail) {
      throw new BadRequestException('TICKET_DETAIL_NOT_FOUND');
    }
    return ticketDetail;
  }

  async getTicketDetailByCode(code: string, options?: any) {
    const ticketDetail = await this.findOneTicketDetailByCode(code, options);
    if (!ticketDetail) {
      throw new BadRequestException('TICKET_DETAIL_NOT_FOUND');
    }
    return ticketDetail;
  }

  async getTicketDetailStatus() {
    return {
      dataResult: Object.keys(TicketStatusEnum).map(
        (key) => TicketStatusEnum[key],
      ),
    };
  }

  async findAllTicketDetail(
    dto: FilterTicketDetailDto,
    pagination?: Pagination,
  ) {
    const { keywords, status, sort, ticketCode, tripDetailCode } = dto;

    const query = this.ticketDetailRepository.createQueryBuilder('q');
    if (keywords) {
      const newKeywords = keywords.trim();
      const subQuery = this.ticketDetailRepository
        .createQueryBuilder('q2')
        .where('q2.code LIKE :code', { code: `%${newKeywords}%` })
        .orWhere('q2.note LIKE :note', { note: `%${newKeywords}%` })
        .select('q2.id')
        .getQuery();

      query.andWhere(`q.id in (${subQuery})`, {
        code: `%${newKeywords}%`,
        note: `%${newKeywords}%`,
      });
    }
    if (status) {
      query.andWhere('q.status = :status', { status: status });
    }
    query.leftJoinAndSelect('q.ticket', 't');
    if (ticketCode) {
      query.andWhere('t.code = :ticketCode', { ticketCode });
    }
    if (tripDetailCode) {
      query.andWhere('t.tripDetailCode = :tripDetailCode', { tripDetailCode });
    }
    query
      .orderBy('q.createdAt', sort || SortEnum.DESC)
      .addOrderBy('q.code', SortEnum.DESC);

    const dataResult = await query
      .leftJoinAndSelect('q.seat', 's')
      .select(this.selectTicketDetailFieldsWithQ)
      .offset(pagination.skip)
      .limit(pagination.take)
      .getMany();

    const total = await query.getCount();

    return { dataResult, pagination, total };
  }

  async createTicketDetail(ticketId: string, seatId: string, adminId: string) {
    const adminExist = await this.dataSource
      .getRepository(Staff)
      .findOne({ where: { id: adminId } });
    if (!adminExist) {
      throw new UnauthorizedException('USER_NOT_FOUND');
    }
    if (!adminExist.isActive) {
      throw new UnauthorizedException('USER_NOT_ACTIVE');
    }
    const ticketExist = await this.getTicketById(ticketId);
    const seatExist = await this.seatService.getSeatById(seatId);

    const ticketDetail = new TicketDetail();
    ticketDetail.ticket = ticketExist;
    ticketDetail.seat = seatExist;
    ticketDetail.note = '';
    ticketDetail.status = TicketStatusEnum.NON_SOLD;
    ticketDetail.code = `${ticketExist.code}-${seatExist.name}`;
    const saveTicketDetail = await this.ticketDetailRepository.save(
      ticketDetail,
    );
    delete saveTicketDetail.deletedAt;
    return saveTicketDetail;
  }

  async updateTicketDetailById(
    id: string,
    dto: UpdateTicketDetailDto,
    userId: string,
    manager?: EntityManager,
  ) {
    const { note, status } = dto;
    const ticketDetail = await this.getTicketDetailById(id);

    if (note) {
      ticketDetail.note = note;
    }
    switch (status) {
      case TicketStatusEnum.NON_SOLD:
      case TicketStatusEnum.PENDING:
      case TicketStatusEnum.SOLD:
        ticketDetail.status = status;
        break;
      default:
        break;
    }

    const admin = await this.dataSource
      .getRepository(Staff)
      .findOne({ where: { id: userId } });
    const customer = await this.dataSource
      .getRepository(Customer)
      .findOne({ where: { id: userId } });
    if (!admin && !customer) {
      throw new UnauthorizedException('USER_NOT_FOUND');
    }
    if (
      (customer && customer.status === UserStatusEnum.INACTIVATE) ||
      (admin && !admin.isActive)
    ) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }

    let saveTicketDetail: TicketDetail;
    if (manager) {
      try {
        saveTicketDetail = await manager.save(ticketDetail);
      } catch (error) {
        // rollbackTransaction
        await manager.query('ROLLBACK');
        throw new BadRequestException('UPDATE_TICKET_DETAIL_FAIL');
      }
    } else {
      saveTicketDetail = await this.ticketDetailRepository.save(ticketDetail);
    }
    return saveTicketDetail;
  }
}
