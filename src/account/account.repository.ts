import { Injectable, Logger } from '@nestjs/common';
import {
  AccountDTO,
  AccountQueryDto,
  AccountDetailDto,
  CreateAccountDto,
  UpdateAccountDto,
} from './account.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { Gender, Prisma } from '@prisma/client';
import { AccountMapper } from './account.mapper';
import {
  clampPaginationLimit,
  toOverfetchTake,
} from 'src/common/utils/pagination.util';
import { PAGE_SIZE_COUNT } from 'src/common/constants';

@Injectable()
export class AccountRepository {
  constructor(private prisma: PrismaService) {}

  private readonly selectObject = {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      middleName: true,
      birthDate: true,
      gender: true,
      profilePicture: true,
      email: true,
      dGroupMembers: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      dGroupLeader: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      attendances: {
        select: {
          eventId: true,
          createdAt: true,
        },
        where: {
          isDeleted: false,
        },
        orderBy: { createdAt: 'desc' as const },
        take: 1,
      },
    },
  };

  createAccount(createAccountDto: CreateAccountDto) {
    return this.prisma.$transaction(async (prisma) => {
      try {
        const account = await prisma.account.create({
          data: createAccountDto.basicInfo as Prisma.AccountCreateInput,
        });

        if (!account) {
          throw new Error('Account creation failed');
        }

        if (createAccountDto.education && createAccountDto.education.length) {
          await prisma.education.createMany({
            data: createAccountDto.education.map((edu) => ({
              ...edu,
              schoolId: edu.schoolId,
              accountId: account.id,
            })),
          });
        }

        if (createAccountDto.employment && createAccountDto.employment.length) {
          await prisma.employment.createMany({
            data: createAccountDto.employment.map((emp) => ({
              ...emp,
              companyId: emp.companyId,
              accountId: account.id,
            })),
          });
        }

        return account;
      } catch (error) {
        Logger.error('Error creating account:', error);
        throw error;
      }
    });
  }

  async findAccountsSorted(
    page: number = 1,
    pageSize: number = PAGE_SIZE_COUNT,
    sort: 'asc' | 'desc' = 'asc',
    sortBy: string = 'lastName',
    name?: string,
  ): Promise<AccountDTO[]> {
    if (name) {
      return this.findAccountsByName(name);
    }

    const normalizedLimit = clampPaginationLimit(pageSize);
    const normalizedPage = Math.max(page, 1);
    const skip = (normalizedPage - 1) * normalizedLimit;
    const orderBy: Prisma.AccountOrderByWithRelationInput = {
      [sortBy]: sort,
    };

    const result = await this.prisma.account.findMany({
      skip,
      take: toOverfetchTake(pageSize),
      orderBy,
      ...this.selectObject,
    });

    return AccountMapper.toAccountDto(result as AccountQueryDto[]);
  }

  async findAccountById(id: number): Promise<AccountDetailDto> {
    const result = await this.prisma.account.findUnique({
      where: { id },
      include: {
        dGroupMembers: true,
        dGroupLeader: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            middleName: true,
          },
        },
        education: {
          select: {
            schoolId: false,
            startDate: true,
            endDate: true,
            gradeYear: true,
            course: true,
            school: {
              select: {
                id: true,
                name: true,
                address: true,
              },
            },
          },
        },
        employment: {
          select: {
            position: true,
            startDate: true,
            endDate: true,
            company: {
              select: {
                id: true,
                name: true,
                address: true,
              },
            },
          },
        },
        attendances: {
          select: {
            eventId: true,
            accountId: true,
            isDeleted: true,
            deletedAt: true,
            deletedBy: true,
            createdAt: true,
            updatedAt: true,
          },
          where: { isDeleted: false },
          orderBy: { createdAt: 'desc' as const },
          take: 1,
        },
      },
    });

    return AccountMapper.toAccountDetailDto(result);
  }

  async findAccountsByName(name: string) {
    const result = await this.prisma.account.findMany({
      where: {
        OR: [
          { firstName: { contains: name, mode: 'insensitive' } },
          { lastName: { contains: name, mode: 'insensitive' } },
        ],
      },
      take: toOverfetchTake(),
      ...this.selectObject,
    });

    return AccountMapper.toAccountDto(result as AccountQueryDto[]);
  }

  updateAccount(id: number, updateAccountDto: UpdateAccountDto) {
    return this.prisma.account.update({
      where: { id },
      data: updateAccountDto as Prisma.AccountUpdateInput,
    });
  }

  removeAccount(id: number) {
    return this.prisma.account.delete({
      where: { id },
    });
  }

  async fetchDGroupLeaders(exemptedAccountId: number, gender: Gender) {
    const result = await this.prisma.account.findMany({
      where: {
        gender: gender,
        id: {
          not: exemptedAccountId,
        },
      },
      take: toOverfetchTake(),
      ...this.selectObject,
    });

    return result;
  }
}
