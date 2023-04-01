import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatusEnum } from './../../../enums';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CreateOrderDto {
  @ApiPropertyOptional({ example: '' })
  @IsString({ message: 'NOTE_IS_STRING' })
  @IsOptional()
  note: string;

  @ApiPropertyOptional({
    example: OrderStatusEnum.UNPAID,
    enum: OrderStatusEnum,
  })
  @IsString({ message: 'ORDER_STATUS_IS_STRING' })
  @IsEnum(OrderStatusEnum, { message: 'ORDER_STATUS_IS_ENUM' })
  @IsOptional()
  status: OrderStatusEnum;

  @ApiPropertyOptional({
    example: [
      '7b1e022a-96da-47c5-85b6-81858fd0f601',
      '7b1e022a-96da-47c5-85b6-81858fd0f602',
    ],
  })
  @IsArray({ message: 'SEAT_IDS_IS_ARRAY' })
  @IsOptional()
  seatIds: string[];

  @ApiPropertyOptional({ example: ['XGNL2A2', 'XGNL2A3'] })
  @IsArray({ message: 'SEAT_CODES_IS_ARRAY' })
  @IsOptional()
  seatCodes: string[];

  @ApiProperty({ example: 'GGGG' })
  @IsNotEmpty({ message: 'TRIP_DETAIL_CODE_REQUIRED' })
  @IsString({ message: 'TRIP_DETAIL_CODE_IS_STRING' })
  @Length(1, 100, { message: 'TRIP_DETAIL_CODE_BETWEEN_1_AND_100_CHARACTERS' })
  tripDetailCode: string;
}
