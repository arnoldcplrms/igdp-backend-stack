import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateSchoolDto, UpdateSchoolDto } from './school.dto';

@Injectable()
export class SchoolRepository {
  constructor(private prisma: PrismaService) {}

  createSchool(createSchoolDto: CreateSchoolDto) {
    return this.prisma.school.create({
      data: {
        name: createSchoolDto.name,
        address: createSchoolDto.address,
      },
    });
  }

  findSchoolByName(name?: string) {
    return this.prisma.school.findMany({
      where: {
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });
  }

  updateSchool(id: number, updateSchoolDto: UpdateSchoolDto) {
    return this.prisma.school.update({
      where: { id },
      data: updateSchoolDto,
    });
  }

  removeSchool(id: number) {
    return this.prisma.school.delete({
      where: { id },
    });
  }

  findSchoolById(id: number) {
    return this.prisma.school.findUnique({
      where: { id },
    });
  }
}
