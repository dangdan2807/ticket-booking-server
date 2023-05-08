import { PromotionStatusEnum } from './../../../enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
  IsEnum,
  IsDate,
  MinDate,
} from 'class-validator';
import { MyMoment } from './../../../utils';

export class CreatePromotionDto {
  @ApiProperty({ example: 'KM1' })
  @IsNotEmpty({ message: 'CODE_IS_REQUIRED' })
  @IsString({ message: 'CODE_IS_STRING' })
  @Length(1, 100, { message: 'CODE_BETWEEN_1_100_CHARACTERS' })
  code: string;

  @ApiProperty({ example: 'Chương trình khuyến mãi tháng 3/2023' })
  @IsNotEmpty({ message: 'NAME_IS_REQUIRED' })
  @IsString({ message: 'NAME_IS_STRING' })
  @Length(1, 100, { message: 'NAME_LENGTH' })
  name: string;

  @ApiProperty({ example: 'Chương trình khuyến mãi tháng 3/2023' })
  @IsNotEmpty({ message: 'DESCRIPTION_IS_REQUIRED' })
  @IsString({ message: 'DESCRIPTION_IS_STRING' })
  @Length(0, 1000, { message: 'DESCRIPTION_BETWEEN_1_1000_CHARACTERS' })
  description: string;

  @ApiPropertyOptional({ example: '' })
  @IsString({ message: 'NOTE_IS_STRING' })
  @IsOptional()
  note: string;

  @ApiPropertyOptional({ example: '' })
  @IsString({ message: 'IMAGE_IS_STRING' })
  @IsOptional()
  image: string;

  @ApiProperty({ example: new MyMoment().format('YYYY-MM-DD') })
  @IsNotEmpty({ message: 'START_DATE_IS_REQUIRED' })
  @IsDate({ message: 'START_DATE_IS_DATE' })
  @MinDate(new Date(new MyMoment().format('YYYY-MM-DD')), {
    message: 'START_DATE_GREATER_THAN_NOW',
  })
  startDate: Date;

  @ApiProperty({ example: new MyMoment().add(10, 'days').format('YYYY-MM-DD') })
  @IsNotEmpty({ message: 'START_DATE_IS_REQUIRED' })
  @IsDate({ message: 'END_DATE_IS_DATE' })
  @MinDate(new Date(new MyMoment().add(10, 'days').format('YYYY-MM-DD')), {
    message: 'END_DATE_GREATER_THAN_NOW',
  })
  endDate: Date;

  @ApiPropertyOptional({
    example: PromotionStatusEnum.ACTIVE,
    enum: PromotionStatusEnum,
  })
  @IsString({ message: 'PROMOTION_STATUS_IS_STRING' })
  @IsEnum(PromotionStatusEnum, { message: 'PROMOTION_STATUS_IS_ENUM' })
  @IsOptional()
  status: PromotionStatusEnum;
}
