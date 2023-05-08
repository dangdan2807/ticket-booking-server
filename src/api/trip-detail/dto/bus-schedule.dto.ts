import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TripDetailStatusEnum } from './../../../enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MyMoment } from './../../../utils';

export class BusScheduleDto {
  @ApiProperty({ example: new MyMoment().startOf('isoWeek').format('YYYY-MM-DD HH:mm') })
  @IsNotEmpty({ message: 'START_DATE_IS_REQUIRED' })
  @IsDate({ message: 'INVALID_DATE' })
  startDate: Date;

  @ApiProperty({ example: new MyMoment().endOf('isoWeek').format('YYYY-MM-DD HH:mm') })
  @IsNotEmpty({ message: 'END_DATE_IS_REQUIRED' })
  @IsDate({ message: 'INVALID_DATE' })
  endDate: Date;

  @ApiPropertyOptional({
    example: TripDetailStatusEnum.NOT_SOLD_OUT,
    enum: [
      '',
      TripDetailStatusEnum.NOT_SOLD_OUT,
      TripDetailStatusEnum.SOLD_OUT,
    ],
  })
  @IsEnum(
    ['', TripDetailStatusEnum.NOT_SOLD_OUT, TripDetailStatusEnum.SOLD_OUT],
    { message: 'INVALID_TRIP_DETAIL_STATUS' },
  )
  @IsOptional()
  status: string;

  @ApiPropertyOptional({ example: '' })
  @IsString({ message: 'TRIP_CODE_IS_STRING' })
  @IsOptional()
  tripCode: string;
}
