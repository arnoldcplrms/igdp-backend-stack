import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { toOverfetchTake } from 'src/common/utils/pagination.util';
import type {
  DGroupMembershipItemDto,
  FilterDGroupMembershipDto,
} from './dgroup-membership.dto';

@Injectable()
export class DGroupMembershipRepository {
  constructor(private readonly prisma: PrismaService) {}

  createMany(memberships: DGroupMembershipItemDto[]) {
    return this.prisma.dGroupMembership.createMany({
      data: memberships,
      skipDuplicates: true,
    });
  }

  findAll(filters: FilterDGroupMembershipDto) {
    const { dGroupId, accountId, role, skip, take } = filters;

    const where: any = {};
    if (dGroupId !== undefined) where.dGroupId = dGroupId;
    if (accountId !== undefined) where.accountId = accountId;
    if (role !== undefined) where.role = role;

    return this.prisma.dGroupMembership.findMany({
      where,
      skip: skip ?? 0,
      take: toOverfetchTake(take),
      include: {
        dGroup: true,
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
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: number) {
    return this.prisma.dGroupMembership.findUnique({
      where: { id },
      include: {
        dGroup: true,
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

  remove(id: number) {
    return this.prisma.dGroupMembership.delete({ where: { id } });
  }
}
