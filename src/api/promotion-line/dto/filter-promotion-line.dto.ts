import { PromotionTypeEnum, SortEnum } from '../../../enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  IsNumber,
  Min,
} from 'class-validator';
import moment from 'moment';
// moment.locale('vi');

export class FilterPromotionLineDto {
  @ApiPropertyOptional({ example: '' })
  @IsString({ message: 'KEYWORDS_IS_STRING' })
  @IsOptional()
  keywords: string;

  @ApiPropertyOptional({ example: moment().format('YYYY-MM-DD') })
  @IsDate({ message: 'START_DATE_IS_DATE' })
  @IsOptional()
  startDate: Date;

  @ApiPropertyOptional({
    example: moment().add(10, 'days').format('YYYY-MM-DD'),
  })
  @IsDate({ message: 'END_DATE_IS_DATE' })
  @IsOptional()
  endDate: Date;

  @ApiPropertyOptional({ example: 100 })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'USE_QUANTITY_IS_NUMBER' },
  )
  @Min(0, { message: 'MIN_USE_QUANTITY_IS_NUMBER' })
  @IsOptional()
  minUseQuantity: number;

  @ApiPropertyOptional({ example: 100 })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'USE_QUANTITY_IS_NUMBER' },
  )
  @Min(0, { message: 'MAX_USE_QUANTITY_IS_NUMBER' })
  @IsOptional()
  maxUseQuantity: number;

  @ApiPropertyOptional({ example: 100 })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'MAX_OF_MAX_QUANTITY_IS_NUMBER' },
  )
  @Min(0, { message: 'MAX_OF_MAX_QUANTITY_MIN_0' })
  @IsOptional()
  maxOfMaxQuantity: number;

  @ApiPropertyOptional({ example: 100 })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'MIN_OF_MAX_QUANTITY_IS_NUMBER' },
  )
  @Min(0, { message: 'MIN_OF_MAX_QUANTITY_MIN_0' })
  @IsOptional()
  minOfMaxQuantity: number;

  @ApiPropertyOptional({ example: 1_000_000 })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 },
    { message: 'MIN_USE_BUDGET_IS_NUMBER' },
  )
  @Min(0, { message: 'MIN_USE_BUDGET_MUST_BE_GREATER_THAN_0' })
  @IsOptional()
  minUseBudget: number;

  @ApiPropertyOptional({ example: 1_000_000 })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 },
    { message: 'MAX_USE_BUDGET_IS_NUMBER' },
  )
  @Min(0, { message: 'MAX_USE_BUDGET_MUST_BE_GREATER_THAN_0' })
  @IsOptional()
  maxUseBudget: number;

  @ApiPropertyOptional({ example: 1_000_000 })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 },
    { message: 'MIN_OF_MAX_BUDGET_IS_NUMBER' },
  )
  @Min(0, { message: 'MIN_OF_MAX_BUDGET_MUST_BE_GREATER_THAN_0' })
  @IsOptional()
  minOfMaxBudget: number;

  @ApiPropertyOptional({ example: 1_000_000 })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 },
    { message: 'MAX_OF_MAX_BUDGET_IS_NUMBER' },
  )
  @Min(0, { message: 'MAX_OF_MAX_BUDGET_MUST_BE_GREATER_THAN_0' })
  @IsOptional()
  maxOfMaxBudget: number;

  @ApiPropertyOptional({ example: '' })
  @IsString({ message: 'PROMOTION_CODE_IS_STRING' })
  @IsOptional()
  promotionCode: string;

  @ApiPropertyOptional({
    example: PromotionTypeEnum.PRODUCT_DISCOUNT_PERCENT,
    enum: [
      '',
      // PromotionTypeEnum.PRODUCT_GIVEAWAYS,
      PromotionTypeEnum.PRODUCT_DISCOUNT_PERCENT,
      PromotionTypeEnum.PRODUCT_DISCOUNT,
    ],
  })
  @IsEnum(PromotionTypeEnum, { message: 'PROMOTION_LINE_TYPE_IS_ENUM' })
  @IsOptional()
  type: PromotionTypeEnum;

  @ApiPropertyOptional({
    example: SortEnum.ASC,
    enum: ['', SortEnum.ASC, SortEnum.DESC],
  })
  @IsEnum(SortEnum, { message: 'SORT_IS_ENUM' })
  @IsOptional()
  sort: SortEnum;
}
