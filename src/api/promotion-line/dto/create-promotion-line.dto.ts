import { PromotionTypeEnum } from './../../../enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
  IsEnum,
  IsDate,
  MinDate,
  IsNumber,
  Min,
  IsInt,
  ValidateNested,
  ValidateIf,
} from 'class-validator';
import {
  ProductDiscountDto,
  ProductDiscountPercentDto,
} from './promotion-type.dto';
import { MyMoment } from './../../../utils';

export class CreatePromotionLineDto {
  @ApiProperty({ example: 'KM1' })
  @IsNotEmpty({ message: 'CODE_IS_REQUIRED' })
  @IsString({ message: 'CODE_IS_STRING' })
  @Length(1, 100, { message: 'CODE_BETWEEN_1_100_CHARACTERS' })
  code: string;

  @ApiProperty({ example: 'Khuyến mãi tháng 4/2023' })
  @IsNotEmpty({ message: 'TITLE_IS_REQUIRED' })
  @IsString({ message: 'TITLE_IS_STRING' })
  @Length(1, 100, { message: 'TITLE_LENGTH' })
  title: string;

  @ApiProperty({ example: 'Khuyến mãi tháng 4/2023' })
  @IsNotEmpty({ message: 'DESCRIPTION_IS_REQUIRED' })
  @IsString({ message: 'DESCRIPTION_IS_STRING' })
  @Length(0, 1000, { message: 'DESCRIPTION_BETWEEN_1_1000_CHARACTERS' })
  description: string;

  @ApiPropertyOptional({ example: '' })
  @IsString({ message: 'NOTE_IS_STRING' })
  @IsOptional()
  note: string;

  @ApiProperty({ example: 'KM1' })
  @IsNotEmpty({ message: 'COUPON_CODE_IS_REQUIRED' })
  @IsString({ message: 'COUPON_CODE_IS_STRING' })
  @Length(1, 100, { message: 'COUPON_CODE_BETWEEN_1_100_CHARACTERS' })
  couponCode: string;

  @ApiProperty({ example: 'MDBL' })
  @IsNotEmpty({ message: 'TRIP_CODE_IS_REQUIRED' })
  @IsString({ message: 'TRIP_CODE_IS_STRING' })
  @Length(1, 100, { message: 'TRIP_CODE_BETWEEN_1_100_CHARACTERS' })
  tripCode: string;

  @ApiPropertyOptional({
    example: new MyMoment().add(1, 'days').format('YYYY-MM-DD'),
  })
  @IsDate({ message: 'START_DATE_IS_DATE' })
  @MinDate(new Date(new MyMoment().format('YYYY-MM-DD')), {
    message: 'START_DATE_GREATER_THAN_NOW',
  })
  @IsOptional()
  startDate: Date;

  @ApiPropertyOptional({
    example: new MyMoment().add(10, 'days').format('YYYY-MM-DD'),
  })
  @IsDate({ message: 'END_DATE_IS_DATE' })
  @MinDate(new Date(new MyMoment().format('YYYY-MM-DD')), {
    message: 'END_DATE_GREATER_THAN_NOW',
  })
  @IsOptional()
  endDate: Date;

  @ApiProperty({ example: 100 })
  @IsNotEmpty({ message: 'MAX_QUANTITY_IS_REQUIRED' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'MAX_QUANTITY_IS_NUMBER' },
  )
  @Min(1, { message: 'MAX_QUANTITY_MIN_1' })
  @IsInt({ message: 'MAX_QUANTITY_MUST_BE_INTEGER' })
  maxQuantity: number;

  @ApiProperty({ example: 1_000_000 })
  @IsNotEmpty({ message: 'MAX_BUDGET_IS_REQUIRED' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 },
    { message: 'MAX_BUDGET_IS_NUMBER' },
  )
  @Min(0, { message: 'MAX_BUDGET_MUST_BE_GREATER_THAN_0' })
  maxBudget: number;

  @ApiProperty({ example: 'KM11' })
  @IsNotEmpty({ message: 'PROMOTION_CODE_IS_REQUIRED' })
  @IsString({ message: 'PROMOTION_CODE_IS_STRING' })
  @Length(1, 100, { message: 'PROMOTION_CODE_BETWEEN_1_100_CHARACTERS' })
  promotionCode: string;

  @ApiProperty({
    example: PromotionTypeEnum.PRODUCT_DISCOUNT_PERCENT,
    enum: PromotionTypeEnum,
  })
  @IsNotEmpty({ message: 'PROMOTION_LINE_TYPE_IS_REQUIRED' })
  @IsEnum(PromotionTypeEnum, { message: 'PROMOTION_LINE_TYPE_IS_ENUM' })
  type: PromotionTypeEnum;

  // promotion detail
  @ApiProperty({ type: ProductDiscountDto })
  @ValidateIf(
    (dto: CreatePromotionLineDto) =>
      dto.type === PromotionTypeEnum.PRODUCT_DISCOUNT,
  )
  @ValidateNested()
  @Type(() => ProductDiscountDto)
  productDiscount?: ProductDiscountDto;

  @ApiProperty({ type: ProductDiscountPercentDto })
  @ValidateIf(
    (dto: CreatePromotionLineDto) =>
      dto.type === PromotionTypeEnum.PRODUCT_DISCOUNT_PERCENT,
  )
  @ValidateNested()
  @Type(() => ProductDiscountPercentDto)
  productDiscountPercent?: ProductDiscountPercentDto;
}
