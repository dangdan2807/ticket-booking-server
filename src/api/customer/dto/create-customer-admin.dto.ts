import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsPhoneNumber,
  IsDate,
  IsNumber,
} from 'class-validator';
import { GenderEnum } from '../../../enums/gender.enum';
import { Length } from 'class-validator';
// import { MyMoment } from './../../../utils';
import * as moment from 'moment';

export class CreateCustomerForAdminDto {
  @ApiPropertyOptional({ example: 'superman@gmail.com' })
  @IsString({ message: 'EMAIL_IS_STRING' })
  @IsEmail({}, { message: 'EMAIL_INVALID' })
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '0354043344' })
  @IsNotEmpty({ message: 'PHONE_IS_REQUIRED' })
  @IsPhoneNumber('VN', { message: 'INVALID_PHONE_NUMBER' })
  @IsString({ message: 'PHONE_IS_STRING' })
  phone: string;

  @ApiProperty({ example: 'superman' })
  @IsNotEmpty({ message: 'FULL_NAME_IS_REQUIRED' })
  @IsString({ message: 'FULL_NAME_MUST_BE_STRING' })
  @MinLength(1, { message: 'FULL_NAME_IS_MIN_LENGTH_1' })
  @MaxLength(255, { message: 'FULL_NAME_IS_MAX_LENGTH_255' })
  fullName: string;

  @ApiProperty({ example: 26914 })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'WARD_CODE_MUST_BE_NUMBER' },
  )
  @IsOptional()
  wardCode?: number;

  @ApiProperty({
    example: 'Demo',
  })
  @IsNotEmpty({ message: 'ADDRESS_IS_REQUIRED' })
  @IsString({ message: 'ADDRESS_MUST_BE_STRING' })
  @Length(1, 255, { message: 'ADDRESS_BETWEEN_1_255_CHARACTERS' })
  address: string;

<<<<<<< Updated upstream
  @ApiPropertyOptional({ example: MyMoment().format('YYYY-MM-DD') })
=======
  @ApiPropertyOptional({ example: moment().format('YYYY-MM-DD') })
>>>>>>> Stashed changes
  @IsDate({ message: 'BIRTHDAY_IS_DATE' })
  @IsOptional()
  birthday?: Date;

  @ApiPropertyOptional({ example: '' })
  @IsString({ message: 'NOTE_IS_STRING' })
  @IsOptional()
  note?: string;

  @ApiPropertyOptional({ example: GenderEnum.OTHER, enum: GenderEnum })
  @IsEnum(GenderEnum, { message: 'GENDER_IS_ENUM' })
  @IsString({ message: 'GENDER_IS_STRING' })
  @IsOptional()
  gender?: GenderEnum;

  @ApiPropertyOptional({ example: 'e80fcd4f-acad-4b04-b862-f66468348bb3' })
  @IsString({ message: 'CUSTOMER_GROUP_ID_IS_STRING' })
  @IsOptional()
  customerGroupId?: string;

  @ApiPropertyOptional({ example: 5514 })
  @IsString({ message: 'CUSTOMER_GROUP_CODE_IS_STRING' })
  @IsOptional()
  customerGroupCode?: string;
}
