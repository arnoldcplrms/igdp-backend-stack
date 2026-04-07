import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import {
  CreateEducationDto,
  EducationDTO,
  UpdateEducationDto,
} from './education.dto';
import { toOverfetchTake } from 'src/common/utils/pagination.util';
import { ApiResponse } from 'src/app.dto';

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

  async findOne(id: number) {
    const data = await this.prisma.education.findUnique({
      where: { id },
      select: {
        startDate: true,
        endDate: true,
        educationLevel: true,
        course: true,
        school: {
          select: {
            id: true,
            name: true,
            acronym: true,
          },
        },
      },
    });
    return {
      success: true,
      data,
    };
  }

  async removeEducation(id: number) {
    const idToDelete = Number(id);
    if (!idToDelete || idToDelete <= 0) {
      return {
        success: false,
        message: 'Invalid education ID',
      };
    }

    try {
      const data = await this.prisma.education.delete({
        where: { id: idToDelete },
      });

      return {
        success: true,
        messsage: 'Successfully deleted the record',
        data,
      };
    } catch (error: any) {
      // Prisma specific: record not found
      if (error.code === 'P2025') {
        return {
          success: false,
          message: 'Education not found',
        };
      }

      return {
        success: false,
        message: 'Failed to delete education',
      };
    }
  }

  async updateEducation(
    id: number,
    updateEducationDto: UpdateEducationDto,
  ): Promise<ApiResponse<EducationDTO>> {
    const data = await this.prisma.education.update({
      where: { id },
      data: updateEducationDto,
    });

    return {
      success: true,
      data,
    };
  }
}
