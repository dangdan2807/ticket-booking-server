import { OrderRefundStatusEnum, SortEnum } from './../../../enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { MyMoment } from './../../../utils';
// moment.locale('vi');

export class FilterOrderRefundDto {
  @ApiPropertyOptional({ example: 'keywords' })
  @IsString({ message: 'KEYWORDS_IS_STRING' })
  @IsOptional()
  keywords: string;

  @ApiPropertyOptional({ example: '' })
  @IsString({ message: 'CUSTOMER_CODE_IS_STRING' })
  @IsOptional()
  customerCode: string;

  @ApiPropertyOptional({ example: '' })
  @IsString({ message: 'STAFF_CODE_IS_STRING' })
  @IsOptional()
  staffCode: string;

  @ApiPropertyOptional({
    example: [OrderRefundStatusEnum.PENDING, OrderRefundStatusEnum.FINISHED],
    enum: [OrderRefundStatusEnum.PENDING, OrderRefundStatusEnum.FINISHED],
  })
  @IsEnum([OrderRefundStatusEnum.PENDING, OrderRefundStatusEnum.FINISHED], {
    message: 'ORDER_REFUND_STATUS_IS_ENUM',
  })
  @IsOptional()
  status: OrderRefundStatusEnum;

  @ApiPropertyOptional({ example: 0 })
  @IsNumber({}, { message: 'MIN_FINAL_TOTAL_IS_NUMBER' })
  @IsOptional()
  minTotal: number;

  @ApiPropertyOptional({ example: 0 })
  @IsNumber({}, { message: 'MAX_FINAL_TOTAL_IS_NUMBER' })
  @IsOptional()
  maxTotal: number;

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

  @ApiPropertyOptional({ example: SortEnum.ASC, enum: SortEnum })
  @IsString({ message: 'SORT_IS_STRING' })
  @IsEnum(SortEnum, { message: 'SORT_IS_ENUM' })
  @IsOptional()
  sort: SortEnum;
}
