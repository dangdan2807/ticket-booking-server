import { Pagination } from './../../decorator';
import {
  SortEnum,
  DeleteDtoTypeEnum,
  PromotionStatusEnum,
} from './../../enums';
import { IMAGE_REGEX } from './../../utils/regex.util';
import {
  CreatePromotionDto,
  FilterPromotionDto,
  UpdatePromotionDto,
  DeleteMultiPromotionDto,
} from './dto';
import { Promotion, Staff } from './../../database/entities';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import moment from 'moment';
// moment.locale('vi');

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
    private dataSource: DataSource,
  ) {}

  async getPromotionStatusEnum() {
    return {
      dataResult: Object.keys(PromotionStatusEnum).map(
        (key) => PromotionStatusEnum[key],
      ),
    };
  }

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

  async findOnePromotionByCode(code: string, options?: any) {
    if (options) {
      options.where = { code, ...options?.where };
    } else {
      options = { where: { code } };
    }
    return await this.findOnePromotion(options);
  }

  async findOnePromotionById(id: string, options?: any) {
    if (options) {
      options.where = { id, ...options?.where };
    } else {
      options = { where: { id } };
    }
    return await this.findOnePromotion(options);
  }

  async getPromotionById(id: string) {
    const promotion = await this.findOnePromotionById(id);
    if (!promotion) {
      throw new BadRequestException('PROMOTION_NOT_FOUND');
    }
    return promotion;
  }

  async getPromotionByCode(code: string) {
    const promotion = await this.findOnePromotionByCode(code);
    if (!promotion) {
      throw new BadRequestException('PROMOTION_NOT_FOUND');
    }
    return promotion;
  }

  async findAllPromotion(dto: FilterPromotionDto, pagination?: Pagination) {
    const { keywords, startDate, endDate, status, sort } = dto;
    const query = this.promotionRepository.createQueryBuilder('q');

    if (keywords) {
      const newKeywords = keywords.trim();
      const subQuery = this.promotionRepository
        .createQueryBuilder('q2')
        .select('q2.id')
        .where('q2.code LIKE :code', { code: `%${newKeywords}%` })
        .orWhere('q2.name LIKE :name', { name: `%${newKeywords}%` })
        .orWhere(`q2.description LIKE :description`, {
          description: `%${keywords}%`,
        })
        .orWhere('q2.note LIKE :note', { note: `%${newKeywords}%` })
        .getQuery();

      query.andWhere(`q.id in (${subQuery})`, {
        code: `%${newKeywords}%`,
        name: `%${newKeywords}%`,
        description: `%${newKeywords}%`,
        note: `%${newKeywords}%`,
      });
    }
    if (startDate) {
      const newStartDate = moment(startDate).startOf('day').toDate();
      query.andWhere(`q.startDate >= :startDate`, { startDate: newStartDate });
    }
    if (endDate) {
      const newEndDate = moment(endDate).endOf('day').toDate();
      query.andWhere(`q.endDate <= :endDate`, { endDate: newEndDate });
    }
    switch (status) {
      case PromotionStatusEnum.ACTIVE:
      case PromotionStatusEnum.INACTIVE:
        query.andWhere(`q.status = :status`, { status });
        break;
      default:
        break;
    }
    if (sort) {
      query.orderBy(`q.createdAt`, sort);
    } else {
      query.orderBy(`q.createdAt`, SortEnum.DESC);
    }
    const dataResult = await query
      .offset(pagination.skip)
      .limit(pagination.take)
      .getMany();
    const total = await query.clone().getCount();
    return { dataResult, total, pagination };
  }

  async createPromotion(dto: CreatePromotionDto, adminId: string) {
    const { name, description, note, image, startDate, endDate, status, code } =
      dto;
    const adminExist = await this.dataSource
      .getRepository(Staff)
      .findOne({ where: { id: adminId } });
    if (!adminExist) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    if (!adminExist.isActive) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }

    const oldPromotionExist = await this.findOnePromotionByCode(code, {
      withDeleted: true,
    });
    if (oldPromotionExist) {
      throw new BadRequestException('PROMOTION_CODE_EXISTED');
    }

    const promotion = new Promotion();
    promotion.name = name;
    promotion.code = code;
    promotion.description = description;
    promotion.note = note;
    if (image) {
      if (!image.match(IMAGE_REGEX)) {
        throw new BadRequestException('INVALID_IMAGE_URL');
      }
      promotion.image = image;
    }
    if (!startDate) {
      throw new BadRequestException('START_DATE_IS_REQUIRED');
    }
    const currentDate = moment().startOf('day').toDate();
    const newStartDate = moment(startDate).startOf('day').toDate();
    if (newStartDate <= currentDate) {
      throw new BadRequestException('START_DATE_GREATER_THAN_NOW');
    }
    promotion.startDate = newStartDate;

    if (!endDate) {
      throw new BadRequestException('END_DATE_IS_REQUIRED');
    }
    const newEndDate = moment(endDate).startOf('day').toDate();
    if (newStartDate > newEndDate) {
      throw new BadRequestException('START_DATE_MUST_BE_LESS_THAN_END_DATE');
    }
    promotion.endDate = newEndDate;
    switch (status) {
      case PromotionStatusEnum.ACTIVE:
      case PromotionStatusEnum.INACTIVE:
        promotion.status = status;
        break;
      default:
        promotion.status = PromotionStatusEnum.INACTIVE;
        break;
    }

    promotion.createdBy = adminExist.id;
    const savePromotion = await this.promotionRepository.save(promotion);
    delete promotion.deletedAt;
    return savePromotion;
  }

  async updatePromotionByIdOrCode(
    dto: UpdatePromotionDto,
    adminId: string,
    id?: string,
    code?: string,
  ) {
    const { name, description, note, image, startDate, endDate, status } = dto;
    const adminExist = await this.dataSource
      .getRepository(Staff)
      .findOne({ where: { id: adminId } });
    if (!adminExist) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    if (!adminExist.isActive) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }
    if (!id && !code) {
      throw new BadRequestException('ID_OR_CODE_IS_REQUIRED');
    }

    let promotion: Promotion;
    if (id) {
      promotion = await this.findOnePromotionById(id);
    } else {
      promotion = await this.findOnePromotionByCode(code);
    }
    if (!promotion) {
      throw new NotFoundException('PROMOTION_NOT_FOUND');
    }
    const currentDate = moment().startOf('day').toDate();
    if (promotion.endDate < currentDate) {
      throw new BadRequestException('PROMOTION_HAS_EXPIRED');
    }

    if (name) {
      promotion.name = name;
    }
    if (description) {
      promotion.description = description;
    }
    if (note) {
      promotion.note = note;
    }
    if (image) {
      promotion.image = image;
    }
    switch (status) {
      case PromotionStatusEnum.ACTIVE:
      case PromotionStatusEnum.INACTIVE:
        promotion.status = status;
        break;
      default:
        promotion.status = PromotionStatusEnum.ACTIVE;
        break;
    }

    if (startDate) {
      const newStartDate = moment(startDate).startOf('day').toDate();
      if (newStartDate.getTime() === promotion.startDate.getTime()) {
        if (
          promotion.status === PromotionStatusEnum.ACTIVE &&
          promotion.startDate <= currentDate &&
          promotion.endDate >= currentDate
        ) {
          throw new BadRequestException('PROMOTION_IS_ACTIVE_AND_IN_USE', {
            description:
              'Không thể cập nhật ngày bắt đầu khi chương trình khuyến mãi được sử dụng',
          });
        }
        if (startDate <= currentDate) {
          throw new BadRequestException('START_DATE_GREATER_THAN_NOW');
        }
        if (!endDate && startDate > promotion.endDate) {
          throw new BadRequestException(
            'START_DATE_MUST_BE_LESS_THAN_END_DATE',
          );
        }
        promotion.startDate = startDate;
      }
    }
    if (endDate) {
      const newEndDate = moment(endDate).startOf('day').toDate();
      if (newEndDate.getTime() === promotion.startDate.getTime()) {
        if (endDate < currentDate) {
          throw new BadRequestException(
            'END_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_NOW',
          );
        }
        if (
          (!startDate && promotion.startDate > endDate) ||
          (startDate && startDate > endDate)
        ) {
          throw new BadRequestException(
            'START_DATE_MUST_BE_LESS_THAN_END_DATE',
          );
        }
        promotion.endDate = endDate;
      }
    }

    promotion.updatedBy = adminExist.id;
    const savePromotion = await this.promotionRepository.save(promotion);
    delete promotion.deletedAt;
    return savePromotion;
  }

  async deletePromotionByIdOrCode(adminId: string, id?: string, code?: string) {
    const adminExist = await this.dataSource
      .getRepository(Staff)
      .findOne({ where: { id: adminId } });
    if (!adminExist) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    if (!adminExist.isActive) {
      throw new BadRequestException('USER_NOT_ACTIVE');
    }
    if (!id && !code) {
      throw new BadRequestException('ID_OR_CODE_IS_REQUIRED');
    }
    let promotion: Promotion;
    if (id) {
      promotion = await this.findOnePromotionById(id);
    } else {
      promotion = await this.findOnePromotionByCode(code);
    }
    if (!promotion) {
      throw new NotFoundException('PROMOTION_NOT_FOUND');
    }
    const currentDate = moment().startOf('day').toDate();
    if (promotion.endDate < currentDate) {
      throw new BadRequestException('PROMOTION_HAS_EXPIRED');
    }

    promotion.deletedAt = new Date();
    promotion.updatedBy = adminExist.id;
    return await this.promotionRepository.save(promotion);
  }

  async deleteMultiplePromotionByIdsOrCodes(
    dto: DeleteMultiPromotionDto,
    adminId: string,
    type: DeleteDtoTypeEnum,
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
    const { list: data } = dto;

    const list = await Promise.all(
      data.map(async (data) => {
        if (!data) {
          return {
            id: type === DeleteDtoTypeEnum.ID ? data : undefined,
            code: type === DeleteDtoTypeEnum.CODE ? data : undefined,
            message: `${type} không được để trống`,
          };
        }
        let promotion: Promotion;
        if (type === DeleteDtoTypeEnum.ID) {
          promotion = await this.findOnePromotionById(data);
        } else {
          promotion = await this.findOnePromotionByCode(data);
        }
        if (!promotion) {
          return {
            id: type === DeleteDtoTypeEnum.ID ? data : undefined,
            code: type === DeleteDtoTypeEnum.CODE ? data : undefined,
            message: 'Không tìm thấy chương trình khuyến mãi',
          };
        }
        const currentDate = moment().startOf('day').toDate();
        if (promotion.endDate < currentDate) {
          return {
            id: type === DeleteDtoTypeEnum.ID ? data : undefined,
            code: type === DeleteDtoTypeEnum.CODE ? data : undefined,
            message: 'Chương trình khuyến mãi đã hết hạn không thể xoá',
          };
        }
        promotion.updatedBy = adminExist.id;
        promotion.deletedAt = new Date();
        const savePromotion = await this.promotionRepository.save(promotion);
        return {
          id: savePromotion.id,
          code: savePromotion.code,
          message: 'Xoá chương trình khuyến mãi thành công',
        };
      }),
    );
    return list;
  }
}
