import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCompanyDto,
  FilterCompanyDto,
  UpdateCompanyDto,
} from './company.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { toOverfetchTake } from 'src/common/utils/pagination.util';
import { AccountDTO } from 'src/account/account.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompanyRepository {
  constructor(private prisma: PrismaService) {}

  createCompany(createCompanyDto: CreateCompanyDto) {
    return this.prisma.company.create({
      data: {
        name: createCompanyDto.name,
        acronym: createCompanyDto.acronym,
        address: createCompanyDto.address,
      },
    });
  }

  findCompanyByName(name?: string, skip?: number, take?: number) {
    return this.prisma.company.findMany({
      skip,
      where: {
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: toOverfetchTake(take),
    });
  }

  async findCompanies(filters: FilterCompanyDto) {
    const { search, skip, take } = filters;
    const andConditions: any[] = [];

    if (search) {
      andConditions.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { acronym: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } },
        ],
      });
    }

    return await this.prisma.company.findMany({
      skip,
      take: toOverfetchTake(take),
      where: andConditions.length > 0 ? { AND: andConditions } : undefined,
      distinct: ['name', 'address'],
      orderBy: [{ employedCount: 'desc' }, { formerEmployeeCount: 'desc' }],
    });
  }

  updateCompany(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
    });
  }

  removeCompany(id: number) {
    return this.prisma.company.delete({
      where: { id },
    });
  }

  async findCompanyById(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      throw new NotFoundException(`Company not found`);
    }

    return company;
  }

  async findEmployeesByCompanyId(
    companyId: number,
    filters: FilterCompanyDto,
  ): Promise<Partial<AccountDTO>[]> {
    const { search, skip, take } = filters;
    const andConditions: Prisma.AccountWhereInput[] = [];

    if (search) {
      andConditions.push({
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { middleName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
        ],
      });
    }

    const where: Prisma.AccountWhereInput = {
      employment: {
        some: {
          companyId,
          endDate: null,
        },
      },
      AND: andConditions.length > 0 ? andConditions : undefined,
    };

    return this.prisma.account.findMany({
      skip,
      take: toOverfetchTake(take),
      orderBy: {
        lastName: 'desc',
      },
      where,
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        profilePicture: true,
      },
    });
  }

  async findFormerByCompanyId(
    companyId: number,
    filters: FilterCompanyDto,
  ): Promise<Partial<AccountDTO>[]> {
    const { search, skip, take } = filters;

    const andConditions: Prisma.AccountWhereInput[] = [];

    if (search) {
      andConditions.push({
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { middleName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
        ],
      });
    }

    const where: Prisma.AccountWhereInput = {
      employment: {
        some: {
          companyId,
          NOT: { endDate: null },
        },
      },
      AND: andConditions.length > 0 ? andConditions : undefined,
    };

    return this.prisma.account.findMany({
      skip,
      take: toOverfetchTake(take),
      where,
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        profilePicture: true,
      },
    });
  }
}
