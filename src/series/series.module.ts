import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { SeriesRepository } from './series.repository';
import { PrismaService } from '../common/database/prisma.service';

@Module({
  controllers: [SeriesController],
  providers: [SeriesService, SeriesRepository, PrismaService],
})
export class SeriesModule {}
