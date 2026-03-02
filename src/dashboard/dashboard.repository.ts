import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { DashboardMetricsDto } from './dashboard.dto';

@Injectable()
export class DashboardRepository {
  constructor(private prisma: PrismaService) {}

  async getDashboardMetrics(): Promise<DashboardMetricsDto> {
    // Get total accounts and dGroupLeaders
    const [totalAccounts, dGroupLeaders] = await Promise.all([
      this.prisma.account.count(),
      this.prisma.account.findMany({
        where: {
          dGroupMembers: {
            some: {},
          },
        },
        select: {
          id: true,
          _count: {
            select: {
              dGroupMembers: true,
            },
          },
        },
      }),
    ]);

    // Separate facilitators (2 or fewer members) and dLeaders (3 or more members)
    let facilitators = 0;
    let dLeaders = 0;

    for (const leader of dGroupLeaders) {
      const memberCount = leader._count.dGroupMembers;
      memberCount <= 2 ? facilitators++ : dLeaders++;
    }

    return {
      totalAccounts,
      facilitators,
      dLeaders,
    };
  }
}
