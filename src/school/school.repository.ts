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

  findSchools(filters: FilterSchoolDto) {
    const { name, acronym, address, skip, take } = filters;
    const andConditions: any[] = [];

    if (name) {
      andConditions.push({
        OR: [
          {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          },
          {
            acronym: {
              contains: name,
              mode: 'insensitive',
            },
          },
        ],
      });
    }

    if (acronym) {
      andConditions.push({
        acronym: {
          contains: acronym,
          mode: 'insensitive',
        },
      });
    }

    if (address) {
      andConditions.push({
        address: {
          contains: address,
          mode: 'insensitive',
        },
      });
    }

    return this.prisma.school.findMany({
      skip,
      take: toOverfetchTake(take),
      where: andConditions.length > 0 ? { AND: andConditions } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
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
