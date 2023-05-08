import {
  ActiveStatusEnum,
  DeleteDtoTypeEnum,
  SortEnum,
  VehicleTypeEnum,
} from './../../enums';
import {
  CreatePriceListDto,
  FilterPriceListDto,
  UpdatePriceListDto,
  DeletePriceListDto,
  CreatePriceDetailDto,
  FilterPriceDetailDto,
  UpdatePriceDetailDto,
  DeletePriceDetailDto,
  FilterPriceDetailForBookingDto,
} from './dto';
import { PriceDetail, PriceList, Staff, Trip } from './../../database/entities';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from './../../decorator';
import {
  DataSource,
  Repository,
  MoreThanOrEqual,
  LessThanOrEqual,
} from 'typeorm';
import { MyMoment } from './../../utils';

@Injectable()
export class PriceListService {
  constructor(
    @InjectRepository(PriceList)
    private readonly priceListRepository: Repository<PriceList>,
    @InjectRepository(PriceDetail)
    private readonly priceDetailRepository: Repository<PriceDetail>,
    private dataSource: DataSource,
  ) {}

  private selectFieldsPriceDetailWithQ = [
    'q.id',
    'q.code',
    'q.price',
    'q.seatType',
    'q.note',
    'q.priceListCode',
    'q.createdBy',
    'q.updatedBy',
    'q.createdAt',
    'q.updatedAt',
    't.id',
    't.code',
    't.name',
    't.note',
    't.startDate',
    't.endDate',
    't.status',
  ];

  private selectFieldsPriceListWithQ = [
    'q.id',
    'q.code',
    'q.name',
    'q.note',
    'q.startDate',
    'q.endDate',
    'q.status',
    'q.createdAt',
    'q.updatedAt',
    'q.createdBy',
    'q.updatedBy',
  ];
  // validate
  private async validOverlappingPriceList(date: Date) {
    const priceListExist = await this.findOnePriceList({
      where: {
        status: ActiveStatusEnum.ACTIVE,
        startDate: LessThanOrEqual(date),
        endDate: MoreThanOrEqual(date),
      },
    });
    if (priceListExist) {
      const code = priceListExist.code;
      throw new BadRequestException(
        'ANOTHER_PRICE_LIST_IS_EXIST_IN_THIS_DATE',
        {
          description: `Bảng giá có mã ${code} đã tồn tại trong khoảng thời gian này`,
        },
      );
    }
  }

  private async validOverlappingPriceDetail(
    date: Date,
    seatType: string,
    tripCode: string,
  ) {
    const priceDetail = await this.findOnePriceDetail({
      where: {
        seatType,
        priceList: {
          startDate: LessThanOrEqual(date),
          endDate: MoreThanOrEqual(date),
          status: ActiveStatusEnum.ACTIVE,
        },
        trip: {
          code: tripCode,
        },
      },
      relations: {
        priceList: true,
        trip: true,
      },
    });
    if (priceDetail) {
      const priceList: PriceList = priceDetail.priceList;
      throw new BadRequestException('TRIP_EXISTED_IN_PRICE_LIST', {
        description: `Loại ghế ${seatType} của tuyến có mã ${tripCode} đã tồn tại trong bảng giá đang hoạt động khác có mã ${priceList?.code}`,
      });
    }
  }

  // price list
  async findOnePriceList(options?: any) {
    const priceList = await this.priceListRepository.findOne({
      where: { ...options?.where },
      select: {
        deletedAt: false,
        ...options?.select,
      },
      relations: {
        ...options?.relations,
      },
      order: { createdAt: SortEnum.DESC, ...options?.order },
      ...options?.other,
    });
    return priceList;
  }

  async findOnePriceListById(id: string, options?: any) {
    if (options) {
      options.where = { id, ...options?.where };
    } else {
      options = { where: { id } };
    }
    return this.findOnePriceList(options);
  }

  async findOnePriceListByCode(code: string, options?: any) {
    if (options) {
      options.where = { code, ...options?.where };
    } else {
      options = { where: { code } };
    }
    return this.findOnePriceList(options);
  }

  async getPriceListById(id: string, options?: any) {
    const priceList = await this.findOnePriceListById(id, options);
    if (!priceList) {
      throw new BadRequestException('PRICE_LIST_NOT_FOUND');
    }
    return priceList;
  }

  async getPriceListByCode(code: string, options?: any) {
    const priceList = await this.findOnePriceListByCode(code, options);
    if (!priceList) {
      throw new BadRequestException('PRICE_LIST_NOT_FOUND');
    }
    return priceList;
  }

  async getPriceListStatus() {
    return {
      dataResult: Object.keys(ActiveStatusEnum).map(
        (key) => ActiveStatusEnum[key],
      ),
    };
  }

  async createPriceList(dto: CreatePriceListDto, adminId: string) {
    const { code, name, note, startDate, endDate, status } = dto;
    const adminExist = await this.dataSource
      .getRepository(Staff)
      .findOne({ where: { id: adminId } });
    if (!adminExist) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    if (!adminExist.isActive) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }

    const priceListCodeExist = await this.findOnePriceListByCode(code, {
      other: {
        withDeleted: true,
      },
    });
    if (priceListCodeExist) {
      throw new BadRequestException('PRICE_LIST_CODE_IS_EXIST');
    }

    const priceList = new PriceList();
    if (!name) {
      throw new BadRequestException('NAME_IS_REQUIRED');
    }
    priceList.code = code;
    priceList.name = name;
    priceList.note = note;
    switch (status) {
      case ActiveStatusEnum.ACTIVE:
        priceList.status = ActiveStatusEnum.ACTIVE;
        break;
      default:
        priceList.status = ActiveStatusEnum.INACTIVE;
        break;
    }
    priceList.createdBy = adminExist.id;

    if (!startDate) {
      throw new BadRequestException('START_DATE_IS_REQUIRED');
    }
    const newStartDate = new MyMoment(startDate).startOf('day').toDate();
    const currentDate = new MyMoment().startOf('day').toDate();
    if (newStartDate <= currentDate) {
      throw new BadRequestException('START_DATE_GREATER_THAN_NOW');
    }
    priceList.startDate = newStartDate;

    if (!endDate) {
      throw new BadRequestException('END_DATE_IS_REQUIRED');
    }
    const newEndDate = new MyMoment(endDate).endOf('day').toDate();
    if (newEndDate < currentDate) {
      throw new BadRequestException(
        'END_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_NOW',
      );
    }
    if (startDate > newEndDate) {
      throw new BadRequestException('START_DATE_MUST_BE_LESS_THAN_END_DATE');
    }
    priceList.endDate = newEndDate;

    // await this.validOverlappingPriceDetail(newStartDate);
    // await this.validOverlappingPriceDetail(newEndDate);

    const savePriceList = await this.priceListRepository.save(priceList);
    delete savePriceList.deletedAt;
    return savePriceList;
  }

  async findAllPriceList(dto: FilterPriceListDto, pagination?: Pagination) {
    const { keywords, startDate, endDate, status, sort } = dto;

    const query = this.priceListRepository.createQueryBuilder('q');
    if (keywords) {
      const newKeywords = keywords.trim();
      const subQuery = this.priceListRepository
        .createQueryBuilder('q2')
        .select('q2.id')
        .where('q2.code LIKE :code', { code: `%${newKeywords}%` })
        .orWhere('q2.name LIKE :name', { name: `%${newKeywords}%` })
        .orWhere('q2.note LIKE :note', { note: `%${newKeywords}%` })
        .getQuery();

      query.andWhere(`q.id in (${subQuery})`, {
        code: `%${newKeywords}%`,
        name: `%${newKeywords}%`,
        note: `%${newKeywords}%`,
      });
    }
    if (status) {
      query.where('q.status = :status', { status });
    }
    if (startDate) {
      const newStartDate = new MyMoment(startDate).startOf('day').toDate();
      query.andWhere('q.startDate >= :startDate', { startDate: newStartDate });
    }
    if (endDate) {
      const newEndDate = new MyMoment(endDate).endOf('day').toDate();
      query.andWhere('q.endDate <= :endDate', { endDate: newEndDate });
    }
    query.orderBy('q.createdAt', sort || SortEnum.DESC);

    const dataResult = await query
      .select(this.selectFieldsPriceListWithQ)
      .offset(pagination.skip ?? 0)
      .limit(pagination.take ?? 10)
      .getMany();
    const total = await query.clone().getCount();

    return { dataResult, total, pagination };
  }

  async updatePriceListByIdOrCode(
    adminId: string,
    dto: UpdatePriceListDto,
    id?: string,
    code?: string,
  ) {
    const { name, note, startDate, endDate, status } = dto;
    const adminExist = await this.dataSource
      .getRepository(Staff)
      .findOne({ where: { id: adminId } });
    if (!adminExist) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    if (!adminExist.isActive) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }

    let priceList: PriceList;
    if (id) {
      priceList = await this.findOnePriceListById(id);
    } else if (code) {
      priceList = await this.findOnePriceListByCode(code);
    }
    if (!priceList) {
      throw new BadRequestException('PRICE_LIST_NOT_FOUND');
    }
    const currentDate = new MyMoment().startOf('day').toDate();
    if (priceList.endDate <= currentDate) {
      throw new BadRequestException('PRICE_LIST_IS_EXPIRED');
    }
    if (name) {
      priceList.name = name;
    }
    if (note) {
      priceList.note = note;
    }

    if (startDate) {
      const newStartDate = new MyMoment(startDate).startOf('day').toDate();
      if (newStartDate.getTime() !== priceList.startDate.getTime()) {
        if (newStartDate <= currentDate) {
          throw new BadRequestException('START_DATE_GREATER_THAN_NOW');
        }
        if (!endDate && newStartDate >= priceList.endDate) {
          throw new BadRequestException(
            'END_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_START_DATE',
          );
        }
        if (
          priceList.status === ActiveStatusEnum.ACTIVE &&
          currentDate >= priceList.startDate &&
          currentDate <= priceList.endDate
        ) {
          throw new BadRequestException('PRICE_LIST_IS_ACTIVE_AND_IN_USE');
        }
        await this.validOverlappingPriceList(newStartDate);
        priceList.startDate = newStartDate;
      }
    }
    if (endDate) {
      const newEndDate = new MyMoment(endDate).endOf('day').toDate();
      const newStartDate = new MyMoment(startDate).startOf('day').toDate();
      if (newEndDate.getTime() !== priceList.endDate.getTime()) {
        if (newEndDate < currentDate) {
          throw new BadRequestException(
            'END_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_NOW',
          );
        }
        if (
          (!startDate && priceList.startDate > newEndDate) ||
          (startDate && newStartDate > newEndDate)
        ) {
          throw new BadRequestException(
            'END_DATE_MUST_BE_GREATER_THAN_START_DATE',
          );
        }
        await this.validOverlappingPriceList(newEndDate);
        priceList.endDate = newEndDate;
      }
    }
    switch (status) {
      case ActiveStatusEnum.ACTIVE:
        priceList.status = status;
        const priceDetails = await this.priceDetailRepository.find({
          where: {
            priceListCode: priceList.code,
          },
          relations: { trip: true },
        });
        if (priceDetails && priceDetails.length > 0) {
          const priceDetailsExist = await priceDetails.map(
            async (priceDetail) => {
              return await this.validOverlappingPriceDetail(
                priceList.startDate,
                priceDetail.seatType,
                priceDetail.trip.code,
              );
            },
          );
          await Promise.all(priceDetailsExist);
        }
        // await this.validOverlappingPriceList(startDate);
        // await this.validOverlappingPriceList(endDate);
        break;
      case ActiveStatusEnum.INACTIVE:
        priceList.status = status;
        break;
      default:
        break;
    }

    priceList.updatedBy = adminExist.id;
    const updateTrip = await this.priceListRepository.save(priceList);
    delete updateTrip.deletedAt;
    return updateTrip;
  }

  async deletePriceListByIdOrCode(adminId: string, id?: string, code?: string) {
    const adminExist = await this.dataSource
      .getRepository(Staff)
      .findOne({ where: { id: adminId } });
    if (!adminExist) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    if (!adminExist.isActive) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }
    let priceList: PriceList;
    if (id) {
      priceList = await this.findOnePriceListById(id, {
        relations: { priceDetails: true },
      });
    } else if (code) {
      priceList = await this.findOnePriceListByCode(id, {
        relations: { priceDetails: true },
      });
    }
    if (!priceList) {
      throw new BadRequestException('PRICE_LIST_NOT_FOUND');
    }
    const currentDate = new MyMoment().startOf('day').toDate();
    if (priceList.endDate <= currentDate) {
      throw new BadRequestException('PRICE_LIST_IS_EXPIRED');
    }
    if (
      priceList.status === ActiveStatusEnum.ACTIVE &&
      currentDate >= priceList.startDate &&
      currentDate <= priceList.endDate
    ) {
      throw new BadRequestException('PRICE_LIST_IS_ACTIVE_AND_IN_USE');
    }
    if (priceList?.priceDetails?.length > 0) {
      throw new BadRequestException('PRICE_LIST_HAS_PRICE_DETAIL');
    }
    priceList.updatedBy = adminExist.id;
    priceList.deletedAt = new Date();

    await this.priceListRepository.save(priceList);
    return {
      id: priceList.id,
      code: priceList.code,
      message: 'Xoá thành công',
    };
  }

  async deleteMultiPriceListByIdsOrCodes(
    adminId: string,
    dto: DeletePriceListDto,
    type: string,
  ) {
    try {
      const { ids } = dto;
      const adminExist = await this.dataSource
        .getRepository(Staff)
        .findOne({ where: { id: adminId } });
      if (!adminExist) {
        throw new UnauthorizedException('UNAUTHORIZED');
      }
      if (!adminExist.isActive) {
        throw new BadRequestException('USER_NOT_ACTIVE');
      }

      const list = await Promise.all(
        ids.map(async (data) => {
          let priceList: PriceList;
          if (type === 'id') {
            priceList = await this.findOnePriceListById(data, {
              relations: { priceDetails: true },
            });
          } else if (type === 'code') {
            priceList = await this.findOnePriceListByCode(data, {
              relations: { priceDetails: true },
            });
          }
          if (!priceList) {
            return {
              id: type === 'id' ? priceList.id : undefined,
              code: type === 'code' ? priceList.code : undefined,
              message: 'Không tìm thấy bảng giá',
            };
          }
          const currentDate = new MyMoment().startOf('day').toDate();
          if (priceList.endDate < currentDate) {
            return {
              id: priceList.id,
              code: priceList.code,
              message: 'Bảng giá này đã hết hạn',
            };
          }
          if (
            priceList.status === ActiveStatusEnum.ACTIVE &&
            currentDate >= priceList.startDate &&
            currentDate <= priceList.endDate
          ) {
            return {
              id: priceList.id,
              code: priceList.code,
              message: 'Bảng giá này đang được kích hoạt và đang được sử dụng',
            };
          }
          if (priceList?.priceDetails?.length > 0) {
            return {
              id: priceList.id,
              code: priceList.code,
              message: 'Bảng giá này vẫn còn có chi tiết bảng giá',
            };
          }
          priceList.updatedBy = adminExist.id;
          priceList.deletedAt = new Date();

          await this.priceListRepository.save(priceList);
          return {
            id: priceList.id,
            code: priceList.code,
            message: 'Xoá thành công',
          };
        }),
      );
      return list;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  // price detail
  async findOnePriceDetail(options: any) {
    return await this.priceDetailRepository.findOne({
      where: { ...options?.where },
      relations: {
        ...options?.relations,
      },
      select: { ...options?.select },
      order: { createdAt: SortEnum.DESC, ...options?.order },
      ...options?.other,
    });
  }

  async findOnePriceDetailById(id: string, options?: any) {
    if (options) {
      options.where = { id: id, ...options?.where };
    } else {
      options = { where: { id: id } };
    }
    return await this.findOnePriceDetail(options);
  }

  async findOnePriceDetailByCode(code: string, options?: any) {
    if (options) {
      options.where = { code, ...options?.where };
    } else {
      options = { where: { code } };
    }
    return await this.findOnePriceDetail(options);
  }

  async getPriceDetailById(id: string, options?: any) {
    const priceDetail = await this.findOnePriceDetailById(id, options);
    if (!priceDetail) {
      throw new BadRequestException('PRICE_DETAIL_NOT_FOUND');
    }
    return priceDetail;
  }

  async getPriceDetailByCode(code: string, options?: any) {
    const priceDetail = await this.findOnePriceDetailByCode(code, options);
    if (!priceDetail) {
      throw new BadRequestException('PRICE_DETAIL_NOT_FOUND');
    }
    return priceDetail;
  }

  async getPriceDetailSeatType() {
    return {
      dataResult: Object.keys(VehicleTypeEnum).map(
        (key) => VehicleTypeEnum[key],
      ),
    };
  }

  async findPriceDetailForBooking(dto: FilterPriceDetailForBookingDto) {
    const { applyDate, seatType, tripDetailCode, tripCode } = dto;
    const newApplyDate = new MyMoment(applyDate).startOf('day').toDate();
    const priceDetail = await this.findOnePriceDetail({
      where: {
        seatType,
        trip: {
          code: tripCode,
          tripDetails: {
            code: tripDetailCode,
          },
        },
        priceList: {
          startDate: LessThanOrEqual(newApplyDate),
          endDate: MoreThanOrEqual(newApplyDate),
          status: ActiveStatusEnum.ACTIVE,
        },
      },
      relations: {
        priceList: true,
        trip: { priceDetails: true },
      },
    });
    if (!priceDetail) {
      return { dataResult: null };
    }
    delete priceDetail.priceList;
    delete priceDetail.trip.priceDetails;

    return { dataResult: priceDetail };
  }

  async findAllPriceDetail(dto: FilterPriceDetailDto, pagination?: Pagination) {
    const { maxPrice, minPrice, keywords, priceListCode, sort, seatType } = dto;
    const query = this.priceDetailRepository.createQueryBuilder('q');

    if (keywords) {
      const newKeywords = keywords.trim();
      const subQuery = this.priceDetailRepository
        .createQueryBuilder('q2')
        .select('q2.id')
        .where('q2.code LIKE :code', { code: `%${newKeywords}%` })
        .orWhere('q2.note LIKE :note', { note: `%${newKeywords}%` })
        .getQuery();

      query.andWhere(`q.id in (${subQuery})`, {
        code: `%${newKeywords}%`,
        note: `%${newKeywords}%`,
      });
    }
    if (maxPrice) {
      query.andWhere('q.price <= :maxPrice', { maxPrice });
    }
    if (minPrice) {
      query.andWhere('q.price >= :minPrice', { minPrice });
    }
    if (priceListCode) {
      query
        .leftJoinAndSelect('q.priceList', 'p')
        .andWhere('q.priceListCode = :priceListCode', { priceListCode });
    }
    switch (seatType) {
      case VehicleTypeEnum.LIMOUSINE:
      case VehicleTypeEnum.SLEEPER_BUS:
      case VehicleTypeEnum.SEAT_BUS:
        query.andWhere('q.seatType = :seatType', { seatType });
        break;
      default:
        break;
    }
    query
      .orderBy('q.price', sort || SortEnum.ASC)
      .addOrderBy('q.code', sort || SortEnum.DESC)
      .addOrderBy('q.note', sort || SortEnum.DESC);

    const dataResult = await query
      .leftJoinAndSelect('q.trip', 't')
      .select(this.selectFieldsPriceDetailWithQ)
      .skip(pagination.skip)
      .take(pagination.take)
      .getMany();
    const total = await query.clone().getCount();

    return { dataResult, pagination, total };
  }

  async createPriceDetail(dto: CreatePriceDetailDto, adminId: string) {
    const {
      code,
      price,
      note,
      priceListId,
      priceListCode,
      tripCode,
      seatType,
    } = dto;

    const adminExist = await this.dataSource
      .getRepository(Staff)
      .findOne({ where: { id: adminId } });
    if (!adminExist) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    if (!adminExist.isActive) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }

    const priceDetailCodeExist = await this.findOnePriceDetailByCode(code);
    if (priceDetailCodeExist) {
      throw new BadRequestException('PRICE_DETAIL_CODE_EXISTED');
    }

    if (!priceListId && !priceListCode) {
      throw new BadRequestException('PRICE_LIST_ID_OR_CODE_REQUIRED');
    }
    let priceList: PriceList;
    if (priceListId) {
      priceList = await this.findOnePriceListById(priceListId);
    } else {
      priceList = await this.findOnePriceListByCode(priceListCode);
    }
    if (!priceList) {
      throw new BadRequestException('PRICE_LIST_NOT_FOUND');
    }
    const currentDate = new MyMoment().startOf('day').toDate();
    if (priceList.endDate <= currentDate) {
      throw new BadRequestException('PRICE_LIST_IS_EXPIRED');
    }

    const priceDetail = new PriceDetail();
    priceDetail.priceList = priceList;
    priceDetail.priceListCode = priceList.code;

    const trip = await this.dataSource.getRepository(Trip).findOne({
      where: { code: tripCode },
    });
    if (!trip) {
      throw new BadRequestException('TRIP_NOT_FOUND');
    }
    priceDetail.trip = trip;

    switch (seatType) {
      case VehicleTypeEnum.LIMOUSINE:
      case VehicleTypeEnum.SEAT_BUS:
      case VehicleTypeEnum.SLEEPER_BUS:
        priceDetail.seatType = seatType;
        break;
      default:
        throw new BadRequestException('SEAT_TYPE_NOT_FOUND');
    }
    await this.validOverlappingPriceDetail(
      priceList.startDate,
      seatType,
      tripCode,
    );
    await this.validOverlappingPriceDetail(
      priceList.endDate,
      seatType,
      tripCode,
    );

    const priceDetailExist = await this.findOnePriceDetailByCode(code);
    if (priceDetailExist) {
      throw new BadRequestException('PRICE_DETAIL_CODE_EXISTED');
    }
    priceDetail.code = code;

    if (price < 0 || isNaN(price)) {
      throw new BadRequestException('PRICE_MUST_GREATER_THAN_ZERO');
    }
    priceDetail.price = price;
    priceDetail.note = note;
    priceDetail.createdBy = adminExist.id;

    const savePriceDetail = await this.priceDetailRepository.save(priceDetail);
    delete savePriceDetail.deletedAt;
    return savePriceDetail;
  }

  async updatePriceDetailByIdOrCode(
    adminId: string,
    dto: UpdatePriceDetailDto,
    id?: string,
    code?: string,
  ) {
    const { price, note, tripCode, seatType } = dto;
    const adminExist = await this.dataSource
      .getRepository(Staff)
      .findOne({ where: { id: adminId } });
    if (!adminExist) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    if (!adminExist.isActive) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }

    let priceDetail;
    if (!id && !code) {
      throw new BadRequestException('ID_OR_CODE_IS_REQUIRED');
    }
    if (id) {
      priceDetail = await this.getPriceDetailById(id, {
        relations: {
          priceList: true,
          trip: true,
        },
      });
    } else if (code) {
      priceDetail = await this.getPriceDetailByCode(code, {
        relations: {
          priceList: true,
          trip: true,
        },
      });
    }
    if (!priceDetail) {
      throw new BadRequestException('PRICE_DETAIL_NOT_FOUND');
    }
    const priceList: PriceList = priceDetail.priceList;

    const currentDate = new MyMoment().startOf('day').toDate();
    if (priceList.endDate <= currentDate) {
      throw new BadRequestException('PRICE_LIST_IS_EXPIRED');
    }
    if (
      priceList.status === ActiveStatusEnum.ACTIVE &&
      currentDate >= priceList.startDate &&
      currentDate <= priceList.endDate
    ) {
      throw new BadRequestException('PRICE_LIST_IS_ACTIVE_AND_IN_USE');
    }

    switch (seatType) {
      case VehicleTypeEnum.LIMOUSINE:
      case VehicleTypeEnum.SEAT_BUS:
      case VehicleTypeEnum.SLEEPER_BUS:
        priceDetail.seatType = seatType;
        break;
      default:
        throw new BadRequestException('SEAT_TYPE_NOT_FOUND');
    }
    if (tripCode) {
      const trip = await this.dataSource.getRepository(Trip).findOne({
        where: { code: tripCode },
      });
      if (!trip) {
        throw new BadRequestException('TRIP_NOT_FOUND');
      }
      priceDetail.trip = trip;
    }

    await this.validOverlappingPriceDetail(
      priceList.startDate,
      seatType,
      tripCode,
    );
    await this.validOverlappingPriceDetail(
      priceList.endDate,
      seatType,
      tripCode,
    );

    if (price) {
      if (price < 0 || isNaN(price)) {
        throw new BadRequestException('PRICE_MUST_GREATER_THAN_ZERO');
      }
      if (price > Number.MAX_VALUE) {
        throw new BadRequestException('PRICE_IS_TOO_BIG');
      }
      priceDetail.price = price;
    }
    if (note) {
      priceDetail.note = note;
    }
    priceDetail.updatedBy = adminExist.id;

    const updatePriceDetail = await this.priceDetailRepository.save(
      priceDetail,
    );
    delete updatePriceDetail.deletedAt;
    return updatePriceDetail;
  }

  async deletePriceDetailByIdOrCode(
    adminId: string,
    id?: string,
    code?: string,
  ) {
    const adminExist = await this.dataSource
      .getRepository(Staff)
      .findOne({ where: { id: adminId } });
    if (!adminExist) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    if (!adminExist.isActive) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }

    let priceDetail: PriceDetail;
    if (!id && !code) {
      throw new BadRequestException('ID_OR_CODE_IS_REQUIRED');
    }
    if (id) {
      priceDetail = await this.getPriceDetailById(id, {
        relations: { priceList: true },
      });
    }
    if (code) {
      priceDetail = await this.getPriceDetailByCode(code, {
        relations: { priceList: true },
      });
    }
    if (!priceDetail) {
      throw new BadRequestException('PRICE_DETAIL_NOT_FOUND');
    }
    const priceList: PriceList = priceDetail.priceList;
    const currentDate = new MyMoment().startOf('day').toDate();
    if (priceList.endDate <= currentDate) {
      throw new BadRequestException('PRICE_LIST_IS_EXPIRED');
    }
    priceDetail.updatedBy = adminExist.id;
    priceDetail.deletedAt = new Date();

    await this.priceDetailRepository.save(priceDetail);
    return {
      id: priceDetail.id,
      code: priceDetail.code,
      message: 'Xoá thành công',
    };
  }

  async deleteMultiPriceDetailByIdsOrCodes(
    adminId: string,
    dto: DeletePriceDetailDto,
    type: DeleteDtoTypeEnum,
  ) {
    try {
      const { list } = dto;
      const adminExist = await this.dataSource
        .getRepository(Staff)
        .findOne({ where: { id: adminId } });
      if (!adminExist) {
        throw new UnauthorizedException('UNAUTHORIZED');
      }
      if (!adminExist.isActive) {
        throw new BadRequestException('USER_NOT_ACTIVE');
      }

      const newList = await Promise.all(
        list.map(async (data) => {
          if (!data) {
            return {
              id: type === 'id' ? data : undefined,
              code: type === 'code' ? data : undefined,
              message: `${type} không được để trống`,
            };
          }
          let priceDetail;
          if (type === DeleteDtoTypeEnum.ID) {
            priceDetail = await this.getPriceDetailById(data, {
              relations: { priceList: true },
            });
          } else {
            priceDetail = await this.getPriceDetailByCode(data, {
              relations: { priceList: true },
            });
          }
          if (!priceDetail) {
            return {
              id: type === 'id' ? data : undefined,
              code: type === 'code' ? data : undefined,
              message: 'Không tìm thấy chi tiết bảng giá',
            };
          }
          const priceList: PriceList = priceDetail.priceList;
          const currentDate = new MyMoment().startOf('day').toDate();
          if (priceList.endDate <= currentDate) {
            throw new BadRequestException('PRICE_LIST_IS_EXPIRED');
          }
          priceDetail.updatedBy = adminExist.id;
          priceDetail.deletedAt = new Date();

          await this.priceDetailRepository.save(priceDetail);
          return {
            id: type === 'id' ? data : undefined,
            code: type === 'code' ? data : undefined,
            message: 'Xoá thành công',
          };
        }),
      );
      return newList;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
