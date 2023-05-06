import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import moment from 'moment';
// moment.locale('vi');

export class FilterAvailablePromotionLineDto {
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

  @ApiProperty({ example: '' })
  @IsNotEmpty({ message: 'TRIP_CODE_IS_REQUIRED' })
  @IsString({ message: 'TRIP_CODE_IS_STRING' })
  @Length(1, 100, { message: 'TRIP_CODE_BETWEEN_1_100_CHARACTERS' })
  tripCode: string;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 },
    { message: 'MIN_QUANTITY_BUY_IS_NUMBER' },
  )
  @IsOptional()
  minQuantityBuy: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 },
    { message: 'MIN_PURCHASE_AMOUNT_IS_NUMBER' },
  )
  @IsOptional()
  minPurchaseAmount: number;
}
