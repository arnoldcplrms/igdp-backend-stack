import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import type { CreateSchoolDto, SchoolDTO, UpdateSchoolDto } from './school.dto';
import { toOverfetchTake } from 'src/common/utils/pagination.util';

@Injectable()
export class SchoolRepository {
  constructor(private prisma: PrismaService) {}

  createSchool(createSchoolDto: CreateSchoolDto): Promise<SchoolDTO> {
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
      take: toOverfetchTake(),
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

  findSchoolById(id: number): Promise<SchoolDTO | null> {
    return this.prisma.school.findUnique({
      where: { id },
    });
  }
}
