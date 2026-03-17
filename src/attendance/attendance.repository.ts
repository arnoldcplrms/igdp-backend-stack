import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';
import { AttendanceItemDto } from './attendance.dto';
import { toOverfetchTake } from 'src/common/utils/pagination.util';

@Injectable()
export class AttendanceRepository {
  constructor(private prisma: PrismaService) {}

  async createMany(attendances: AttendanceItemDto[]) {
    return this.prisma.attendance.createMany({
      data: attendances,
      skipDuplicates: true, // Skip if eventId+accountId already exists
    });
  }

  async findAll(
    skip?: number,
    take?: number,
    eventId?: number,
    accountId?: number,
  ) {
    const where: any = {};

    if (eventId !== undefined) {
      where.eventId = eventId;
    }

    if (accountId !== undefined) {
      where.accountId = accountId;
    }

    const normalizedTake = toOverfetchTake(take);

    return this.prisma.attendance.findMany({
      where,
      skip: skip || 0,
      take: normalizedTake,
      include: {
        event: true,
        account: {
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
            nickname: true,
            contactNumber: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(eventId: number, accountId: number) {
    return this.prisma.attendance.findUnique({
      where: {
        eventId_accountId: {
          eventId,
          accountId,
        },
      },
      include: {
        event: true,
        account: {
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
            nickname: true,
            contactNumber: true,
            email: true,
          },
        },
      },
    });
  }
}
