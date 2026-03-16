import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { toOverfetchTake } from 'src/common/utils/pagination.util';

@Injectable()
export class EventRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEventDto) {
    const createData: any = { ...data };
    createData.eventDate = new Date(data.eventDate + 'T00:00:00Z');

    return this.prisma.event.create({
      data: createData,
      include: {
        series: true,
        ministry: true,
        eventSpeakers: {
          include: {
            speaker: true,
          },
        },
      },
    });
  }

  async findAll(
    skip?: number,
    take?: number,
    eventName?: string,
    location?: string,
    seriesId?: number,
    ministryId?: number,
    eventDate?: string,
  ) {
    // Build where clause dynamically
    const where: any = {};

    if (eventName) {
      where.eventName = {
        contains: eventName,
        mode: 'insensitive',
      };
    }

    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive',
      };
    }

    if (seriesId) {
      where.seriesId = seriesId;
    }

    if (ministryId) {
      where.ministryId = ministryId;
    }

    if (eventDate) {
      const dateObj = new Date(eventDate + 'T00:00:00Z');
      where.eventDate = dateObj;
    }

    const normalizedTake = toOverfetchTake(take);

    return this.prisma.event.findMany({
      skip,
      take: normalizedTake,
      where: Object.keys(where).length > 0 ? where : undefined,
      include: {
        series: true,
        ministry: true,
        eventSpeakers: {
          include: {
            speaker: true,
          },
        },
      },
    });
  }

  async findByName(name: string, skip?: number, take?: number) {
    const normalizedTake = toOverfetchTake(take);

    return this.prisma.event.findMany({
      skip,
      take: normalizedTake,
      where: {
        eventName: {
          contains: name,
          mode: 'insensitive',
        },
      },
      include: {
        series: true,
        ministry: true,
        eventSpeakers: {
          include: {
            speaker: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.event.findUnique({
      where: { id },
      include: {
        series: true,
        ministry: true,
        eventSpeakers: {
          include: {
            speaker: true,
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateEventDto) {
    const updateData: any = { ...data };

    // Convert eventDate if provided
    if (data.eventDate) {
      updateData.eventDate = new Date(data.eventDate + 'T00:00:00Z');
    }

    return this.prisma.event.update({
      where: { id },
      data: updateData,
      include: {
        series: true,
        ministry: true,
        eventSpeakers: {
          include: {
            speaker: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
