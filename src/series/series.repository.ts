import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';

@Injectable()
export class SeriesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSeriesDto) {
    return this.prisma.series.create({
      data,
      include: {
        ministry: true,
      },
    });
  }

  async findAll() {
    return this.prisma.series.findMany({
      include: {
        ministry: true,
      },
    });
  }

  async findByName(name: string) {
    return this.prisma.series.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      include: {
        ministry: true,
        events: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.series.findUnique({
      where: { id },
      include: {
        ministry: true,
        events: true,
      },
    });
  }

  async update(id: number, data: UpdateSeriesDto) {
    return this.prisma.series.update({
      where: { id },
      data,
      include: {
        ministry: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.series.delete({
      where: { id },
    });
  }
}
