import { PromotionTypeEnum } from '../../../enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  MinDate,
  IsNumber,
  IsNotEmpty,
  Length,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import * as moment from 'moment';
import {
  ProductDiscountDto,
  ProductDiscountPercentDto,
  ProductGiveawayDto,
} from '.';
moment.locale('vi');

export class UpdatePromotionLineDto {
  @ApiPropertyOptional({ example: '' })
  @IsString({ message: 'TITLE_IS_STRING' })
  @IsOptional()
  title: string;

  @ApiPropertyOptional({ example: 'Chương trình khuyến mãi tháng 3/2023' })
  @IsString({ message: 'DESCRIPTION_IS_STRING' })
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ example: '' })
  @IsString({ message: 'NOTE_IS_STRING' })
  @IsOptional()
  note: string;

  @ApiPropertyOptional({ example: '' })
  @IsString({ message: 'COUPON_CODE_IS_STRING' })
  @IsOptional()
  couponCode: string;

  @ApiPropertyOptional({ example: moment().format('YYYY-MM-DD') })
  @IsDate({ message: 'START_DATE_IS_DATE' })
  @MinDate(new Date(moment().format('YYYY-MM-DD')), {
    message: 'START_DATE_GREATER_THAN_NOW',
  })
  @IsOptional()
  startDate: Date;

  @ApiPropertyOptional({
    example: moment().add(10, 'days').format('YYYY-MM-DD'),
  })
  @IsDate({ message: 'END_DATE_IS_DATE' })
  @MinDate(new Date(moment().format('YYYY-MM-DD')), {
    message: 'END_DATE_GREATER_THAN_NOW',
  })
  @IsOptional()
  endDate: Date;

  @ApiPropertyOptional({ example: 100 })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'MAX_QUANTITY_IS_NUMBER' },
  )
  @IsOptional()
  maxQuantity: number;

  @ApiPropertyOptional({ example: 100 })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'MAX_QUANTITY_PER_CUSTOMER_IS_NUMBER' },
  )
  @IsOptional()
  maxQuantityPerCustomer: number;

  @ApiPropertyOptional({ example: 1_000_000 })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 },
    { message: 'BUDGET_IS_NUMBER' },
  )
  @IsOptional()
  maxBudget: number;

  @ApiPropertyOptional({
    example: PromotionTypeEnum.PRODUCT_DISCOUNT_PERCENT,
    enum: PromotionTypeEnum,
  })
  @IsString({ message: 'PROMOTION_LINE_TYPE_IS_STRING' })
  @IsEnum(PromotionTypeEnum, { message: 'PROMOTION_LINE_TYPE_IS_ENUM' })
  @IsOptional()
  type: PromotionTypeEnum;

  // promotion detail
  @ApiProperty({ example: '' })
  @IsNotEmpty({ message: 'TICKET_GROUP_CODE_IS_REQUIRED' })
  @IsString({ message: 'TICKET_GROUP_CODE_MUST_BE_STRING' })
  @Length(1, 100, { message: 'TICKET_GROUP_CODE_MUST_BE_BETWEEN_1_AND_100' })
  ticketGroupCode: string;

  @ApiProperty({ type: ProductDiscountDto })
  @ValidateIf(
    (dto: UpdatePromotionLineDto) =>
      dto.type === PromotionTypeEnum.PRODUCT_DISCOUNT,
  )
  @ValidateNested()
  @Type(() => ProductDiscountDto)
  productDiscount?: ProductDiscountDto;

  @ApiProperty({ type: ProductDiscountPercentDto })
  @ValidateIf(
    (dto: UpdatePromotionLineDto) =>
      dto.type === PromotionTypeEnum.PRODUCT_DISCOUNT_PERCENT,
  )
  @ValidateNested()
  @Type(() => ProductDiscountPercentDto)
  productDiscountPercent?: ProductDiscountPercentDto;

  @ApiProperty({ type: ProductGiveawayDto })
  @ValidateIf(
    (dto: UpdatePromotionLineDto) =>
      dto.type === PromotionTypeEnum.PRODUCT_GIVEAWAYS,
  )
  @ValidateNested()
  @Type(() => ProductGiveawayDto)
  productGiveaway?: ProductGiveawayDto;
}