import { PromotionStatusEnum, SortEnum } from '../../../enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsDate } from 'class-validator';
import { MyMoment } from './../../../utils';

export class FilterPromotionDto {
  @ApiPropertyOptional({ example: 'KM1' })
  @IsString({ message: 'CODE_IS_STRING' })
  @IsOptional()
  keywords: string;

  @ApiPropertyOptional({ example: new MyMoment().format('YYYY-MM-DD') })
  @IsDate({ message: 'START_DATE_IS_DATE' })
  @IsOptional()
  startDate: Date;

  @ApiPropertyOptional({
    example: new MyMoment().add(10, 'days').format('YYYY-MM-DD'),
  })
  @IsDate({ message: 'END_DATE_IS_DATE' })
  @IsOptional()
  endDate: Date;

  @ApiPropertyOptional({
    example: PromotionStatusEnum.ACTIVE,
    enum: ['', PromotionStatusEnum.ACTIVE, PromotionStatusEnum.INACTIVE],
  })
  @IsEnum(['', PromotionStatusEnum.ACTIVE, PromotionStatusEnum.INACTIVE], {
    message: 'PROMOTION_STATUS_IS_ENUM',
  })
  @IsOptional()
  status: PromotionStatusEnum;

  @ApiPropertyOptional({
    example: SortEnum.ASC,
    enum: ['', SortEnum.ASC, SortEnum.DESC],
  })
  @IsEnum(SortEnum, { message: 'SORT_IS_ENUM' })
  @IsOptional()
  sort: SortEnum;
}
