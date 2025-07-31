import { Injectable } from '@nestjs/common';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.prisma.company.create({
      data: {
        name: createCompanyDto.name,
        address: createCompanyDto.address,
      },
    });
  }

  find(name?: string) {
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

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
    });
  }

  remove(id: number) {
    return this.prisma.company.delete({
      where: { id },
    });
  }
}
