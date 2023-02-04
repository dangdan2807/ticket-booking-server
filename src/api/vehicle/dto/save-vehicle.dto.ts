import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  Max,
  IsOptional,
  IsEnum,
  Length,
} from 'class-validator';
import { VehicleType } from 'src/enums/vehicle-type.enum';

export class SaveVehicleDto {
  @ApiProperty({ example: 'Xe giường nằm Limousine số 1' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name is string' })
  @Length(1, 100, { message: 'Name must be between 1 and 100 characters' })
  name: string;

  @ApiProperty({ example: 'Xe giường nằm Limousine số 1, 22 chỗ, phòng đôi' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 1000, { message: 'Name must be between 1 and 1000 characters' })
  description: string;

  @ApiProperty({ example: VehicleType.SLEEPER_BUS })
  @IsOptional()
  @IsString()
  @IsEnum(VehicleType)
  type: string;

  @ApiProperty({
    example: 'https://static.vexere.com/production/images/1582630998582.jpeg',
  })
  @IsOptional()
  @IsString()
  images: string[];

  @ApiProperty({ example: '51A-111.11' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 20, { message: 'Name must be between 1 and 20 characters' })
  licensePlate: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(2)
  floorNumber: number;

  @ApiProperty({ example: 22 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(50)
  totalSeat: number;
}