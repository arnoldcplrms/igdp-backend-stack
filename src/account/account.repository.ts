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

  findAccountsSorted(
    page: number = 1,
    pageSize: number = 10,
    sort: 'asc' | 'desc' = 'asc',
    sortBy: string = 'lastName',
  ) {
    const skip = (page - 1) * pageSize;
    const orderBy: Prisma.AccountOrderByWithRelationInput = {
      [sortBy]: sort,
    };

    return this.prisma.account.findMany({
      skip,
      take: pageSize,
      orderBy,
      include: {
        education: true,
      },
    });
  }

  findAccountById(id: number) {
    return this.prisma.account.findUnique({
      where: { id },
      include: {
        education: true,
      },
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
