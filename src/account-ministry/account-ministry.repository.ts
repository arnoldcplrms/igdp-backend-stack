import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';
import {
  CreateAccountMinistryDto,
  FilterAccountMinistryDto,
  UpdateAccountMinistryDto,
} from './account-ministry.dto';

@Injectable()
export class AccountMinistryRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly includeRelations = {
    account: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        nickname: true,
      },
    },
    ministry: {
      select: {
        id: true,
        name: true,
      },
    },
    ministryRole: {
      select: {
        id: true,
        ministryId: true,
        roleName: true,
      },
    },
  } satisfies Prisma.AccountMinistryInclude;

  create(data: CreateAccountMinistryDto) {
    return this.prisma.$transaction(async (transaction) => {
      if (data.isPrimary) {
        await transaction.accountMinistry.updateMany({
          where: {
            accountId: data.accountId,
            isPrimary: true,
          },
          data: {
            isPrimary: false,
          },
        });
      }

      return transaction.accountMinistry.create({
        data: {
          accountId: data.accountId,
          ministryId: data.ministryId,
          ministryRoleId: data.ministryRoleId,
          isPrimary: data.isPrimary ?? false,
          description: data.description,
        },
        include: this.includeRelations,
      });
    });
  }

  findAll(filters: FilterAccountMinistryDto) {
    const {
      id,
      accountId,
      ministryId,
      ministryRoleId,
      isPrimary,
      descriptionContains,
      skip,
      take,
      orderBy,
      sortOrder,
    } = filters;

    const where: Prisma.AccountMinistryWhereInput = {
      id,
      accountId,
      ministryId,
      ministryRoleId,
      isPrimary,
      ...(descriptionContains
        ? {
            description: {
              contains: descriptionContains,
              mode: 'insensitive',
            },
          }
        : {}),
    };

    return this.prisma.accountMinistry.findMany({
      where,
      skip,
      take,
      include: this.includeRelations,
      orderBy: {
        [orderBy ?? 'updatedAt']: sortOrder ?? 'desc',
      },
    });
  }

  findByAccountId(accountId: number) {
    return this.prisma.accountMinistry.findMany({
      where: { accountId },
      include: this.includeRelations,
      orderBy: [{ isPrimary: 'desc' }, { updatedAt: 'desc' }],
    });
  }

  findById(id: number) {
    return this.prisma.accountMinistry.findUnique({
      where: { id },
      include: this.includeRelations,
    });
  }

  update(id: number, data: UpdateAccountMinistryDto) {
    return this.prisma.$transaction(async (transaction) => {
      const existing = await transaction.accountMinistry.findUniqueOrThrow({
        where: { id },
      });

      const targetAccountId = data.accountId ?? existing.accountId;

      if (data.isPrimary === true) {
        await transaction.accountMinistry.updateMany({
          where: {
            accountId: targetAccountId,
            isPrimary: true,
            NOT: { id },
          },
          data: {
            isPrimary: false,
          },
        });
      }

      return transaction.accountMinistry.update({
        where: { id },
        data,
        include: this.includeRelations,
      });
    });
  }

  remove(id: number) {
    return this.prisma.accountMinistry.delete({
      where: { id },
      include: this.includeRelations,
    });
  }
}
