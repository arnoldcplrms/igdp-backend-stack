import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { toOverfetchTake } from 'src/common/utils/pagination.util';
import type {
  CreateDGroupDto,
  DGroupDTO,
  FilterDGroupDto,
  UpdateDGroupDto,
} from './dgroup.dto';
import { LifeStage } from '@prisma/client';

const NUMBER_OF_COUPLE_LEADERS = 2;
const NUMBER_OF_SINGLE_LEADER = 1;

@Injectable()
export class DGroupRepository {
  constructor(private prisma: PrismaService) {}

  async createDGroup(createDGroupDto: CreateDGroupDto): Promise<DGroupDTO> {
    const { name, churchId, dleaders, dmembers } = createDGroupDto;

    return this.prisma.$transaction(async (prisma) => {
      // 1. Create DGroup
      const dGroup = await prisma.dGroup.create({
        data: {
          name,
          churchId,
        },
      });

      // 2. Build membership records
      const leaderMemberships = dleaders.map((accountId) => ({
        accountId,
        dGroupId: dGroup.id,
        role: 'Leader',
      }));

      const memberMemberships = (dmembers ?? []).map((accountId) => ({
        accountId,
        dGroupId: dGroup.id,
        role: 'Member',
      }));

      // 3. Create memberships in bulk
      await prisma.dGroupMembership.createMany({
        data: [...leaderMemberships, ...memberMemberships],
      });

      // 4. Return created group
      return dGroup;
    });
  }

  async findMany(filters: FilterDGroupDto): Promise<DGroupDTO[]> {
    const { search, skip, take } = filters;

    const getAge = (birthDate: Date | null): number | null => {
      if (!birthDate) return null;

      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();

      const m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age;
    };

    const dGroups = await this.prisma.dGroup.findMany({
      skip,
      take: toOverfetchTake(take),
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                memberships: {
                  some: {
                    role: 'Leader',
                    OR: [
                      {
                        account: {
                          OR: [
                            {
                              firstName: {
                                contains: search,
                                mode: 'insensitive',
                              },
                            },
                            {
                              lastName: {
                                contains: search,
                                mode: 'insensitive',
                              },
                            },
                            {
                              middleName: {
                                contains: search,
                                mode: 'insensitive',
                              },
                            },
                          ],
                        },
                      },
                      {
                        couple: {
                          OR: [
                            {
                              husband: {
                                firstName: {
                                  contains: search,
                                  mode: 'insensitive',
                                },
                              },
                            },
                            {
                              husband: {
                                lastName: {
                                  contains: search,
                                  mode: 'insensitive',
                                },
                              },
                            },
                            {
                              wife: {
                                firstName: {
                                  contains: search,
                                  mode: 'insensitive',
                                },
                              },
                            },
                            {
                              wife: {
                                lastName: {
                                  contains: search,
                                  mode: 'insensitive',
                                },
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              },
            ],
          }
        : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      distinct: ['id'],
      include: {
        memberships: {
          include: {
            account: {
              select: {
                id: true,
                firstName: true,
                middleName: true,
                lastName: true,
                birthDate: true,
                gender: true,
              },
            },
            couple: {
              include: {
                husband: {
                  select: {
                    id: true,
                    firstName: true,
                    middleName: true,
                    lastName: true,
                    birthDate: true,
                    gender: true,
                  },
                },
                wife: {
                  select: {
                    id: true,
                    firstName: true,
                    middleName: true,
                    lastName: true,
                    birthDate: true,
                    gender: true,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            memberships: true,
          },
        },
      },
    });

    const result: DGroupDTO[] = dGroups.map((dgroup) => {
      const leaders = dgroup.memberships.flatMap((m) => {
        if (m.role !== 'Leader') return [];

        // Singles
        if (m.account) {
          return [m.account];
        }

        // Couples
        if (m.couple) {
          return [m.couple.husband, m.couple.wife];
        }

        return [];
      });

      const members = dgroup.memberships.flatMap((m) => {
        if (m.role !== 'Member') return [];

        // Singles
        if (m.account) {
          return [m.account];
        }

        // Couples
        if (m.couple) {
          return [m.couple.husband, m.couple.wife];
        }

        return [];
      });

      const lifestage: LifeStage[] = [];

      const isCouples = dgroup.memberships.some((m) => m.coupleId !== null);

      let hasBelow22 = false;
      let hasAbove23 = false;

      for (const member of members) {
        const age = getAge(member?.birthDate ?? null);

        if (age === null) continue;

        if (age <= 22) hasBelow22 = true;

        if (age >= 23) hasAbove23 = true;

        if (hasBelow22 && hasAbove23) break;
      }

      if (isCouples) {
        lifestage.unshift('Couples');
      } else {
        if (hasBelow22) lifestage.push('Elevate');

        if (hasAbove23) lifestage.push('B1G');
      }

      return {
        id: dgroup.id,
        name: dgroup.name,
        members:
          members.length -
          (isCouples ? NUMBER_OF_COUPLE_LEADERS : NUMBER_OF_SINGLE_LEADER),
        leaders: leaders.map((leader) => ({
          id: leader.id,
          firstName: leader.firstName,
          middleName: leader.middleName,
          lastName: leader.lastName,
          gender: leader.gender,
        })),
        lifestage,
      };
    });

    return result;
  }

  updateDGroup(
    id: number,
    updateDGroupDto: UpdateDGroupDto,
  ): Promise<DGroupDTO> {
    return this.prisma.dGroup.update({
      where: { id },
      data: updateDGroupDto,
    });
  }

  removeDGroup(id: number): Promise<DGroupDTO> {
    return this.prisma.dGroup.delete({
      where: { id },
    });
  }

  findDGroupById(id: number): Promise<DGroupDTO | null> {
    return this.prisma.dGroup.findUnique({
      where: { id },
    });
  }
}
