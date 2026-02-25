import { Injectable, Logger } from '@nestjs/common';
import {
  AccountDTO,
  AccountQueryDto,
  CreateAccountDto,
  UpdateAccountDto,
} from './account.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { Prisma } from '@prisma/client';
import { AccountMapper } from './account.mapper';

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
      dGroupMembers: {
        // This is actually the leader (single object) in Prisma
        select: {
          firstName: true,
          lastName: true,
        },
      },
      dGroupLeader: {
        // This is actually the members (array) in Prisma
        select: {
          firstName: true,
          lastName: true,
        },
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
    pageSize: number = 10,
    sort: 'asc' | 'desc' = 'asc',
    sortBy: string = 'lastName',
    name?: string,
  ): Promise<AccountDTO[]> {
    if (name) {
      return this.findAccountsByName(name);
    }

    const skip = (page - 1) * pageSize;
    const orderBy: Prisma.AccountOrderByWithRelationInput = {
      [sortBy]: sort,
    };

    const result = await this.prisma.account.findMany({
      skip,
      take: pageSize,
      orderBy,
      ...this.selectObject,
    });

    return AccountMapper.toAccountDto(result as AccountQueryDto[]);
  }

  findAccountById(id: number) {
    return this.prisma.account.findUnique({
      where: { id },
      include: {
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
      },
    });
  }

  async findAccountsByName(name: string) {
    const result = await this.prisma.account.findMany({
      where: {
        OR: [
          { firstName: { contains: name, mode: 'insensitive' } },
          { lastName: { contains: name, mode: 'insensitive' } },
        ],
      },
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
}
