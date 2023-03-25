import { PromotionStatusEnum } from '../../../enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsDate, MinDate } from 'class-validator';

export class UpdatePromotionDto {
  @ApiPropertyOptional({ example: 'Chương trình khuyến mãi tháng 3/2023' })
  @IsString({ message: 'NAME_IS_STRING' })
  @IsOptional()
  name: string;

  @ApiPropertyOptional({ example: 'Chương trình khuyến mãi tháng 3/2023' })
  @IsString({ message: 'DESCRIPTION_IS_STRING' })
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ example: '' })
  @IsString({ message: 'NOTE_IS_STRING' })
  @IsOptional()
  note: string;

  @ApiPropertyOptional({ example: '' })
  @IsString({ message: 'IMAGE_IS_STRING' })
  @IsOptional()
  image: string;

  @ApiPropertyOptional({ example: '2023-03-01' })
  @IsDate({ message: 'START_DATE_IS_DATE' })
  @MinDate(new Date(`${new Date().toDateString()}`), {
    message: 'START_DATE_GREATER_THAN_NOW',
  })
  @IsOptional()
  startDate: Date;

  @ApiPropertyOptional({ example: '2023-03-31' })
  @IsDate({ message: 'END_DATE_IS_DATE' })
  @MinDate(new Date(`${new Date().toDateString()}`), {
    message: 'END_DATE_GREATER_THAN_NOW',
  })
  @IsOptional()
  endDate: Date;

  @ApiPropertyOptional({
    example: PromotionStatusEnum.ACTIVE,
    enum: PromotionStatusEnum,
  })
  @IsString({ message: 'PROMOTION_STATUS_IS_STRING' })
  @IsEnum(PromotionStatusEnum, { message: 'PROMOTION_STATUS_INVALID' })
  @IsOptional()
  status: PromotionStatusEnum;
}