import { OrderStatusEnum, SortEnum } from '../../../enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import * as moment from 'moment';
moment.locale('vi');

export class FilterAllDto {
  @ApiPropertyOptional({ example: 'Bảng giá tháng 3/2023' })
  @IsString({ message: 'KEYWORDS_IS_STRING' })
  @IsOptional()
  keywords: string;

  @ApiPropertyOptional({
    example: [OrderStatusEnum.UNPAID, OrderStatusEnum.CANCEL],
    enum: [
      '',
      OrderStatusEnum.UNPAID,
      OrderStatusEnum.CANCEL,
      OrderStatusEnum.PAID,
      OrderStatusEnum.RETURNED,
    ],
  })
  @IsString({ message: 'ORDER_STATUS_IS_STRING' })
  @IsEnum(
    [
      '',
      OrderStatusEnum.UNPAID,
      OrderStatusEnum.CANCEL,
      OrderStatusEnum.PAID,
      OrderStatusEnum.RETURNED,
    ],
    {
      message: 'ORDER_STATUS_IS_ENUM',
    },
  )
  @IsOptional()
  status: OrderStatusEnum[];

  @ApiPropertyOptional({ example: 0 })
  @IsNumber({}, { message: 'MIN_FINAL_TOTAL_IS_NUMBER' })
  @IsOptional()
  minFinalTotal: number;

  @ApiPropertyOptional({ example: 0 })
  @IsNumber({}, { message: 'MAX_FINAL_TOTAL_IS_NUMBER' })
  @IsOptional()
  maxFinalTotal: number;

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

  @ApiPropertyOptional({ example: SortEnum.ASC, enum: SortEnum })
  @IsString({ message: 'SORT_IS_STRING' })
  @IsEnum(SortEnum, { message: 'SORT_IS_ENUM' })
  @IsOptional()
  sort: SortEnum;
}
