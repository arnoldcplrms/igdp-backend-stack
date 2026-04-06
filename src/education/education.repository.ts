import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateEducationDto, UpdateEducationDto } from './education.dto';
import { toOverfetchTake } from 'src/common/utils/pagination.util';

@Injectable()
export class EducationRespository {
  constructor(private prisma: PrismaService) {}

  async createEducation(data: CreateEducationDto) {
    const educationData = data.educations.map((edu) => ({
      accountId: data.accountId,
      schoolId: edu.schoolId,
      educationLevel: edu.educationLevel,
      course: edu.course,
      startDate: edu.startDate,
      endDate: edu.endDate,
    }));

    await this.prisma.education.createMany({
      data: educationData,
      skipDuplicates: true,
    });

    // 🔹 Return accountId so caller knows which user this belongs to
    return { accountId: data.accountId };
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
        educationLevel: true,
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
