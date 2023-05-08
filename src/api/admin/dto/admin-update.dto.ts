import { GenderEnum } from './../../../enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { MyMoment } from './../../../utils';

export class AdminUpdateDto {
  @ApiPropertyOptional({ example: 'fullName' })
  @IsString({ message: 'FULL_NAME_MUST_BE_STRING' })
  @IsOptional()
  fullName: string;

  @ApiPropertyOptional({
    example: GenderEnum.MALE,
    enum: ['', GenderEnum.MALE, GenderEnum.FEMALE, GenderEnum.OTHER],
  })
  @IsEnum(['', GenderEnum.MALE, GenderEnum.FEMALE, GenderEnum.OTHER])
  @IsOptional()
  gender: GenderEnum;

  @ApiPropertyOptional({ example: '12345678' })
  @IsString({ message: 'ADDRESS_MUST_BE_STRING' })
  @IsOptional()
  address: string;

  @ApiPropertyOptional({
    example: new MyMoment().subtract(18, 'years').format('YYYY-MM-DD'),
  })
  @IsString({ message: 'BIRTHDAY_MUST_BE_STRING' })
  @IsOptional()
  birthDay: Date;

  @ApiPropertyOptional({ example: '0123456789' })
  @IsString({ message: 'WARD_CODE_MUST_BE_NUMBER' })
  @IsOptional()
  wardCode: string;
}
