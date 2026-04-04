import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateEducationDto, UpdateEducationDto } from './education.dto';
import { toOverfetchTake } from 'src/common/utils/pagination.util';

@Injectable()
export class EducationRespository {
  constructor(private prisma: PrismaService) {}

  async createEducation(data: CreateEducationDto) {
    const educationData = data.education.map((edu) => ({
      accountId: data.accountId,
      schoolId: edu.schoolId,
      gradeYear: edu.gradeYear,
      course: edu.course,
      startDate: edu.startDate,
      endDate: edu.endDate,
    }));

    return this.prisma.education.createMany({
      data: educationData,
      skipDuplicates: true,
    });
  }

  findByAccountId(accountId: number, skip?: number, take?: number) {
    return this.prisma.education.findMany({
      where: { accountId },
      skip,
      take: toOverfetchTake(take),
      select: {
        schoolId: false,
        startDate: true,
        endDate: true,
        gradeYear: true,
        course: true,
        school: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    });
  }

  removeEducation(id: number, accountId: number) {
    return this.prisma.education.deleteMany({
      where: { id, accountId },
    });
  }

  updateEducation(
    id: number,
    accountId: number,
    updateEducationDto: UpdateEducationDto,
  ) {
    return this.prisma.education.update({
      where: { id, accountId },
      data: updateEducationDto,
    });
  }
}
