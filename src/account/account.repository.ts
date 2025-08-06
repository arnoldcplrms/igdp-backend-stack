import { Injectable } from '@nestjs/common';
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

  createAccount(createAccountDto: CreateAccountDto) {
    return this.prisma.account.create({
      data: createAccountDto as Prisma.AccountCreateInput,
    });
  }

  private readonly selectObject = {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      middleName: true,
      birthDate: true,
      dGroupLeader: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      _count: {
        select: { dGroupMembers: true },
      },
    },
  };

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
        education: true,
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
