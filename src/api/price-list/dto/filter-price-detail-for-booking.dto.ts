import { VehicleTypeEnum } from '../../../enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsEnum,
  IsDate,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import moment from 'moment';
// moment.locale('vi');

export class FilterPriceDetailForBookingDto {
  @ApiPropertyOptional({ example: moment().format('YYYY-MM-DD') })
  @IsDate({ message: 'APPLY_DATE_IS_DATE' })
  @IsOptional()
  applyDate: Date;

  @ApiPropertyOptional({ example: 'MDBL' })
  @IsString({ message: 'TRIP_CODE_IS_STRING' })
  @IsOptional()
  tripCode: string;

  @ApiPropertyOptional({ example: 'GGGG' })
  @IsString({ message: 'TRIP_DETAIL_CODE_IS_STRING' })
  @IsOptional()
  tripDetailCode: string;

  @ApiProperty({
    example: VehicleTypeEnum.LIMOUSINE,
    enum: [
      '',
      VehicleTypeEnum.LIMOUSINE,
      VehicleTypeEnum.SLEEPER_BUS,
      VehicleTypeEnum.SEAT_BUS,
    ],
  })
  @IsEnum(
    [
      '',
      VehicleTypeEnum.LIMOUSINE,
      VehicleTypeEnum.SLEEPER_BUS,
      VehicleTypeEnum.SEAT_BUS,
    ],
    { message: 'SEAT_TYPE_IS_ENUM' },
  )
  @IsNotEmpty({ message: 'SEAT_TYPE_IS_REQUIRED' })
  seatType: string;
}
