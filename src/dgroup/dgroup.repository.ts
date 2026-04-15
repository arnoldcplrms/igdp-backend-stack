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

@Injectable()
export class DGroupRepository {
  constructor(private prisma: PrismaService) {}

  createDGroup(createDGroupDto: CreateDGroupDto): Promise<DGroupDTO> {
    return this.prisma.dGroup.create({
      data: {
        name: createDGroupDto.name,
      },
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
      const leaders = dgroup.memberships
        .filter((m) => m.role === 'Leader')
        .map((m) => m.account);

      const members = dgroup.memberships
        .filter((m) => m.role === 'Member')
        .map((m) => m.account);

      const lifestage: LifeStage[] = [];

      if (leaders.length === 2) {
        lifestage.push('Couples');

        return {
          id: dgroup.id,
          name: dgroup.name,
          members: dgroup._count.memberships,
          leaders: leaders.map((leader) => ({
            id: leader.id,
            firstName: leader.firstName,
            middleName: leader.middleName,
            lastName: leader.lastName,
            gender: leader.gender,
          })),
          lifestage,
        };
      }

      let hasBelow22 = false;
      let hasAbove23 = false;

      for (const member of members) {
        const age = getAge(member.birthDate);
        if (age === null) continue;

        if (age <= 22) hasBelow22 = true;
        if (age >= 23) hasAbove23 = true;

        if (hasBelow22 && hasAbove23) break;
      }

      if (hasBelow22) lifestage.push('Elevate');
      if (hasAbove23) lifestage.push('B1G');

      return {
        id: dgroup.id,
        name: dgroup.name,
        members: dgroup._count.memberships,
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
