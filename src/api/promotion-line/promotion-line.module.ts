import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PromotionLineService } from './promotion-line.service';
import { PromotionLineController } from './promotion-line.controller';
import {
  Promotion,
  PromotionDetail,
  PromotionLine,
} from './../../database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([PromotionLine, Promotion, PromotionDetail]),
  ],
  providers: [PromotionLineService],
  controllers: [PromotionLineController],
  exports: [PromotionLineService],
})
export class PromotionLineModule {}
