import { JwtAuthGuard } from './../../auth/guards';
import { RoleEnum } from './../../enums';
import {
  CurrentUser,
  GetPagination,
  Pagination,
  Roles,
} from './../../decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PromotionLineService } from './promotion-line.service';
import {
  CreatePromotionLineDto,
  FilterPromotionLineDto,
  UpdatePromotionLineDto,
} from './dto';

@Controller('promotion-line')
@ApiTags('Promotion Line')
export class PromotionLineController {
  constructor(private promotionLineService: PromotionLineService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(RoleEnum.STAFF)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createPromotion(
    @Body() dto: CreatePromotionLineDto,
    @CurrentUser() user,
  ) {
    return await this.promotionLineService.createPromotionLine(dto, user.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(RoleEnum.STAFF)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAllPriceList(
    @Query() dto: FilterPromotionLineDto,
    @GetPagination() pagination?: Pagination,
  ) {
    return await this.promotionLineService.findAllPromotionLine(
      dto,
      pagination,
    );
  }

  @Patch('id/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(RoleEnum.STAFF)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async UpdatePromotionLineById(
    @Param('id') id: string,
    @Body() dto: UpdatePromotionLineDto,
    @CurrentUser() user,
  ) {
    return await this.promotionLineService.updatePromotionLineByIdOrCode(
      dto,
      user.id,
      id,
    );
  }

  @Patch('code/:code')
  @HttpCode(HttpStatus.OK)
  @Roles(RoleEnum.STAFF)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async UpdatePromotionLineByCode(
    @Param('code') code: string,
    @Body() dto: UpdatePromotionLineDto,
    @CurrentUser() user,
  ) {
    return await this.promotionLineService.updatePromotionLineByIdOrCode(
      dto,
      user.id,
      undefined,
      code,
    );
  }

  @Get('code/:code')
  @HttpCode(HttpStatus.OK)
  async getPromotionByCode(@Param('code') code: string) {
    return await this.promotionLineService.getPromotionLineByCode(code);
  }

  @Get('id/:id')
  @HttpCode(HttpStatus.OK)
  async getPromotionById(@Param('id') id: string) {
    return await this.promotionLineService.getPromotionLineById(id);
  }
}
