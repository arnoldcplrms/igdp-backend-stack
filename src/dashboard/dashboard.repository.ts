import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { DashboardMetricsDto } from './dashboard.dto';

@Injectable()
export class DashboardRepository {
  constructor(private prisma: PrismaService) {}

  async getDashboardMetrics(): Promise<DashboardMetricsDto> {
    const [dGroups, totalAccounts] = await Promise.all([
      this.prisma.dGroup.findMany({
        select: {
          memberships: {
            select: {
              role: true,
            },
          },
        },
      }),
      this.prisma.account.count(),
    ]);

    let facilitators = 0;
    let dLeaders = 0;

    for (const dg of dGroups) {
      let leaderCount = 0;
      let memberCount = 0;

      for (const m of dg.memberships) {
        if (m.role === 'Leader') leaderCount++;
        else if (m.role === 'Member') memberCount++;
      }

      const isFacilitator =
        leaderCount === 2 ? memberCount / 2 <= 2 : memberCount <= 2;

      if (isFacilitator) {
        facilitators++;
      } else {
        dLeaders++;
      }
    }

    return {
      totalAccounts,
      facilitators,
      dLeaders,
    };
  }
}
