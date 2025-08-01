import { Injectable } from '@nestjs/common';
import { CreateCompanyDto, UpdateCompanyDto } from './company.dto';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class CompanyRepository {
  constructor(private prisma: PrismaService) {}

  createCompany(createCompanyDto: CreateCompanyDto) {
    return this.prisma.company.create({
      data: {
        name: createCompanyDto.name,
        address: createCompanyDto.address,
      },
    });
  }

  findCompanyByName(name?: string) {
    return this.prisma.company.findMany({
      where: {
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
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
