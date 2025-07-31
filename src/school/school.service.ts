import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { CreateSchoolDto, SchoolDTO, UpdateSchoolDto } from './dto/school.dto';

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  create(createSchoolDto: CreateSchoolDto): Promise<SchoolDTO> {
    return this.prisma.school.create({
      data: {
        name: createSchoolDto.name,
        address: createSchoolDto.address,
        updatedAt: new Date(),
      },
    });
  }

  find(name?: string): Promise<SchoolDTO[]> {
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

  update(id: number, updateSchoolDto: UpdateSchoolDto) {
    return this.prisma.school.update({
      where: { id },
      data: updateSchoolDto,
    });
  }

  remove(id: number) {
    return this.prisma.school.delete({
      where: { id },
    });
  }
}
