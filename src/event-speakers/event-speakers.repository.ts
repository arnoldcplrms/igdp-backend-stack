import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';
import { EventSpeakerItemDto } from './event-speakers.dto';

@Injectable()
export class EventSpeakersRepository {
  constructor(private prisma: PrismaService) {}

  async createMany(data: EventSpeakerItemDto[]) {
    await this.prisma.eventSpeakers.createMany({
      data,
      skipDuplicates: true,
    });
    return { success: true };
  }

  async findAll(
    skip?: number,
    take?: number,
    eventId?: number,
    speakerId?: number,
  ) {
    const where: any = {};

    if (eventId !== undefined) {
      where.eventId = eventId;
    }

    if (speakerId !== undefined) {
      where.speakerId = speakerId;
    }

    return this.prisma.eventSpeakers.findMany({
      skip,
      take,
      where: Object.keys(where).length > 0 ? where : undefined,
      include: {
        speaker: true,
        event: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(speakerId: number, eventId: number) {
    return this.prisma.eventSpeakers.findUnique({
      where: {
        speakerId_eventId: {
          speakerId,
          eventId,
        },
      },
      include: {
        speaker: true,
        event: true,
      },
    });
  }

  async findBySpeakerId(speakerId: number) {
    return this.prisma.eventSpeakers.findMany({
      where: { speakerId },
      include: {
        speaker: true,
        event: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByEventId(eventId: number) {
    return this.prisma.eventSpeakers.findMany({
      where: { eventId },
      include: {
        speaker: true,
        event: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async remove(speakerId: number, eventId: number) {
    return this.prisma.eventSpeakers.delete({
      where: {
        speakerId_eventId: {
          speakerId,
          eventId,
        },
      },
      include: {
        speaker: true,
        event: true,
      },
    });
  }
}
