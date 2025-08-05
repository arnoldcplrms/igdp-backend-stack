import { Injectable } from '@nestjs/common';
import { CreateAccountDto, UpdateAccountDto } from './account.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AccountRepository {
  constructor(private prisma: PrismaService) {}

  createAccount(createAccountDto: CreateAccountDto) {
    return this.prisma.account.create({
      data: createAccountDto as Prisma.AccountCreateInput,
    });
  }
  findManyAccounts(
    page: number = 1,
    pageSize: number = 10,
    sort: 'asc' | 'desc' = 'asc',
  ) {
    const skip = (page - 1) * pageSize;
    return this.prisma.account.findMany({
      skip,
      take: pageSize,
      orderBy: {
        lastName: sort,
      },
    });
  }

  findAccountById(id: number) {
    return this.prisma.account.findUnique({
      where: { id },
    });
  }

  findAccountsByName(name: string) {
    return this.prisma.account.findMany({
      where: {
        OR: [
          { firstName: { contains: name, mode: 'insensitive' } },
          { lastName: { contains: name, mode: 'insensitive' } },
        ],
      },
    });
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
