import { ConflictException, Injectable, Logger } from '@nestjs/common';
import {
  AccountDetailDto,
  CreateAccountDto,
  UpdateAccountDto,
  FilterAccountDto,
} from './account.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { Gender, Prisma } from '@prisma/client';
import { AccountMapper } from './account.mapper';
import { toOverfetchTake } from 'src/common/utils/pagination.util';

@Injectable()
export class AccountRepository {
  constructor(private prisma: PrismaService) {}

  private readonly selectObject = {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      middleName: true,
      nickname: true,
      birthDate: true,
      gender: true,
      profilePicture: true,
      email: true,
      dGroupLeader: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          middleName: true,
        },
      },
      attendances: {
        select: {
          eventId: true,
          createdAt: true,
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
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            const target = error.meta?.target;

            throw new ConflictException(`${target} already exists`);
          }
        }
        Logger.error('Error creating account:', error);
        throw error;
      }
    });
  }

  async findAccountsSorted(filterDto: FilterAccountDto) {
    const { search, sortOrder, sortBy, skip = 0, take = 10 } = filterDto;

    const andConditions: any[] = [];

    if (search) {
      andConditions.push({
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { middleName: { contains: search, mode: 'insensitive' } },
        ],
      });
    }

    const orderBy: Prisma.AccountOrderByWithRelationInput = {
      [sortBy ?? 'createdAt']: sortOrder ?? 'desc',
    };

    const accounts = await this.prisma.account.findMany({
      skip,
      take: toOverfetchTake(take),
      distinct: ['id'],
      where: andConditions.length > 0 ? { AND: andConditions } : undefined,
      orderBy,
      ...this.selectObject,
    });

    return accounts;
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
            id: true,
            startDate: true,
            endDate: true,
            educationLevel: true,
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
            id: true,
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
            createdAt: true,
            updatedAt: true,
          },
          orderBy: { createdAt: 'desc' as const },
          take: 1,
        },
      },
    });

    return AccountMapper.toAccountDetailDto(result);
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
