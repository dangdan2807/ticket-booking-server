import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import * as moment from 'moment';

export class TicketStatisticsDto {
  @ApiPropertyOptional({ example: '' })
  @IsString({ message: 'KEYWORD_MUST_BE_STRING' })
  @IsOptional()
  keyword: string;

  @ApiPropertyOptional({
    example: moment().subtract(7, 'days').format('YYYY-MM-DD'),
  })
  @IsDate({ message: 'START_DATE_IS_DATE' })
  @IsOptional()
  startDate: Date;

  @ApiPropertyOptional({
    example: moment().format('YYYY-MM-DD'),
  })
  @IsDate({ message: 'END_DATE_IS_DATE' })
  @IsOptional()
  endDate: Date;
}
