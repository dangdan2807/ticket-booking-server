import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentHistoryStatusEnum, PaymentMethodEnum } from './../../../enums';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import * as moment from 'moment';
// moment.locale('vi');

export class FilterPaymentHistoryDto {
  @ApiPropertyOptional({ example: '' })
  @IsString({ message: 'KEYWORDS_IS_STRING' })
  @IsOptional()
  keywords: string;

  @ApiPropertyOptional({ example: '' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 },
    { message: 'MIN_AMOUNT_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0' },
  )
  @IsOptional()
  minAmount: number;

  @ApiPropertyOptional({ example: '' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 3 },
    { message: 'MAX_AMOUNT_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0' },
  )
  @IsOptional()
  maxAmount: number;

  @ApiPropertyOptional({ example: '' })
  @IsString({ message: 'CUSTOMER_CODE_IS_STRING' })
  @IsOptional()
  customerCode: string;

  @ApiPropertyOptional({ example: '' })
  @IsString({ message: 'STAFF_CODE_IS_STRING' })
  @IsOptional()
  staffCode: string;

  @ApiPropertyOptional({
    example: PaymentHistoryStatusEnum.SUCCESS,
    enum: PaymentHistoryStatusEnum,
  })
  @IsEnum(PaymentHistoryStatusEnum, {
    message: 'PAYMENT_HISTORY_STATUS_IS_ENUM',
  })
  @IsOptional()
  status: PaymentHistoryStatusEnum;

  @ApiPropertyOptional({
    example: PaymentMethodEnum.CASH,
    enum: PaymentMethodEnum,
  })
  @IsEnum(PaymentMethodEnum, { message: 'PAYMENT_METHOD_IS_ENUM' })
  @IsOptional()
  paymentMethod: PaymentMethodEnum;

  @ApiPropertyOptional({
    example: moment().subtract(7, 'days').format('YYYY-MM-DD'),
  })
  @IsDate({ message: 'FROM_DATE_PAYMENT_TIME_IS_DATE' })
  @IsOptional()
  fromDatePaymentTime: Date;

  @ApiPropertyOptional({ example: moment().format('YYYY-MM-DD') })
  @IsDate({ message: 'TO_DATE_PAYMENT_TIME_IS_DATE' })
  @IsOptional()
  toDatePaymentTime: Date;
}
