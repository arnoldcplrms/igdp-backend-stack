import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import type {
  CreateSchoolDto,
  FilterSchoolDto,
  SchoolDTO,
  SchoolListDTO,
  UpdateSchoolDto,
} from './school.dto';
import { toOverfetchTake } from 'src/common/utils/pagination.util';
import { AccountDTO } from 'src/account/account.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SchoolRepository {
  constructor(private prisma: PrismaService) {}

  async createSchool(createSchoolDto: CreateSchoolDto): Promise<SchoolDTO> {
    const data: any = {
      name: createSchoolDto.name,
      address: createSchoolDto.address,
    };

    if (createSchoolDto.acronym !== undefined) {
      data.acronym = createSchoolDto.acronym;
    }

    const school = await this.prisma.school.create({ data });
    return { ...school, updatedAt: school.updatedAt ?? undefined };
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

    return await this.prisma.school.findMany({
      skip,
      take: toOverfetchTake(take),
      where: andConditions.length > 0 ? { AND: andConditions } : undefined,
      distinct: ['name'],
      orderBy: [
        { enrolledStudentCount: 'desc' },
        { alumniStudentCount: 'desc' },
      ],
      select: {
        id: true,
        name: true,
        acronym: true,
        address: true,
        createdAt: true,
        enrolledStudentCount: true,
        alumniStudentCount: true,
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

  async findSchoolById(id: number): Promise<SchoolDTO> {
    const school = await this.prisma.school.findUnique({
      where: { id },
    });

    if (!school) {
      throw new NotFoundException('School not found');
    }

    return { ...school, updatedAt: school.updatedAt ?? undefined };
  }

  async findStudentBySchoolId(
    schoolId: number,
    filters: FilterSchoolDto,
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
      education: {
        some: {
          schoolId,
          endDate: null, // currently studying
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

  async findGraduateBySchoolId(
    schoolId: number,
    filters: FilterSchoolDto,
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
      education: {
        some: {
          schoolId,
          NOT: { endDate: null }, // graduate
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
