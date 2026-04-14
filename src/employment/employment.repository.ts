import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import {
  CreateEmploymentDto,
  EmploymentDTO,
  UpdateEmploymentDto,
} from './employment.dto';
import { toOverfetchTake } from 'src/common/utils/pagination.util';
import { ApiResponse } from 'src/app.dto';

@Injectable()
export class EmploymentRepository {
  constructor(private prisma: PrismaService) {}

  async createEmployment(data: CreateEmploymentDto) {
    const employmentData = data.employments.map((emp) => ({
      accountId: data.accountId,
      companyId: emp.companyId,
      position: emp.position,
      startDate: emp.startDate,
      endDate: emp.endDate,
    }));

    await this.prisma.employment.createMany({
      data: employmentData,
      skipDuplicates: true,
    });

    const companyIds = [...new Set(employmentData.map((e) => e.companyId))];

    await Promise.all(
      companyIds.map(async (companyId) => {
        const [active, former] = await Promise.all([
          this.prisma.employment.groupBy({
            by: ['accountId'],
            where: {
              companyId,
              endDate: null,
            },
          }),
          this.prisma.employment.groupBy({
            by: ['accountId'],
            where: {
              companyId,
              NOT: { endDate: null },
            },
          }),
        ]);

        return this.prisma.company.update({
          where: { id: companyId },
          data: {
            employedCount: active.length,
            formerEmployeeCount: former.length,
          },
        });
      }),
    );

    return { accountId: data.accountId };
  }

  findByAccountId(accountId: number, skip?: number, take?: number) {
    return this.prisma.employment.findMany({
      where: { accountId },
      skip,
      take: toOverfetchTake(take),
      select: {
        position: true,
        startDate: true,
        endDate: true,
        company: {
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
    const data = await this.prisma.employment.findUnique({
      where: { id },
      select: {
        position: true,
        startDate: true,
        endDate: true,
        company: {
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

  async removeEmployment(id: number) {
    const idToDelete = Number(id);

    if (!idToDelete || idToDelete <= 0) {
      return {
        success: false,
        message: 'Invalid employment ID',
      };
    }

    try {
      const data = await this.prisma.employment.delete({
        where: { id: idToDelete },
      });

      const active = await this.prisma.employment.groupBy({
        by: ['accountId'],
        where: {
          companyId: data.companyId,
          endDate: null,
        },
      });

      const former = await this.prisma.employment.groupBy({
        by: ['accountId'],
        where: {
          companyId: data.companyId,
          NOT: { endDate: null },
        },
      });

      await this.prisma.company.update({
        where: { id: data.companyId },
        data: {
          activeEmployeeCount: active.length,
          formerEmployeeCount: former.length,
        },
      });

      return {
        success: true,
        message: 'Successfully deleted the record',
        data,
      };
    } catch (error: any) {
      if (error.code === 'P2025') {
        return {
          success: false,
          message: 'Employment not found',
        };
      }

      return {
        success: false,
        message: 'Failed to delete employment',
      };
    }
  }

  async updateEmployment(
    id: number,
    updateEmploymentDto: UpdateEmploymentDto,
  ): Promise<ApiResponse<EmploymentDTO>> {
    const data = await this.prisma.employment.update({
      where: { id },
      data: updateEmploymentDto,
    });

    const active = await this.prisma.employment.groupBy({
      by: ['accountId'],
      where: {
        companyId: data.companyId,
        endDate: null,
      },
    });

    const former = await this.prisma.employment.groupBy({
      by: ['accountId'],
      where: {
        companyId: data.companyId,
        NOT: { endDate: null },
      },
    });

    await this.prisma.company.update({
      where: { id: data.companyId },
      data: {
        activeEmployeeCount: active.length,
        formerEmployeeCount: former.length,
      },
    });

    return {
      success: true,
      data,
    };
  }
}
