import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';
import { toOverfetchTake } from 'src/common/utils/pagination.util';
import {
  EventMinistryItemDto,
  UpdateEventMinistryDto,
} from './event-ministry.dto';

@Injectable()
export class EventMinistryRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly includeRelations = {
    event: {
      select: {
        id: true,
        eventName: true,
        eventDate: true,
      },
    },
    ministry: {
      select: {
        id: true,
        name: true,
      },
    },
  } satisfies Prisma.EventMinistryInclude;

  async createMany(data: EventMinistryItemDto[]) {
    await this.prisma.eventMinistry.createMany({
      data,
      skipDuplicates: true,
    });

    return { success: true };
  }

  findAll(
    skip?: number,
    take?: number,
    eventId?: number,
    ministryId?: number,
    isPrimaryOrganizer?: boolean,
  ) {
    const where: Prisma.EventMinistryWhereInput = {
      eventId,
      ministryId,
      isPrimaryOrganizer,
    };

    return this.prisma.eventMinistry.findMany({
      skip,
      take: toOverfetchTake(take),
      where,
      include: this.includeRelations,
      orderBy: [{ eventId: 'desc' }, { ministryId: 'desc' }],
    });
  }

  findByEventId(eventId: number, skip?: number, take?: number) {
    return this.prisma.eventMinistry.findMany({
      skip,
      take: toOverfetchTake(take),
      where: { eventId },
      include: this.includeRelations,
      orderBy: [{ isPrimaryOrganizer: 'desc' }, { ministryId: 'asc' }],
    });
  }

  findByMinistryId(ministryId: number, skip?: number, take?: number) {
    return this.prisma.eventMinistry.findMany({
      skip,
      take: toOverfetchTake(take),
      where: { ministryId },
      include: this.includeRelations,
      orderBy: [{ isPrimaryOrganizer: 'desc' }, { eventId: 'desc' }],
    });
  }

  findOne(eventId: number, ministryId: number) {
    return this.prisma.eventMinistry.findUnique({
      where: {
        eventId_ministryId: {
          eventId,
          ministryId,
        },
      },
      include: this.includeRelations,
    });
  }

  update(eventId: number, ministryId: number, data: UpdateEventMinistryDto) {
    return this.prisma.eventMinistry.update({
      where: {
        eventId_ministryId: {
          eventId,
          ministryId,
        },
      },
      data,
      include: this.includeRelations,
    });
  }

  remove(eventId: number, ministryId: number) {
    return this.prisma.eventMinistry.delete({
      where: {
        eventId_ministryId: {
          eventId,
          ministryId,
        },
      },
      include: this.includeRelations,
    });
  }
}
