import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';
import { AttendanceItemDto } from './attendance.dto';

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
    isDeleted?: boolean,
    deletedBy?: number,
  ) {
    const where: any = {};

    if (eventId !== undefined) {
      where.eventId = eventId;
    }

    if (accountId !== undefined) {
      where.accountId = accountId;
    }

    if (isDeleted !== undefined) {
      where.isDeleted = isDeleted;
    }

    if (deletedBy !== undefined) {
      where.deletedBy = deletedBy;
    }

    return this.prisma.attendance.findMany({
      where,
      skip: skip || 0,
      take: take || 10,
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
        deletedByUser: {
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
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
        deletedByUser: {
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async softDelete(eventId: number, accountId: number, deletedBy: number) {
    return this.prisma.attendance.update({
      where: {
        eventId_accountId: {
          eventId,
          accountId,
        },
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy,
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
        deletedByUser: {
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async restore(eventId: number, accountId: number) {
    return this.prisma.attendance.update({
      where: {
        eventId_accountId: {
          eventId,
          accountId,
        },
      },
      data: {
        isDeleted: false,
        deletedAt: null,
        deletedBy: null,
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
