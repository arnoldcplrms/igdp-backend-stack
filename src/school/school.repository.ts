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

  async findSchools(filters: FilterSchoolDto) {
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

    const schools = await this.prisma.school.findMany({
      skip,
      take: toOverfetchTake(take),
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

    return mapped;
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
