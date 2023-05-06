import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GenderEnum } from '../../../enums';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsPhoneNumber,
  IsNumber,
} from 'class-validator';
import moment from 'moment';

export class CustomerRegisterDto {
  @ApiPropertyOptional({ example: 'superman@gmail.com' })
  @IsString({ message: 'EMAIL_IS_STRING' })
  @MinLength(6, { message: 'EMAIL_LENGTH' })
  @MaxLength(100, { message: 'EMAIL_LENGTH' })
  @IsEmail({}, { message: 'EMAIL_INVALID' })
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '0354043344' })
  @IsNotEmpty({ message: 'PHONE_IS_REQUIRED' })
  @IsPhoneNumber('VN', { message: 'INVALID_PHONE_NUMBER' })
  @IsString({ message: 'PHONE_IS_STRING' })
  phone: string;

  @ApiProperty({ example: '12345678' })
  @IsNotEmpty({ message: 'PASSWORD_IS_REQUIRED' })
  @IsString({ message: 'PASSWORD_IS_STRING' })
  @MinLength(6, { message: 'PASSWORD_IS_MIN_LENGTH_6' })
  @MaxLength(255, { message: 'PASSWORD_IS_MAX_LENGTH_255' })
  password: string;

  @ApiProperty({ example: 'superman' })
  @IsNotEmpty({ message: 'FULL_NAME_IS_REQUIRED' })
  @IsString({ message: 'FULL_NAME_MUST_BE_STRING' })
  @MinLength(1, { message: 'FULL_NAME_IS_MIN_LENGTH_1' })
  @MaxLength(255, { message: 'FULL_NAME_IS_MAX_LENGTH_255' })
  fullName: string;

  @ApiPropertyOptional({ example: moment().subtract(18, 'years').toDate() })
  @IsDate({ message: 'BIRTHDAY_IS_DATE' })
  @IsOptional()
  birthday?: Date;

  @ApiPropertyOptional({ example: GenderEnum.OTHER, enum: GenderEnum })
  @IsEnum(['', GenderEnum.MALE, GenderEnum.FEMALE, GenderEnum.OTHER], {
    message: 'GENDER_IS_ENUM',
  })
  @IsString({ message: 'GENDER_IS_STRING' })
  @IsOptional()
  gender?: GenderEnum;

  @ApiPropertyOptional({
    example: 'Demo',
  })
  @IsString({ message: 'ADDRESS_MUST_BE_STRING' })
  @IsOptional()
  address: string;

  @ApiPropertyOptional({ example: 26914 })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'WARD_CODE_MUST_BE_NUMBER' },
  )
  @IsOptional()
  wardCode?: number;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  isOtp: boolean;
}
