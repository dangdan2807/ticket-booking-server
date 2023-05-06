import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff, Trip, TripDetail, Vehicle } from './../../database/entities';
import {
  DataSource,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import {
  CreateTripDetailDto,
  TripDetailDeleteMultiInput,
  UpdateTripDetailDto,
  FilterTripDetailDto,
  BusScheduleDto,
} from './dto';
import {
  DeleteDtoTypeEnum,
  SortEnum,
  TripDetailStatusEnum,
} from './../../enums';
import { Pagination } from './../../decorator';
import { TicketService } from '../ticket/ticket.service';
import moment from 'moment';

@Injectable()
export class TripDetailService {
  constructor(
    @InjectRepository(TripDetail)
    private readonly tripDetailRepository: Repository<TripDetail>,
    private readonly ticketService: TicketService,
    private dataSource: DataSource,
  ) {}

  // validate trip detail
  private async validateTripDetailExistTime(date: Date, vehicleId: string) {
    const tripDetailExist = await this.dataSource
      .getRepository(TripDetail)
      .findOne({
        where: {
          departureTime: LessThanOrEqual(date),
          expectedTime: MoreThanOrEqual(date),
          vehicle: {
            id: vehicleId,
          },
        },
      });
    if (tripDetailExist) {
      const tripDetailCodeErr = tripDetailExist.code;
      throw new BadRequestException(
        `VEHICLE_HAS_BEEN_USED_IN_OTHER_TRIP_DETAIL`,
        {
          description: `Xe này đã được sử dụng trong chuyến khác có mã ${tripDetailCodeErr}`,
        },
      );
    }
  }

  private tripDetailSelect = [
    'q',
    // 'v.id',
    // 'v.code',
    // 'v.name',
    // 'v.description',
    // 'v.type',
    // 'v.licensePlate',
    // 'v.floorNumber',
    // 'v.totalSeat',
    // 't.id',
    // 'fs',
    // 'ts',
    // 'i.id',
    // 'i.url',
  ];

  async findOneTripDetail(options: any) {
    return await this.tripDetailRepository.findOne({
      where: { ...options?.where },
      relations: {
        vehicle: { images: true },
        trip: {
          fromStation: true,
          toStation: true,
        },
        ...options?.relations,
      },
      select: {
        deletedAt: false,
        vehicle: {
          id: true,
          code: true,
          name: true,
          description: true,
          type: true,
          licensePlate: true,
          floorNumber: true,
          totalSeat: true,
          images: {
            id: true,
            url: true,
          },
        },
        trip: {
          id: true,
          code: true,
          name: true,
          note: true,
          startDate: true,
          endDate: true,
          status: true,
          fromStation: {
            id: true,
            code: true,
            name: true,
            address: true,
            fullAddress: true,
          },
          toStation: {
            id: true,
            code: true,
            name: true,
            address: true,
            fullAddress: true,
          },
        },
        ...options?.select,
      },
      ...options.other,
    });
  }

  async findTripDetailById(id: string, options?: any) {
    if (options) {
      options.where = { id, ...options?.where };
    } else {
      options = { where: { id } };
    }
    return await this.findOneTripDetail(options);
  }

  async findTripDetailByCode(code: string, options?: any) {
    if (options) {
      options.where = { code, ...options?.where };
    } else {
      options = { where: { code } };
    }
    return await this.findOneTripDetail(options);
  }

  async getTripDetailById(id: string, options?: any) {
    const tripDetail = await this.findTripDetailById(id, options);
    if (!tripDetail) {
      throw new NotFoundException('TRIP_DETAIL_NOT_FOUND');
    }
    return tripDetail;
  }

  async getTripDetailByCode(code: string, options?: any) {
    const tripDetail = await this.findTripDetailByCode(code, options);
    if (!tripDetail) {
      throw new NotFoundException('TRIP_DETAIL_NOT_FOUND');
    }
    return tripDetail;
  }

  async findAllTripDetail(dto: FilterTripDetailDto, pagination?: Pagination) {
    const {
      minDepartureTime,
      departureTime,
      maxDepartureTime,
      status,
      tripId,
      tripCode,
      fromProvinceCode,
      toProvinceCode,
      sort,
    } = dto;
    const query = this.tripDetailRepository.createQueryBuilder('q');

    if (minDepartureTime) {
      query.andWhere('q.departureTime > :minDepartureTime', {
        minDepartureTime,
      });
    }

    if (departureTime) {
      // // Lấy ngày bắt đầu của departureTime
      // const startOfDay = new Date(
      //   departureTime.getFullYear(),
      //   departureTime.getMonth(),
      //   departureTime.getDate(),
      // );

      // // Lấy ngày kết thúc của departureTime
      // const endOfDay = new Date(
      //   departureTime.getFullYear(),
      //   departureTime.getMonth(),
      //   departureTime.getDate() + 1,
      //   0,
      //   0,
      //   0,
      //   -1,
      // );

      // const minTime = startOfDay;
      // const maxTime = endOfDay;
      const minTime = moment(departureTime).startOf('day').toDate();
      const maxTime = moment(departureTime).endOf('day').toDate();
      query
        .andWhere('q.departureTime >= :minTime', { minTime })
        .andWhere('q.departureTime <= :maxTime', { maxTime });
    }

    if (maxDepartureTime) {
      query.andWhere('q.departureTime <= :maxDepartureTime', {
        maxDepartureTime,
      });
    }

    switch (status) {
      case TripDetailStatusEnum.NOT_SOLD_OUT:
      case TripDetailStatusEnum.SOLD_OUT:
        query.andWhere('q.status = :status', { status });
        break;
      default:
        break;
    }
    if (tripId) {
      query.andWhere('t.id = :tripId', { tripId: tripId });
    } else if (tripCode) {
      query.andWhere('t.code = :tripCode', { tripCode: tripCode });
    }
    if (fromProvinceCode) {
      query
        .leftJoinAndSelect('q.fromProvince', 'fp')
        .andWhere('fp.code = :fromProvinceCode', {
          fromProvinceCode,
        });
    }
    if (toProvinceCode) {
      query
        .leftJoinAndSelect('q.toProvince', 'tp')
        .andWhere('tp.code = :toProvinceCode', { toProvinceCode });
    }

    const dataResult = await query
      .leftJoinAndSelect('q.trip', 't')
      // .leftJoinAndSelect('t.fromStation', 'fs')
      // .leftJoinAndSelect('t.toStation', 'ts')
      // .leftJoinAndSelect('q.vehicle', 'v')
      // .leftJoinAndSelect('v.images', 'i')
      .select(this.tripDetailSelect)
      .orderBy('q.departureTime', sort || SortEnum.ASC)
      .addOrderBy('q.createdAt', SortEnum.ASC)
      .addOrderBy('q.code', SortEnum.ASC)
      .offset(pagination.skip || 0)
      .limit(pagination.take || 10)
      .getMany();
    const total = await query.getCount();

    return { dataResult, pagination, total };
  }

  async createTripDetail(dto: CreateTripDetailDto, userId: string) {
    const {
      code,
      departureTime,
      expectedTime,
      status,
      tripId,
      tripCode,
      vehicleId,
      vehicleCode,
    } = dto;

    // check trip detail code is exist
    const tripDetailCodeExist = await this.findTripDetailByCode(code);
    if (tripDetailCodeExist) {
      throw new BadRequestException('TRIP_DETAIL_CODE_EXIST');
    }

    // create new trip details and validate
    const tripDetail = new TripDetail();
    tripDetail.code = code;
    let trip: Trip;
    const relations = {
      fromStation: { ward: { district: { province: true } } },
      toStation: { ward: { district: { province: true } } },
    };
    // check trip is exist and ref from province, to province
    if (!tripId && !tripCode) {
      throw new NotFoundException('TRIP_ID_OR_CODE_REQUIRED');
    }
    if (tripId) {
      trip = await this.dataSource.getRepository(Trip).findOne({
        where: { id: tripId },
        relations,
      });
    } else {
      trip = await this.dataSource.getRepository(Trip).findOne({
        where: { code: tripCode },
        relations,
      });
    }
    if (!trip) {
      throw new BadRequestException('TRIP_NOT_FOUND');
    }
    const fromProvince = trip.fromStation.ward.district.province;
    const toProvince = trip.toStation.ward.district.province;
    tripDetail.trip = trip;
    tripDetail.fromProvince = fromProvince;
    tripDetail.toProvince = toProvince;

    const currentDate = new Date(moment().format('YYYY-MM-DD HH:mm'));
    if (trip.endDate < currentDate) {
      throw new BadRequestException('TRIP_HAS_ENDED');
    }

    // valid departure time
    if (!departureTime) {
      throw new BadRequestException('DEPARTURE_TIME_REQUIRED');
    }
    const tomorrowDate = new Date(moment().add(1, 'days').format('YYYY-MM-DD'));
    if (departureTime < tomorrowDate) {
      throw new BadRequestException(
        'DEPARTURE_DATE_GREATER_THAN_OR_EQUAL_TO_TOMORROW',
      );
    }
    if (departureTime < trip.startDate) {
      throw new BadRequestException(
        'DEPARTURE_DATE_GREATER_THAN_OR_EQUAL_TO_TRIP_START_DATE',
      );
    }
    if (departureTime > trip.endDate) {
      throw new BadRequestException(
        'DEPARTURE_DATE_LESS_THAN_OR_EQUAL_TO_TRIP_END_DATE',
      );
    }
    tripDetail.departureTime = departureTime;

    if (!expectedTime) {
      throw new BadRequestException('EXPECTED_TIME_REQUIRED');
    }
    const expectedDate = new Date(
      moment(departureTime).add(2, 'hours').format('YYYY-MM-DD HH:mm'),
    );
    if (expectedTime < expectedDate) {
      throw new BadRequestException(
        'EXPECTED_DATE_GREATER_THAN_OR_EQUAL_TO_DEPARTURE_DATE_PLUS_2_HOURS',
      );
    }
    if (expectedTime < trip.startDate) {
      throw new BadRequestException(
        'EXPECTED_DATE_GREATER_THAN_OR_EQUAL_TO_TRIP_START_DATE',
      );
    }
    tripDetail.expectedTime = expectedTime;

    // check status
    switch (status) {
      case TripDetailStatusEnum.SOLD_OUT:
        tripDetail.status = status;
        break;
      default:
        tripDetail.status = TripDetailStatusEnum.NOT_SOLD_OUT;
        break;
    }
    // check vehicle
    if (!vehicleId && !vehicleCode) {
      throw new NotFoundException('ID_OR_CODE_REQUIRED');
    }
    let vehicle: Vehicle;
    if (vehicleId) {
      vehicle = await this.dataSource
        .getRepository(Vehicle)
        .findOne({ where: { id: vehicleId } });
    } else if (vehicleCode) {
      vehicle = await this.dataSource
        .getRepository(Vehicle)
        .findOne({ where: { code: vehicleCode } });
    }
    if (!vehicle) {
      throw new BadRequestException('VEHICLE_NOT_FOUND');
    }
    await this.validateTripDetailExistTime(departureTime, vehicle.id);
    await this.validateTripDetailExistTime(expectedTime, vehicle.id);

    tripDetail.vehicle = vehicle;
    const adminExist = await this.dataSource
      .getRepository(Staff)
      .findOne({ where: { id: userId } });
    if (!adminExist) {
      throw new UnauthorizedException('USER_NOT_FOUND');
    }
    if (!adminExist.isActive) {
      throw new UnauthorizedException('USER_NOT_ACTIVE');
    }
    tripDetail.createdBy = adminExist.id;

    const saveTripDetail = await this.tripDetailRepository.save(tripDetail);
    // create ticket
    await this.ticketService.createTicket(
      {
        code: saveTripDetail.code,
        note: '',
        startDate: new Date(),
        endDate: departureTime,
        tripDetailId: saveTripDetail.id,
      },
      adminExist.id,
    );

    return {
      id: saveTripDetail.id,
      code: saveTripDetail.code,
      departureTime: saveTripDetail.departureTime,
      expectedTime: saveTripDetail.expectedTime,
      status: saveTripDetail.status,
      createdBy: saveTripDetail.createdBy,
      updatedBy: saveTripDetail.updatedBy,
      createdAt: saveTripDetail.createdAt,
      updatedAt: saveTripDetail.updatedAt,
      trip: {
        id: trip.id,
        code: trip.code,
      },
      vehicle: {
        id: vehicle.id,
        code: vehicle.code,
      },
    };
  }

  async updateTripDetailByIdOrCode(
    dto: UpdateTripDetailDto,
    userId: string,
    id?: string,
    code?: string,
  ) {
    const { status, vehicleId, departureTime, expectedTime, vehicleCode } = dto;

    let tripDetail: TripDetail;
    if (!id && !code) {
      throw new BadRequestException('ID_OR_CODE_REQUIRED');
    }
    if (id) {
      tripDetail = await this.findTripDetailById(id, {
        relations: { trip: true },
      });
    } else {
      tripDetail = await this.findTripDetailByCode(code, {
        relations: { trip: true },
      });
    }
    if (!tripDetail) {
      throw new NotFoundException('TRIP_DETAIL_NOT_FOUND');
    }

    const trip: Trip = tripDetail.trip;
    const currentDate = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    if (trip.endDate < currentDate) {
      throw new BadRequestException('TRIP_HAS_ENDED_NOT_UPDATE');
    }
    if (tripDetail.departureTime < currentDate) {
      throw new BadRequestException('TRIP_DETAIL_HAS_ENDED_NOT_UPDATE');
    }

    const currentDatePlus15M = new Date(
      moment().add(15, 'minutes').format('YYYY-MM-DD HH:mm'),
    );
    if (departureTime) {
      if (departureTime < currentDatePlus15M) {
        throw new BadRequestException(
          'DEPARTURE_DATE_GREATER_THAN_OR_EQUAL_TO_CURRENT_DATE_PLUS_15_MINUTES',
        );
      }
      if (departureTime < trip.startDate) {
        throw new BadRequestException(
          'DEPARTURE_DATE_GREATER_THAN_OR_EQUAL_TO_TRIP_START_DATE',
        );
      }
      if (departureTime > trip.endDate) {
        throw new BadRequestException(
          'DEPARTURE_DATE_LESS_THAN_OR_EQUAL_TO_TRIP_END_DATE',
        );
      }
      if (
        (expectedTime && departureTime >= expectedTime) ||
        (!expectedTime && departureTime >= tripDetail.expectedTime)
      ) {
        throw new BadRequestException(
          'EXPECTED_DATE_GREATER_THAN_DEPARTURE_DATE',
        );
      }
      tripDetail.departureTime = departureTime;
    }
    if (expectedTime) {
      const departureTime2 = departureTime || tripDetail.departureTime;
      const expectedDate = new Date(
        moment(departureTime2).add(2, 'hours').format('YYYY-MM-DD HH:mm'),
      );
      if (expectedTime < expectedDate) {
        throw new BadRequestException(
          'EXPECTED_DATE_GREATER_THAN_OR_EQUAL_TO_DEPARTURE_DATE_PLUS_2_HOURS',
        );
      }
      if (expectedTime < trip.startDate) {
        throw new BadRequestException(
          'EXPECTED_DATE_GREATER_THAN_OR_EQUAL_TO_TRIP_START_DATE',
        );
      }
      tripDetail.expectedTime = expectedTime;
    }
    switch (status) {
      case TripDetailStatusEnum.NOT_SOLD_OUT:
      case TripDetailStatusEnum.SOLD_OUT:
        tripDetail.status = status;
        break;
      default:
        break;
    }

    if (vehicleId) {
      const vehicle = await this.dataSource
        .getRepository(Vehicle)
        .findOne({ where: { id: vehicleId } });
      if (!vehicle) {
        throw new BadRequestException('VEHICLE_NOT_FOUND');
      }
      tripDetail.vehicle = vehicle;
    } else if (vehicleCode) {
      const vehicle = await this.dataSource
        .getRepository(Vehicle)
        .findOne({ where: { code: vehicleCode } });
      if (!vehicle) {
        throw new BadRequestException('VEHICLE_NOT_FOUND');
      }
      tripDetail.vehicle = vehicle;
    }
    // check permissions
    const adminExist = await this.dataSource
      .getRepository(Staff)
      .findOne({ where: { id: userId } });
    if (!adminExist) {
      throw new UnauthorizedException('USER_NOT_FOUND');
    }
    if (!adminExist.isActive) {
      throw new UnauthorizedException('USER_NOT_ACTIVE');
    }
    tripDetail.updatedBy = adminExist.id;

    const saveTripDetail = await this.tripDetailRepository.save(tripDetail);
    const vehicle: Vehicle = tripDetail.vehicle;
    return {
      id: saveTripDetail.id,
      code: saveTripDetail.code,
      departureTime: saveTripDetail.departureTime,
      expectedTime: saveTripDetail.expectedTime,
      status: saveTripDetail.status,
      createdBy: saveTripDetail.createdBy,
      updatedBy: saveTripDetail.updatedBy,
      createdAt: saveTripDetail.createdAt,
      updatedAt: saveTripDetail.updatedAt,
      trip: {
        id: trip.id,
        code: trip.code,
      },
      vehicle: {
        id: vehicle.id,
        code: vehicle.code,
      },
    };
  }

  async deleteTripDetailByIdOrCode(userId: string, id?: string, code?: string) {
    const adminExist = await this.dataSource
      .getRepository(Staff)
      .findOne({ where: { id: userId } });
    if (!adminExist) {
      throw new UnauthorizedException('USER_NOT_FOUND');
    }
    if (!adminExist.isActive) {
      throw new UnauthorizedException('USER_NOT_ACTIVE');
    }

    let tripDetail: TripDetail;
    if (!id && !code) {
      throw new BadRequestException('ID_OR_CODE_REQUIRED');
    }
    if (id) {
      tripDetail = await this.findTripDetailById(id, {
        relations: { trip: true },
      });
    } else {
      tripDetail = await this.findTripDetailByCode(code, {
        relations: { trip: true },
      });
    }
    if (!tripDetail) {
      throw new BadRequestException('TRIP_DETAIL_NOT_FOUND');
    }
    const currentDate = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
    if (tripDetail.trip.endDate < currentDate) {
      throw new BadRequestException('TRIP_HAS_ENDED');
    }
    if (tripDetail.departureTime < currentDate) {
      throw new BadRequestException('TRIP_DETAIL_HAS_ENDED_NOT_DELETE');
    }
    tripDetail.deletedAt = new Date();
    tripDetail.updatedBy = adminExist.id;
    const saveTripDetail = await this.tripDetailRepository.save(tripDetail);

    return await {
      id: saveTripDetail.id,
      code: saveTripDetail.code,
      message: 'Xoá thành công',
    };
  }

  async deleteMultipleTripDetailByIdsOrCodes(
    userId: string,
    dto: TripDetailDeleteMultiInput,
    type: DeleteDtoTypeEnum,
  ) {
    try {
      const { ids } = dto;
      const adminExist = await this.dataSource
        .getRepository(Staff)
        .findOne({ where: { id: userId } });
      if (!adminExist) {
        throw new UnauthorizedException('USER_NOT_FOUND');
      }
      if (!adminExist.isActive) {
        throw new UnauthorizedException('USER_NOT_ACTIVE');
      }

      const list = await Promise.all(
        ids.map(async (data) => {
          if (!data) {
            return {
              id: type === DeleteDtoTypeEnum.ID ? data : undefined,
              code: type === DeleteDtoTypeEnum.CODE ? data : undefined,
              message: `${type} không được để trống`,
            };
          }
          let tripDetail: TripDetail;
          if (type === DeleteDtoTypeEnum.ID) {
            tripDetail = await this.findTripDetailById(data, {
              relations: { trip: true },
            });
          } else if (type === DeleteDtoTypeEnum.CODE) {
            tripDetail = await this.findTripDetailByCode(data, {
              relations: { trip: true },
            });
          }
          if (!tripDetail) {
            return {
              id: type === DeleteDtoTypeEnum.ID ? data : undefined,
              code: type === DeleteDtoTypeEnum.CODE ? data : undefined,
              message: 'TRIP_DETAIL_NOT_FOUND',
            };
          }
          const currentDate = new Date(moment().format('YYYY-MM-DD HH:mm:ss'));
          if (tripDetail.trip.endDate < currentDate) {
            throw new BadRequestException('TRIP_HAS_ENDED');
          }
          if (tripDetail.departureTime < currentDate) {
            throw new BadRequestException('TRIP_DETAIL_HAS_ENDED_NOT_DELETE');
          }
          tripDetail.deletedAt = new Date();
          tripDetail.updatedBy = adminExist.id;
          const saveTripDetail = await this.tripDetailRepository.save(
            tripDetail,
          );
          return {
            id: saveTripDetail.id,
            code: saveTripDetail.code,
            message: 'Xoá thành công',
          };
        }),
      );
      return list;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getBusSchedule(dto: BusScheduleDto, userId: string) {
    const adminExist = await this.dataSource
      .getRepository(Staff)
      .findOne({ where: { id: userId } });
    if (!adminExist) {
      throw new UnauthorizedException('USER_NOT_FOUND');
    }
    if (!adminExist.isActive) {
      throw new UnauthorizedException('USER_NOT_ACTIVE');
    }

    const { startDate, endDate, status, tripCode } = dto;

    if (!startDate) {
      throw new BadRequestException('START_DATE_IS_REQUIRED');
    }
    if (!endDate) {
      throw new BadRequestException('END_DATE_IS_REQUIRED');
    }
    if (startDate > endDate) {
      throw new BadRequestException('START_DATE_MUST_BE_BEFORE_END_DATE');
    }
    const newStartDate = moment(startDate).startOf('day').toDate();
    const newEndDate = moment(endDate).endOf('day').toDate();
    // startDate not more than 7 days from endDate
    if (moment(newEndDate).diff(moment(newStartDate), 'days') > 7) {
      throw new BadRequestException(
        'START_DATE_NOT_MORE_THAN_7_DAYS_FROM_END_DATE',
      );
    }

    const trips = await this.tripDetailRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.trip', 'trip')
      .leftJoinAndSelect('q.vehicle', 'vehicle')
      .where('q.departureTime BETWEEN :startDate AND :endDate', {
        startDate: newStartDate,
        endDate: newEndDate,
      });

    if (tripCode) {
      trips.andWhere('trip.code = :tripCode', { tripCode });
    }

    if (status) {
      trips.andWhere('q.status = :status', { status });
    }

    const data = await trips.getMany();

    const dataResult = data.map((item) => {
      return {
        id: item.id,
        code: item.code,
        departureTime: item.departureTime,
        expectedTime: item.expectedTime,
        status: item.status,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        trip: {
          id: item.trip.id,
          code: item.trip.code,
          name: item.trip.name,
          status: item.trip.status,
        },
        vehicle: {
          id: item.vehicle.id,
          code: item.vehicle.code,
          name: item.vehicle.name,
          status: item.vehicle.status,
          type: item.vehicle.type,
          licensePlate: item.vehicle.licensePlate,
          floorNumber: item.vehicle.floorNumber,
          totalSeat: item.vehicle.totalSeat,
        },
      };
    });

    return { dataResult, total: dataResult.length };
  }
}
