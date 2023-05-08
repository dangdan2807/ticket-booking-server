import { Pagination } from './../../decorator';
import {
  CreatePromotionLinesDto,
  ProductDiscountDto,
  ProductDiscountPercentDto,
  UpdatePromotionLineDto,
  FilterPromotionLineDto,
  FilterAvailablePromotionLineDto,
  DeleteMultiPromotionLineDto,
  CreatePromotionLineDto,
} from './dto';
import {
  DeleteDtoTypeEnum,
  PromotionTypeEnum,
  SortEnum,
  PromotionStatusEnum,
} from './../../enums';
import {
  Promotion,
  PromotionDetail,
  PromotionLine,
  Staff,
  Trip,
} from './../../database/entities';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { MyMoment } from './../../utils';

@Injectable()
export class PromotionLineService {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
    @InjectRepository(PromotionLine)
    private readonly promotionLineRepository: Repository<PromotionLine>,
    @InjectRepository(PromotionDetail)
    private readonly promotionDetailRepository: Repository<PromotionDetail>,
    private dataSource: DataSource,
  ) {}

  // valid
  private async validProductDiscount(
    dto: ProductDiscountDto,
    savePromotionLine: PromotionLine,
  ): Promise<PromotionDetail> {
    const { quantityBuy, purchaseAmount, maxReductionAmount, reductionAmount } =
      dto;
    const promotionDetail = new PromotionDetail();
    promotionDetail.percentDiscount = null;
    promotionDetail.promotionLine = savePromotionLine;
    if (quantityBuy) {
      if (!Number.isInteger(quantityBuy)) {
        throw new BadRequestException('QUANTITY_BUY_MUST_BE_INTEGER');
      }
      if (quantityBuy < 1) {
        throw new BadRequestException('QUANTITY_BUY_MUST_BE_GREATER_THAN_0');
      }
      promotionDetail.quantityBuy = quantityBuy;
    }
    if (purchaseAmount) {
      if (!Number.isInteger(purchaseAmount)) {
        throw new BadRequestException(
          'PURCHASE_AMOUNT_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0',
        );
      }
      if (purchaseAmount < 0) {
        throw new BadRequestException(
          'PURCHASE_AMOUNT_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0',
        );
      }
      promotionDetail.purchaseAmount = purchaseAmount;
    }
    if (!quantityBuy && !purchaseAmount) {
      throw new BadRequestException(
        'QUANTITY_BUY_OR_PURCHASE_AMOUNT_IS_REQUIRED',
      );
    }

    if (!maxReductionAmount && maxReductionAmount !== 0) {
      throw new BadRequestException('MAX_REDUCTION_AMOUNT_IS_REQUIRED');
    }
    if (maxReductionAmount < 0) {
      throw new BadRequestException(
        'MAX_REDUCTION_AMOUNT_GREATER_THAN_OR_EQUAL_TO_0',
      );
    }
    if (!Number.isInteger(maxReductionAmount)) {
      throw new BadRequestException('MAX_REDUCTION_AMOUNT_MUST_BE_INT');
    }
    promotionDetail.maxReductionAmount = maxReductionAmount;

    if (!reductionAmount && reductionAmount !== 0) {
      throw new BadRequestException('REDUCTION_AMOUNT_IS_REQUIRED');
    }
    if (reductionAmount < 0) {
      throw new BadRequestException(
        'REDUCTION_AMOUNT_GREATER_THAN_OR_EQUAL_TO_0',
      );
    }
    if (!Number.isInteger(reductionAmount)) {
      throw new BadRequestException('REDUCTION_AMOUNT_IS_INT');
    }
    promotionDetail.reductionAmount = reductionAmount;

    return promotionDetail;
  }

  private async validProductDiscountPercent(
    dto: ProductDiscountPercentDto,
    savePromotionLine: PromotionLine,
  ): Promise<PromotionDetail> {
    const { quantityBuy, purchaseAmount, maxReductionAmount, percentDiscount } =
      dto;
    const promotionDetail = new PromotionDetail();
    promotionDetail.reductionAmount = null;
    promotionDetail.promotionLine = savePromotionLine;
    if (!quantityBuy && !purchaseAmount) {
      throw new BadRequestException(
        'QUANTITY_BUY_OR_PURCHASE_AMOUNT_IS_REQUIRED',
      );
    }
    if (quantityBuy) {
      if (quantityBuy < 1) {
        throw new BadRequestException('QUANTITY_BUY_MUST_BE_GREATER_THAN_0');
      }
      if (!Number.isInteger(quantityBuy)) {
        throw new BadRequestException('QUANTITY_BUY_MUST_BE_INTEGER');
      }
      promotionDetail.quantityBuy = quantityBuy;
    }
    if (purchaseAmount) {
      if (purchaseAmount < 0) {
        throw new BadRequestException(
          'PURCHASE_AMOUNT_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0',
        );
      }
      if (!Number.isInteger(purchaseAmount)) {
        throw new BadRequestException(
          'PURCHASE_AMOUNT_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0',
        );
      }
      promotionDetail.purchaseAmount = purchaseAmount;
    }

    if (!maxReductionAmount && maxReductionAmount !== 0) {
      throw new BadRequestException('MAX_REDUCTION_AMOUNT_IS_REQUIRED');
    }
    if (maxReductionAmount < 0) {
      throw new BadRequestException(
        'MAX_REDUCTION_AMOUNT_GREATER_THAN_OR_EQUAL_TO_0',
      );
    }
    if (!Number.isInteger(maxReductionAmount)) {
      throw new BadRequestException('MAX_REDUCTION_AMOUNT_MUST_BE_INT');
    }
    promotionDetail.maxReductionAmount = maxReductionAmount;

    if (!percentDiscount) {
      throw new BadRequestException('PERCENT_DISCOUNT_IS_REQUIRED');
    }
    if (percentDiscount < 1) {
      throw new BadRequestException(
        'PERCENT_DISCOUNT_GREATER_THAN_OR_EQUAL_TO_1',
      );
    }
    if (percentDiscount > 100) {
      throw new BadRequestException(
        'PERCENT_DISCOUNT_LESS_THAN_OR_EQUAL_TO_100',
      );
    }
    if (!Number.isInteger(percentDiscount)) {
      throw new BadRequestException('PERCENT_DISCOUNT_IS_INT');
    }
    promotionDetail.percentDiscount = percentDiscount;

    return promotionDetail;
  }

  // promotion
  async findOnePromotion(options: any) {
    return await this.promotionRepository.findOne({
      where: { ...options?.where },
      relations: {
        ...options?.relations,
      },
      select: {
        deletedAt: false,
        ...options?.select,
      },
      order: {
        createdAt: SortEnum.DESC,
        ...options?.order,
      },
      ...options?.other,
    });
  }

  // promotion line
  async findOnePromotionLine(options: any) {
    return await this.promotionLineRepository.findOne({
      where: { ...options?.where },
      select: {
        promotionDetail: {
          id: true,
          purchaseAmount: true,
          reductionAmount: true,
          percentDiscount: true,
          maxReductionAmount: true,
          promotionLineCode: true,
          trip: {
            id: true,
            code: true,
            name: true,
            status: true,
          },
        },
        ...options?.select,
      },
      relations: {
        promotionDetail: { trip: true },
        ...options?.relations,
      },
      order: {
        createdAt: SortEnum.DESC,
        ...options?.order,
      },
      ...options?.other,
    });
  }

  async findOnePromotionLineByCode(code: string, options?: any) {
    if (options) {
      options.where = { code, ...options?.where };
    } else {
      options = { where: { code } };
    }
    return await this.findOnePromotionLine(options);
  }

  async findOnePromotionLineById(id: string, options?: any) {
    if (options) {
      options.where = { id, ...options?.where };
    } else {
      options = { where: { id } };
    }
    return await this.findOnePromotionLine(options);
  }

  async getPromotionLineById(id: string, options?: any) {
    const line = await this.findOnePromotionLineById(id, options);
    if (!line) {
      throw new NotFoundException('PROMOTION_LINE_NOT_FOUND');
    }
    return line;
  }

  async getPromotionLineByCode(code: string, options?: any) {
    const line = await this.findOnePromotionLineByCode(code, options);
    if (!line) {
      throw new NotFoundException('PROMOTION_LINE_NOT_FOUND');
    }
    return line;
  }

  async getPromotionLineTypeEnum() {
    return {
      dataResult: Object.keys(PromotionTypeEnum).map(
        (key) => PromotionTypeEnum[key],
      ),
    };
  }

  async findAllPromotionLine(
    dto: FilterPromotionLineDto,
    pagination?: Pagination,
  ) {
    const {
      keywords,
      minUseBudget,
      maxUseBudget,
      minOfMaxBudget,
      maxOfMaxBudget,
      minUseQuantity,
      maxUseQuantity,
      maxOfMaxQuantity,
      minOfMaxQuantity,
      startDate,
      endDate,
      type,
      promotionCode,
      sort,
    } = dto;
    const query = this.promotionLineRepository.createQueryBuilder('q');
    if (keywords) {
      const newKeywords = keywords.trim();
      const subQuery = this.promotionLineRepository
        .createQueryBuilder('q2')
        .where('q2.code LIKE :code', { code: `%${newKeywords}%` })
        .orWhere('q2.couponCode LIKE :couponCode', {
          couponCode: `%${newKeywords}%`,
        })
        .where('q2.title LIKE :title', { title: `%${newKeywords}%` })
        .where('q2.description LIKE :description', {
          description: `%${newKeywords}%`,
        })
        .where('q2.note LIKE :note', { note: `%${newKeywords}%` })
        .select('q2.id')
        .getQuery();

      query.andWhere(`q.id in (${subQuery})`, {
        code: `%${newKeywords}%`,
        couponCode: `%${newKeywords}%`,
        title: `%${newKeywords}%`,
        description: `%${newKeywords}%`,
        note: `%${newKeywords}%`,
      });
    }
    if (promotionCode) {
      query.leftJoinAndSelect('q.promotion', 'p');
      query.andWhere('p.code = :promotionCode', { promotionCode });
    }
    if (startDate) {
      const newStartDate = new MyMoment(startDate).startOf('day').toDate();
      query.andWhere('q.startDate >= :startDate', { startDate: newStartDate });
    }
    if (endDate) {
      const newEndDate = new MyMoment(endDate).endOf('day').toDate();
      query.andWhere('q.endDate <= :endDate', { endDate: newEndDate });
    }
    switch (type) {
      case PromotionTypeEnum.PRODUCT_DISCOUNT:
      case PromotionTypeEnum.PRODUCT_DISCOUNT_PERCENT:
        query.andWhere('q.type = :type', { type });
        break;
      default:
        break;
    }
    if (minUseQuantity) {
      query.andWhere('q.useQuantity >= :minUseQuantity', { minUseQuantity });
    }
    if (maxUseQuantity) {
      query.andWhere('q.useQuantity <= :maxUseQuantity', { maxUseQuantity });
    }
    if (minUseBudget) {
      query.andWhere('q.useBudget >= :minUseBudget', { minUseBudget });
    }
    if (maxUseBudget) {
      query.andWhere('q.useBudget <= :maxUseBudget', { maxUseBudget });
    }
    if (minOfMaxQuantity) {
      query.andWhere('q.maxQuantity >= :minOfMaxQuantity', {
        minOfMaxQuantity,
      });
    }
    if (maxOfMaxQuantity) {
      query.andWhere('q.maxQuantity <= :maxOfMaxQuantity', {
        maxOfMaxQuantity,
      });
    }
    if (minOfMaxBudget) {
      query.andWhere('q.maxBudget >= :minOfMaxBudget', {
        minOfMaxBudget,
      });
    }
    if (maxOfMaxBudget) {
      query.andWhere('q.maxBudget <= :maxOfMaxBudget', {
        maxOfMaxBudget,
      });
    }

    query
      .orderBy('q.title', sort || SortEnum.DESC)
      .orderBy('q.code', sort || SortEnum.DESC)
      .orderBy('q.couponCode', sort || SortEnum.DESC)
      .addOrderBy('q.createdAt', sort || SortEnum.DESC);

    const dataResult = await query
      .leftJoinAndSelect('q.promotionDetail', 'pd')
      .leftJoinAndSelect('pd.trip', 't')
      .offset(pagination.skip ?? 0)
      .limit(pagination.take ?? 10)
      .getMany();
    const total = await query.clone().getCount();

    return { dataResult, total, pagination };
  }

  async findAvailablePromotionLine(dto: FilterAvailablePromotionLineDto) {
    const { startDate, endDate, minPurchaseAmount, minQuantityBuy, tripCode } =
      dto;

    const currentDate = new MyMoment().startOf('day').toDate();
    const newStartDate = new MyMoment(startDate).startOf('day').toDate();
    const newEndDate = new MyMoment(endDate).startOf('day').toDate();
    const query = await this.promotionLineRepository
      .createQueryBuilder('pl')
      .where('pl.startDate <= :startDate', {
        startDate: startDate ? newStartDate : currentDate,
      })
      .andWhere('pl.endDate >= :startDate', {
        endDate: endDate ? newEndDate : currentDate,
      })
      .andWhere('pl.useBudget < pl.maxBudget')
      .andWhere('pl.useQuantity < pl.maxQuantity')

      .leftJoinAndSelect('pl.promotion', 'p')
      .andWhere('p.status = :status', { status: PromotionStatusEnum.ACTIVE })

      .leftJoinAndSelect('pl.promotionDetail', 'pd')
      .andWhere('pd.quantityBuy >= :quantityBuy', {
        quantityBuy: minQuantityBuy || 0,
      })
      .andWhere('pd.purchaseAmount >= :purchaseAmount', {
        purchaseAmount: minPurchaseAmount || 0,
      });

    const subQuery = await this.promotionLineRepository
      .createQueryBuilder('pl2')
      .leftJoinAndSelect('pl2.promotionDetail', 'pd2')
      .leftJoinAndSelect('pd2.trip', 't2')
      .where('t2.code = :tripCode', { tripCode })
      .orWhere('pd2.trip is null')
      .select('pl2.id')
      .getQuery();
    query.andWhere(`pl.id in (${subQuery})`, { tripCode });

    const dataResult = await query
      .select([
        'pl.id',
        'pl.code',
        'pl.couponCode',
        'pl.title',
        'pl.description',
        'pl.note',
        'pl.startDate',
        'pl.endDate',
        'pl.type',
        'pl.useBudget',
        'pl.maxBudget',
        'pl.useQuantity',
        'pl.maxQuantity',
        'pl.applyAll',
        'pd.id',
        'pd.quantityBuy',
        'pd.purchaseAmount',
        'pd.reductionAmount',
        'pd.maxReductionAmount',
        'pd.promotionLineCode',
      ])
      .getMany();
    const total = await query.clone().getCount();

    return { dataResult, total };
  }

  async createPromotionLines(dto: CreatePromotionLinesDto, adminId: string) {
    const {
      code,
      couponCode,
      description,
      maxBudget,
      maxQuantity,
      startDate,
      endDate,
      note,
      promotionCode,
      title,
      tripCodes,
      type,
      productDiscount,
      productDiscountPercent,
    } = dto;
    if (!tripCodes || (tripCodes && tripCodes.length === 0)) {
      throw new BadRequestException('TRIP_CODES_IS_REQUIRED');
    }
    let isAllTrip = false;
    let dataResult;
    if (tripCodes[0] === 'ALL_TRIP') {
      isAllTrip = true;
      const dtoCreatePromotionLine: CreatePromotionLineDto = {
        code,
        title,
        description,
        note,
        maxBudget,
        maxQuantity,
        startDate,
        endDate,
        type,
        promotionCode,
        couponCode,
        tripCode: 'ALL_TRIP',
        productDiscount,
        productDiscountPercent,
      };
      dataResult = [
        await this.createPromotionLine(
          dtoCreatePromotionLine,
          adminId,
          isAllTrip,
        ),
      ];
    } else {
      dataResult = await tripCodes.map(async (tripCode, index) => {
        const dtoCreatePromotionLine: CreatePromotionLineDto = {
          code: `${code}${index}`,
          title,
          description,
          note,
          maxBudget,
          maxQuantity,
          startDate,
          endDate,
          type,
          promotionCode,
          couponCode: `${couponCode}${index}`,
          tripCode,
          productDiscount,
          productDiscountPercent,
        };
        return await this.createPromotionLine(
          dtoCreatePromotionLine,
          adminId,
          isAllTrip,
        );
      });
    }

    const promotionLines = await Promise.all(dataResult);
    if (promotionLines[0]['message']) {
      throw new BadRequestException(promotionLines[0]['message']);
    }
    return promotionLines;
  }

  async createPromotionLine(
    dto: CreatePromotionLineDto,
    adminId: string,
    isAllTrip?: boolean,
  ) {
    const {
      code,
      title,
      description,
      note,
      maxBudget,
      maxQuantity,
      startDate,
      endDate,
      type,
      promotionCode,
      couponCode,
      tripCode,
      productDiscount,
      productDiscountPercent,
    } = dto;
    const queryRunnerPL =
      this.promotionLineRepository.manager.connection.createQueryRunner();
    await queryRunnerPL.connect();
    await queryRunnerPL.startTransaction();

    const queryRunnerPD =
      this.promotionDetailRepository.manager.connection.createQueryRunner();
    await queryRunnerPD.connect();
    await queryRunnerPD.startTransaction();
    let savePromotionDetail: PromotionDetail;
    let savePromotionLine: PromotionLine;
    try {
      const adminExist = await this.dataSource.getRepository(Staff).findOne({
        where: { id: adminId },
      });
      if (!adminExist) {
        throw new NotFoundException('USER_NOT_FOUND');
      }
      if (!adminExist.isActive) {
        throw new BadRequestException('USER_NOT_ACTIVE');
      }

      if (!promotionCode) {
        throw new BadRequestException('PROMOTION_CODE_IS_REQUIRED');
      }
      const promotionLine = new PromotionLine();
      const promotion = await this.findOnePromotion({
        where: { code: promotionCode },
      });
      if (!promotion) {
        throw new BadRequestException('PROMOTION_NOT_FOUND');
      }
      promotionLine.promotion = promotion;

      const currentDate = new MyMoment().startOf('day').toDate();
      if (promotion.endDate < currentDate) {
        throw new BadRequestException('PROMOTION_HAS_EXPIRED');
      }

      const promotionLineCodeExist = await this.findOnePromotionLineByCode(
        code,
        { other: { withDeleted: true } },
      );
      if (promotionLineCodeExist) {
        throw new BadRequestException('PROMOTION_LINE_CODE_ALREADY_EXIST');
      }
      promotionLine.code = code;

      promotionLine.title = title;
      promotionLine.description = description;
      promotionLine.note = note;
      if (maxBudget <= 0 || isNaN(maxBudget)) {
        throw new BadRequestException('MAX_BUDGET_MUST_BE_GREATER_THAN_0');
      }
      promotionLine.maxBudget = maxBudget;

      if (!Number.isInteger(maxQuantity)) {
        throw new BadRequestException('MAX_QUANTITY_MUST_BE_INT');
      }
      if (maxQuantity <= 0) {
        throw new BadRequestException('MAX_QUANTITY_MUST_BE_GREATER_THAN_0');
      }
      promotionLine.maxQuantity = maxQuantity;

      switch (type) {
        case PromotionTypeEnum.PRODUCT_DISCOUNT:
        case PromotionTypeEnum.PRODUCT_DISCOUNT_PERCENT:
          promotionLine.type = type;
          break;
        default:
          throw new BadRequestException('PROMOTION_LINE_TYPE_IS_ENUM');
      }
      // validate startDate
      if (!startDate) {
        promotionLine.startDate = promotion.startDate;
      } else {
        const newStartDate = new MyMoment(startDate).startOf('day').toDate();
        if (newStartDate <= currentDate) {
          throw new BadRequestException('START_DATE_GREATER_THAN_NOW');
        }
        if (newStartDate < promotion.startDate) {
          throw new BadRequestException(
            'START_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_PROMOTION_START_DATE',
          );
        }
        if (newStartDate > promotion.endDate) {
          throw new BadRequestException(
            'START_DATE_MUST_BE_LESS_THAN_OR_EQUAL_TO_PROMOTION_END_DATE',
          );
        }
        promotionLine.startDate = newStartDate;
      }

      // validate endDate
      if (!endDate) {
        promotionLine.endDate = promotion.endDate;
      } else {
        const newEndDate = new MyMoment(endDate).startOf('day').toDate();
        if (newEndDate < currentDate) {
          throw new BadRequestException(
            'END_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_NOW',
          );
        }
        if (newEndDate < startDate) {
          throw new BadRequestException(
            'END_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_START_DATE',
          );
        }
        if (newEndDate > promotion.endDate) {
          throw new BadRequestException(
            'END_DATE_MUST_BE_LESS_THAN_OR_EQUAL_TO_PROMOTION_END_DATE',
          );
        }
        if (newEndDate < promotion.startDate) {
          throw new BadRequestException(
            'END_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_PROMOTION_START_DATE',
          );
        }
        promotionLine.endDate = endDate;
      }

      const promotionLineCouponCodeExist = await this.findOnePromotionLine({
        where: { couponCode },
        other: { withDeleted: true },
      });
      if (promotionLineCouponCodeExist) {
        throw new BadRequestException(
          'PROMOTION_LINE_COUPON_CODE_ALREADY_EXIST',
        );
      }
      promotionLine.couponCode = couponCode;

      promotionLine.createdBy = adminId;
      promotionLine.applyAll = isAllTrip || false;

      savePromotionLine = await this.promotionLineRepository.save(
        promotionLine,
      );

      let promotionDetail: PromotionDetail;
      if (type === PromotionTypeEnum.PRODUCT_DISCOUNT && productDiscount) {
        promotionDetail = await this.validProductDiscount(
          productDiscount,
          savePromotionLine,
        );
      } else if (
        type == PromotionTypeEnum.PRODUCT_DISCOUNT_PERCENT &&
        productDiscountPercent
      ) {
        promotionDetail = await this.validProductDiscountPercent(
          productDiscountPercent,
          savePromotionLine,
        );
      } else {
        throw new BadRequestException('PROMOTION_LINE_TYPE_IS_ENUM');
      }

      if (!isAllTrip) {
        if (!tripCode) {
          throw new BadRequestException('TRIP_CODE_IS_REQUIRED');
        }
        const trip = await this.dataSource.getRepository(Trip).findOne({
          where: { code: tripCode },
        });
        if (!trip) {
          throw new BadRequestException('TRIP_NOT_FOUND');
        }
        promotionDetail.trip = trip;
      }

      promotionDetail.promotionLineCode = savePromotionLine.code;
      savePromotionDetail = await queryRunnerPD.manager.save(promotionDetail);
      if (!savePromotionDetail) {
        throw new BadRequestException('PROMOTION_DETAIL_NOT_CREATED');
      }
      await queryRunnerPD.commitTransaction();

      delete savePromotionLine.promotion;
      delete savePromotionDetail.promotionLine;
      delete savePromotionDetail.deletedAt;

      savePromotionLine.promotionDetail = savePromotionDetail;
      const newSavePromotionLine = await queryRunnerPL.manager.save(
        savePromotionLine,
      );
      await queryRunnerPL.commitTransaction();
      return newSavePromotionLine;
    } catch (error) {
      if (savePromotionDetail) {
        await this.promotionDetailRepository.remove(savePromotionDetail);
      }
      await queryRunnerPD.rollbackTransaction();
      await queryRunnerPL.rollbackTransaction();
      return error;
    } finally {
      await queryRunnerPD.release();
      await queryRunnerPL.release();
    }
  }

  async updatePromotionLineByIdOrCode(
    dto: UpdatePromotionLineDto,
    adminId: string,
    id?: string,
    code?: string,
  ) {
    const {
      title,
      description,
      note,
      maxBudget,
      maxQuantity,
      startDate,
      endDate,
      type,
      tripCode,
      productDiscount,
      productDiscountPercent,
    } = dto;
    const adminExist = await this.dataSource.getRepository(Staff).findOne({
      where: { id: adminId },
    });
    if (!adminExist) {
      throw new NotFoundException('USER_NOT_FOUND');
    }
    if (!adminExist.isActive) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }

    if (!id && !code) {
      throw new BadRequestException('ID_OR_CODE_IS_REQUIRED');
    }
    let promotionLine: PromotionLine;
    if (id) {
      promotionLine = await this.findOnePromotionLineById(id, {
        relations: {
          promotion: true,
        },
      });
    } else if (code) {
      promotionLine = await this.findOnePromotionLineByCode(code, {
        relations: {
          promotion: true,
        },
      });
    }
    if (!promotionLine) {
      throw new BadRequestException('PROMOTION_LINE_NOT_FOUND');
    }

    const promotion: Promotion = promotionLine.promotion;
    const currentDate = new MyMoment().startOf('day').toDate();
    if (promotion.endDate < currentDate) {
      throw new BadRequestException('PROMOTION_HAS_EXPIRED');
    }
    if (promotionLine.endDate < currentDate) {
      throw new BadRequestException('PROMOTION_LINE_HAS_EXPIRED');
    }

    if (title) {
      promotionLine.title = title;
    }
    if (description) {
      promotionLine.description = description;
    }
    if (note) {
      promotionLine.note = note;
    }
    if (maxBudget === 0) {
      throw new BadRequestException('MAX_BUDGET_MUST_BE_GREATER_THAN_0');
    }
    if (maxBudget) {
      if (maxBudget <= 0) {
        throw new BadRequestException('MAX_BUDGET_MUST_BE_GREATER_THAN_0');
      }
      if (maxBudget <= promotionLine.useBudget) {
        throw new BadRequestException(
          'MAX_BUDGET_MUST_BE_GREATER_THAN_USED_BUDGET',
        );
      }
      promotionLine.maxBudget = maxBudget;
    }
    if (maxQuantity == 0) {
      throw new BadRequestException('MAX_QUANTITY_MUST_BE_GREATER_THAN_0');
    }
    if (maxQuantity) {
      if (!Number.isInteger(maxQuantity)) {
        throw new BadRequestException('MAX_QUANTITY_MUST_BE_INTEGER');
      }
      if (maxQuantity <= 0) {
        throw new BadRequestException('MAX_QUANTITY_MUST_BE_GREATER_THAN_0');
      }
      if (maxQuantity <= promotionLine.useQuantity) {
        throw new BadRequestException(
          'MAX_QUANTITY_MUST_BE_GREATER_THAN_USED_QUANTITY',
        );
      }
      promotionLine.maxQuantity = maxQuantity;
    }
    switch (type) {
      case PromotionTypeEnum.PRODUCT_DISCOUNT:
      case PromotionTypeEnum.PRODUCT_DISCOUNT_PERCENT:
        promotionLine.type = type;
        break;
      default:
        break;
    }
    // validate start date
    if (startDate) {
      const newStartDate = new MyMoment(startDate).startOf('day').toDate();
      if (newStartDate <= currentDate) {
        throw new BadRequestException('START_DATE_GREATER_THAN_NOW');
      }
      if (newStartDate < promotion.startDate) {
        throw new BadRequestException(
          'START_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_PROMOTION_START_DATE',
        );
      }
      if (newStartDate > promotion.endDate) {
        throw new BadRequestException(
          'START_DATE_MUST_BE_LESS_THAN_OR_EQUAL_TO_PROMOTION_END_DATE',
        );
      }
      if (newStartDate > promotionLine.endDate) {
        throw new BadRequestException(
          'START_DATE_MUST_BE_LESS_THAN_OR_EQUAL_TO_PROMOTION_LINE_END_DATE',
        );
      }
      if (
        promotion.status === PromotionStatusEnum.ACTIVE &&
        promotion.startDate <= currentDate &&
        promotion.endDate >= currentDate
      ) {
        throw new BadRequestException('PROMOTION_IS_ACTIVE_AND_IN_USE', {
          description:
            'Không thể cập nhật ngày bắt đầu khi chương trình khuyến mãi đang được sử dụng',
        });
      }
      promotionLine.startDate = startDate;
    }
    // validate end date
    if (endDate) {
      const newEndDate = new MyMoment(endDate).startOf('day').toDate();
      const newStartDate = new MyMoment(startDate).startOf('day').toDate();
      if (newEndDate < currentDate) {
        throw new BadRequestException(
          'END_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_NOW',
        );
      }
      if (
        (!startDate && newEndDate < promotionLine.startDate) ||
        (startDate && newEndDate < newStartDate)
      ) {
        throw new BadRequestException(
          'END_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_START_DATE',
        );
      }
      if (newEndDate > promotion.endDate) {
        throw new BadRequestException(
          'END_DATE_MUST_BE_LESS_THAN_OR_EQUAL_TO_PROMOTION_END_DATE',
        );
      }

      promotionLine.endDate = endDate;
    }

    promotionLine.updatedBy = adminId;
    // transaction
    const queryRunner =
      this.promotionLineRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const savePromotionLine = await queryRunner.manager.save(promotionLine);
      let promotionDetail: PromotionDetail = promotionLine.promotionDetail;
      if (type && type !== promotionLine.type) {
        if (productDiscount && type === PromotionTypeEnum.PRODUCT_DISCOUNT) {
          promotionDetail = await this.validProductDiscount(
            productDiscount,
            savePromotionLine,
          );
        } else if (
          productDiscountPercent &&
          type == PromotionTypeEnum.PRODUCT_DISCOUNT_PERCENT
        ) {
          promotionDetail = await this.validProductDiscountPercent(
            productDiscountPercent,
            savePromotionLine,
          );
        }
        promotionDetail = await this.promotionDetailRepository.save(
          promotionDetail,
        );
        delete promotionDetail.deletedAt;
        savePromotionLine.promotionDetail = promotionDetail;
      }

      if (tripCode) {
        const trip = await this.dataSource.getRepository(Trip).findOne({
          where: { code: tripCode },
        });
        if (!trip) {
          throw new NotFoundException('TRIP_NOT_FOUND');
        }
        promotionDetail.trip = trip;
        promotionDetail = await this.promotionDetailRepository.save(
          promotionDetail,
        );
        delete promotionDetail.deletedAt;
        savePromotionLine.promotionDetail = promotionDetail;
      }
      await queryRunner.commitTransaction();
      return savePromotionLine;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return error;
    } finally {
      await queryRunner.release();
    }
  }

  async deletePromotionLineByIdOrCode(
    adminId: string,
    id?: string,
    code?: string,
  ) {
    const adminExist = await this.dataSource.getRepository(Staff).findOne({
      where: { id: adminId },
    });
    if (!adminExist) {
      throw new NotFoundException('USER_NOT_FOUND');
    }
    if (!adminExist.isActive) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }

    if (!id && !code) {
      throw new BadRequestException('ID_OR_CODE_IS_REQUIRED');
    }

    let promotionLine: PromotionLine;
    if (id) {
      promotionLine = await this.getPromotionLineById(id, {
        relations: {
          promotion: true,
        },
      });
    } else if (code) {
      promotionLine = await this.getPromotionLineById(code, {
        relations: {
          promotion: true,
        },
      });
    }
    const promotion: Promotion = promotionLine.promotion;
    const currentDate = new MyMoment().startOf('day').toDate();
    if (promotion.endDate < currentDate) {
      throw new BadRequestException('PROMOTION_HAS_EXPIRED');
    }
    if (promotionLine.endDate < currentDate) {
      throw new BadRequestException('PROMOTION_LINE_HAS_EXPIRED');
    }
    promotionLine.updatedBy = adminId;
    promotionLine.deletedAt = new Date();
    const promotionDetail: PromotionDetail = promotionLine.promotionDetail;
    if (promotionDetail) {
      promotionDetail.deletedAt = new Date();
      await this.promotionDetailRepository.save(promotionDetail);
    }
    await this.promotionLineRepository.save(promotionLine);
    return {
      id: promotionLine.id,
      code: promotionLine.code,
      message: 'Xoá thành công',
    };
  }

  async deleteMultiPromotionLineByIdOrCode(
    dto: DeleteMultiPromotionLineDto,
    adminId: string,
    type: DeleteDtoTypeEnum,
  ) {
    const adminExist = await this.dataSource.getRepository(Staff).findOne({
      where: { id: adminId },
    });
    if (!adminExist) {
      throw new NotFoundException('USER_NOT_FOUND');
    }
    if (!adminExist.isActive) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }

    const { list } = dto;
    const newList = await Promise.all(
      list.map(async (data) => {
        let promotionLine: PromotionLine;
        if (!data) {
          return {
            id: type === DeleteDtoTypeEnum.ID ? data : undefined,
            code: type === DeleteDtoTypeEnum.CODE ? data : undefined,
            message: `${type} không được để trống`,
          };
        }
        if (type === DeleteDtoTypeEnum.ID) {
          promotionLine = await this.findOnePromotionLineById(data, {
            relations: {
              promotion: true,
            },
          });
        } else if (type === DeleteDtoTypeEnum.CODE) {
          promotionLine = await this.findOnePromotionLineByCode(data, {
            relations: {
              promotion: true,
            },
          });
        }
        if (!promotionLine) {
          return {
            id: type === DeleteDtoTypeEnum.ID ? data : undefined,
            code: type === DeleteDtoTypeEnum.CODE ? data : undefined,
            message: 'Không tìm thấy khuyến mãi',
          };
        }

        const currentDate = new MyMoment().startOf('day').toDate();
        if (promotionLine.promotion.endDate < currentDate) {
          throw new BadRequestException('PROMOTION_HAS_EXPIRED');
        }
        if (promotionLine.endDate < currentDate) {
          throw new BadRequestException('PROMOTION_LINE_HAS_EXPIRED');
        }
        promotionLine.updatedBy = adminExist.id;
        const promotionDetail: PromotionDetail = promotionLine.promotionDetail;
        if (promotionDetail) {
          promotionDetail.deletedAt = new Date();
          await this.promotionDetailRepository.save(promotionDetail);
        }
        await this.promotionLineRepository.save(promotionLine);
        return {
          id: promotionLine.id,
          code: promotionLine.code,
          message: 'Xoá chương trình khuyến mãi thành công',
        };
      }),
    );
    return newList;
  }
}
