import { Injectable } from '@nestjs/common';
import { CreateCompanyDto, UpdateCompanyDto } from './company.dto';
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

  findCompanyMany(search?: string, skip?: number, take?: number) {
    return this.prisma.company.findMany({
      skip,
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { acronym: { contains: search, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      take: toOverfetchTake(take),
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
