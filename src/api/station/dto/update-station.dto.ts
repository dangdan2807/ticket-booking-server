import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  Length,
} from 'class-validator';
import { ImageResource } from '../../../database/entities';

export class UpdateStationDto {
  @ApiPropertyOptional({ example: 'Bến xe Demo' })
  @IsOptional()
  @IsString({ message: 'NAME_IS_STRING' })
  @Length(1, 100, { message: 'NAME_BETWEEN_1_100_CHARACTERS' })
  name: string;

  @ApiPropertyOptional({
    example: 'Demo, Phường 26, Bình Thạnh, Thành phố Hồ Chí Minh',
  })
  @IsOptional()
  @IsString({ message: 'ADDRESS_IS_STRING' })
  @Length(1, 255, { message: 'ADDRESS_BETWEEN_1_255_CHARACTERS' })
  address: string;

  @ApiPropertyOptional({
    example: 'SGDM',
  })
  @IsOptional()
  @IsString({ message: 'CODE_IS_STRING' })
  @Length(1, 255, { message: 'CODE_BETWEEN_1_10_CHARACTERS' })
  code: string;

  @ApiPropertyOptional({ example: 26914 })
  @IsOptional()
  @IsNotEmpty({ message: 'WARD_ID_IS_REQUIRED' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'WARD_ID_IS_NUMBER' },
  )
  wardId: number;

  @ApiPropertyOptional({
    example: [
      {
        id: '1',
        url: 'https://res.cloudinary.com/dangdan2807/image/upload/v1668737017/ee0ygsbjvymvyfrugrtp.jpg',
        isDeleted: true,
      },
      {
        url: 'https://res.cloudinary.com/dangdan2807/image/upload/v1668737015/tb7fssdjfjuvn6qcrajy.png',
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @Type(() => ImageResource)
  images?: ImageResource[];
}
