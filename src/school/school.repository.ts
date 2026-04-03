import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import type {
  CreateSchoolDto,
  FilterSchoolDto,
  SchoolDTO,
  UpdateSchoolDto,
} from './school.dto';
import { toOverfetchTake } from 'src/common/utils/pagination.util';

@Injectable()
export class SchoolRepository {
  constructor(private prisma: PrismaService) {}

  createSchool(createSchoolDto: CreateSchoolDto): Promise<SchoolDTO> {
    const data: any = {
      name: createSchoolDto.name,
      address: createSchoolDto.address,
    };

    if (createSchoolDto.acronym !== undefined) {
      data.acronym = createSchoolDto.acronym;
    }

    return this.prisma.school.create({
      data,
    });
  }

  async findAll(filters: FilterSchoolDto) {
    const { name, acronym, address, skip, take } = filters;
    const andConditions: any[] = [];

    if (name) {
      andConditions.push({
        OR: [
          { name: { contains: name, mode: 'insensitive' } },
          { acronym: { contains: name, mode: 'insensitive' } },
          { address: { contains: name, mode: 'insensitive' } },
        ],
      });
    }

    if (acronym) {
      andConditions.push({
        acronym: { contains: acronym, mode: 'insensitive' },
      });
    }

    if (address) {
      andConditions.push({
        address: { contains: address, mode: 'insensitive' },
      });
    }

    const schools = await this.prisma.school.findMany({
      where: andConditions.length > 0 ? { AND: andConditions } : undefined,
      include: {
        _count: { select: { education: true } }, // total
        education: { where: { endDate: null }, select: { id: true } }, // active
      },
    });

    const mapped = schools.map((s) => {
      const activeCount = s.education.length;
      const completedCount = s._count.education - activeCount;

      return {
        id: s.id,
        name: s.name,
        acronym: s.acronym,
        address: s.address,
        createdAt: s.createdAt,
        activeEducationCount: activeCount,
        completedEducationCount: completedCount,
      };
    });

    mapped.sort((a, b) => {
      if (b.activeEducationCount !== a.activeEducationCount) {
        return b.activeEducationCount - a.activeEducationCount;
      }
      return b.completedEducationCount - a.completedEducationCount;
    });

    return mapped.slice(skip || 0, (skip || 0) + (take || mapped.length));
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
