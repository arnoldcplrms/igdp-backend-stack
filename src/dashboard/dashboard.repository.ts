import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { DashboardMetricsDto } from './dashboard.dto';

@Injectable()
export class DashboardRepository {
  constructor(private prisma: PrismaService) {}

  async getDashboardMetrics(): Promise<DashboardMetricsDto> {
    // Get total accounts and dGroupLeaders

    const dGroups = await this.prisma.dGroup.findMany({
      include: {
        memberships: {
          include: {
            account: true,
          },
        },
      },
    });

    const facilitators = dGroups.filter((dg) => {
      let leaderCount = 0;
      let memberCount = 0;

      for (const m of dg.memberships) {
        if (m.role === 'Leader') leaderCount++;
        if (m.role === 'Member') memberCount++;
      }

      return leaderCount === 2 ? memberCount / 2 <= 2 : memberCount <= 2;
    }).length;

    const dLeaders = dGroups.filter((dg) => {
      let leaderCount = 0;
      let memberCount = 0;

      for (const m of dg.memberships) {
        if (m.role === 'Leader') leaderCount++;
        if (m.role === 'Member') memberCount++;
      }

      return leaderCount === 1 ? memberCount / 2 > 2 : memberCount > 2;
    }).length;

    return {
      totalAccounts: await this.prisma.account.count(),
      facilitators: facilitators,
      dLeaders: dLeaders,
    };
  }
}
