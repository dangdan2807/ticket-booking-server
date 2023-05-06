import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  Min,
} from 'class-validator';
import { SortEnum, TripDetailStatusEnum } from './../../../enums';
import moment from 'moment';
// moment.locale('vi');

export class FilterTripDetailDto {
  @ApiPropertyOptional({ example: moment().format('YYYY-MM-DD HH:mm') })
  @IsDate({ message: 'INVALID_DATE' })
  @IsOptional()
  minDepartureTime: Date;

  @ApiPropertyOptional({ example: moment().format('YYYY-MM-DD HH:mm') })
  @IsDate({ message: 'INVALID_DATE' })
  @IsOptional()
  departureTime: Date;

  @ApiPropertyOptional({ example: moment().format('YYYY-MM-DD HH:mm') })
  @IsDate({ message: 'INVALID_DATE' })
  @IsOptional()
  maxDepartureTime: Date;

  @ApiPropertyOptional({
    example: TripDetailStatusEnum.NOT_SOLD_OUT,
    enum: [
      '',
      TripDetailStatusEnum.NOT_SOLD_OUT,
      TripDetailStatusEnum.SOLD_OUT,
    ],
  })
  @IsOptional()
  @IsString({ message: 'INVALID_STRING' })
  @IsEnum(
    ['', TripDetailStatusEnum.NOT_SOLD_OUT, TripDetailStatusEnum.SOLD_OUT],
    { message: 'INVALID_TRIP_DETAIL_STATUS' },
  )
  status: string;

  @ApiPropertyOptional({ example: '59464f9b-0be3-4929-b1ea-d2aa80c21a6a' })
  @IsOptional()
  @IsString({ message: 'TRIP_ID_IS_STRING' })
  tripId: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsString({ message: 'TRIP_CODE_IS_STRING' })
  tripCode: string;

  @ApiPropertyOptional({ example: 79 })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 0,
    },
    { message: 'FROM_PROVINCE_CODE_INVALID_NUMBER' },
  )
  @Min(0, { message: 'FROM_PROVINCE_CODE_GREATER_THAN_OR_EQUAL_TO_0' })
  @IsOptional()
  fromProvinceCode: number;

  @ApiPropertyOptional({ example: 68 })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: 0,
    },
    { message: 'TO_PROVINCE_CODE_INVALID_NUMBER' },
  )
  @Min(0, { message: 'TO_PROVINCE_CODE_GREATER_THAN_OR_EQUAL_TO_0' })
  @IsOptional()
  toProvinceCode: number;

  @ApiPropertyOptional({ example: SortEnum.ASC, enum: SortEnum })
  @IsString({ message: 'SORT_IS_STRING' })
  @IsEnum(SortEnum, { message: 'SORT_IS_ENUM' })
  @IsOptional()
  sort: SortEnum;
}
