import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import { toOverfetchTake } from 'src/common/utils/pagination.util';

@Injectable()
export class SpeakerRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSpeakerDto) {
    return this.prisma.speaker.create({
      data,
      include: {
        account: true,
        updatedByUser: true,
      },
    });
  }

  async findAll(skip?: number, take?: number, name?: string) {
    // Build where clause dynamically
    const where: any = {};

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    const normalizedTake = toOverfetchTake(take);

    return this.prisma.speaker.findMany({
      skip,
      take: normalizedTake,
      where: Object.keys(where).length > 0 ? where : undefined,
      include: {
        account: true,
        updatedByUser: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByName(name: string, skip?: number, take?: number) {
    const normalizedTake = toOverfetchTake(take);

    return this.prisma.speaker.findMany({
      skip,
      take: normalizedTake,
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      include: {
        account: true,
        updatedByUser: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.speaker.findUnique({
      where: { id },
      include: {
        account: true,
        updatedByUser: true,
      },
    });
  }

  async update(id: number, data: UpdateSpeakerDto) {
    return this.prisma.speaker.update({
      where: { id },
      data,
      include: {
        account: true,
        updatedByUser: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.speaker.delete({
      where: { id },
      include: {
        account: true,
        updatedByUser: true,
      },
    });
  }
}
