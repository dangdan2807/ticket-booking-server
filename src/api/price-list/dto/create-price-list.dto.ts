import { ActiveStatusEnum } from './../../../enums/active-status.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
  IsEnum,
  IsDate,
} from 'class-validator';
import * as moment from 'moment';
// moment.locale('vi');

export class CreatePriceListDto {
  @ApiProperty({ example: 'BGT32023' })
  @IsNotEmpty({ message: 'CODE_IS_REQUIRED' })
  @IsString({ message: 'CODE_IS_STRING' })
  @Length(1, 100, { message: 'CODE_BETWEEN_1_100_CHARACTERS' })
  code: string;

  @ApiProperty({ example: 'Bảng giá tháng 3/2023' })
  @IsNotEmpty({ message: 'NAME_IS_REQUIRED' })
  @IsString({ message: 'NAME_IS_STRING' })
  @Length(1, 100, { message: 'NAME_LENGTH' })
  name: string;

  @ApiProperty({
    example: moment().add(1, 'days').format('YYYY-MM-DD'),
  })
  @IsNotEmpty({ message: 'START_DATE_IS_REQUIRED' })
  @IsDate({ message: 'START_DATE_IS_DATE' })
  startDate: Date;

  @ApiProperty({
    example: moment().add(10, 'days').format('YYYY-MM-DD'),
  })
  @IsNotEmpty({ message: 'START_DATE_IS_REQUIRED' })
  @IsDate({ message: 'END_DATE_IS_DATE' })
  endDate: Date;

  @ApiPropertyOptional({ example: 'Bảng giá tháng 3/2023' })
  @IsString({ message: 'NOTE_IS_STRING' })
  @IsOptional()
  note: string;

  @ApiPropertyOptional({
    example: ActiveStatusEnum.ACTIVE,
    enum: ActiveStatusEnum,
  })
  @IsString({ message: 'PRICE_LIST_STATUS_IS_STRING' })
  @IsEnum(ActiveStatusEnum, { message: 'PRICE_LIST_STATUS_INVALID' })
  @IsOptional()
  status: ActiveStatusEnum;
}
