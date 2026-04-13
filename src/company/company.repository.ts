import { Injectable } from '@nestjs/common';
import {
  CreateCompanyDto,
  FilterCompanyDto,
  UpdateCompanyDto,
} from './company.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { toOverfetchTake } from 'src/common/utils/pagination.util';

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
      select: {
        id: true,
        name: true,
        acronym: true,
        address: true,
        createdAt: true,
        employedCount: true,
        formerEmployeeCount: true,
      },
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

  findCompanyById(id: number) {
    return this.prisma.company.findUnique({
      where: { id },
    });
  }
}
