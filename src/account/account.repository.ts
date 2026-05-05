import { ConflictException, Injectable, Logger } from '@nestjs/common';
import {
  AccountDetailDto,
  CreateAccountDto,
  UpdateAccountDto,
  FilterAccountDto,
  FetchDGroupLeadersDto,
  LoginAccountDto,
} from './account.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { DGroupStatus, Prisma } from '@prisma/client';
import { AccountMapper } from './account.mapper';
import { toOverfetchTake } from 'src/common/utils/pagination.util';

@Injectable()
export class AccountRepository {
  constructor(private prisma: PrismaService) {}

  private readonly selectObject = {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      middleName: true,
      nickname: true,
      birthDate: true,
      gender: true,
      profilePicture: true,
      email: true,
      attendances: {
        select: {
          eventId: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' as const },
        take: 1,
      },
    },
  };

  createAccount(createAccountDto: CreateAccountDto) {
    return this.prisma.$transaction(async (prisma) => {
      try {
        const account = await prisma.account.create({
          data: createAccountDto.basicInfo as Prisma.AccountCreateInput,
        });

        if (!account) {
          throw new Error('Account creation failed');
        }

        if (createAccountDto.education && createAccountDto.education.length) {
          await prisma.education.createMany({
            data: createAccountDto.education.map((edu) => ({
              ...edu,
              schoolId: edu.schoolId,
              accountId: account.id,
            })),
          });
        }

        if (createAccountDto.employment && createAccountDto.employment.length) {
          await prisma.employment.createMany({
            data: createAccountDto.employment.map((emp) => ({
              ...emp,
              companyId: emp.companyId,
              accountId: account.id,
            })),
          });
        }

        return account;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            const target = error.meta?.target;

            throw new ConflictException(`${target} already exists`);
          }
        }
        Logger.error('Error creating account:', error);
        throw error;
      }
    });
  }

  private getDGroupStatus(account: any): DGroupStatus {
    if (!account?.dGroupMemberships?.length) {
      return 'Pending';
    }

    const membership = account.dGroupMemberships[0];

    if (membership.role === 'Member') {
      return 'DMember';
    }

    const dGroup = membership.dGroup;

    const members = dGroup.memberships.filter((m) => m.role === 'Member');

    const memberCount = members.length;

    // ⚠️ Replace this later with isCoupleGroup field
    const isCoupleGroup = memberCount % 2 === 0 && memberCount > 0;

    const adjustedMemberCount = isCoupleGroup ? memberCount / 2 : memberCount;

    // 🔥 D12
    const hasLeaderMemberWhoIsAlsoLeader = members.some((m) =>
      m.account.dGroupMemberships.some((dm) => dm.role === 'Leader'),
    );

    if (hasLeaderMemberWhoIsAlsoLeader) {
      return 'D12';
    }

    // 🔥 DLeader
    if (adjustedMemberCount >= 3) {
      return 'Dleader';
    }

    // 🔥 Facilitator
    if (adjustedMemberCount >= 1 && adjustedMemberCount <= 2) {
      return 'Facilitator';
    }

    return 'Pending';
  }

  async findAccountsSorted(filterDto: FilterAccountDto) {
    const { search, sortOrder, sortBy, skip = 0, take = 10 } = filterDto;

    const andConditions: any[] = [];

    if (search) {
      andConditions.push({
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { middleName: { contains: search, mode: 'insensitive' } },
        ],
      });
    }

    const orderBy: Prisma.AccountOrderByWithRelationInput = {
      [sortBy ?? 'createdAt']: sortOrder ?? 'desc',
    };

    const accounts = await this.prisma.account.findMany({
      skip,
      take: toOverfetchTake(take),
      distinct: ['id'],
      where: andConditions.length > 0 ? { AND: andConditions } : undefined,
      orderBy,
      include: {
        ...this.selectObject?.include,

        // 🔥 Only for internal computation
        dGroupMemberships: {
          include: {
            dgroup: {
              include: {
                memberships: {
                  include: {
                    account: {
                      select: {
                        id: true,
                        dGroupMemberships: {
                          select: { role: true },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return accounts.map((account) => {
      const status = this.getDGroupStatus(account);

      // ❌ remove heavy relation before returning
      const { dGroupMemberships, ...cleanAccount } = account;

      return {
        ...cleanAccount,
        dGroupStatus: status,
      };
    });
  }

  async findAccountById(id: number): Promise<AccountDetailDto> {
    const result = await this.prisma.account.findUnique({
      where: { id },
      include: {
        spouse: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            middleName: true,
          },
        },
        education: {
          select: {
            id: true,
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
        },
        employment: {
          select: {
            id: true,
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
        },
        attendances: {
          select: {
            eventId: true,
            accountId: true,
            createdAt: true,
            updatedAt: true,
          },
          orderBy: { createdAt: 'desc' as const },
          take: 1,
        },
      },
    });

    const dgroup = await this.prisma.dGroupMembership.findFirst({
      where: {
        accountId: result?.id,
        account: {
          gender: result?.gender,
        },
      },
      include: {
        account: true,
      },
    });

    const leader = await this.prisma.dGroupMembership.findFirst({
      where: {
        dgroupId: dgroup?.dgroupId,
        account: {
          gender: result?.gender,
        },
      },
      include: {
        account: true,
      },
    });

    return AccountMapper.toAccountDetailDto({
      ...result,
      dGroupLeader: {
        id: leader?.account.id,
        firstName: leader?.account.firstName,
        lastName: leader?.account.lastName,
        middleName: leader?.account.middleName,
      },
    });
  }

  async loginAccount(loginAccountDto: LoginAccountDto) {
    const account = await this.prisma.account.findFirst({
      where: {
        email: {
          equals: loginAccountDto.email,
          mode: 'insensitive',
        },
      },
    });

    if (!account) {
      throw new Error('Invalid email or password');
    }

    return account;
  }

  updateAccount(id: number, updateAccountDto: UpdateAccountDto) {
    return this.prisma.account.update({
      where: { id },
      data: updateAccountDto as Prisma.AccountUpdateInput,
    });
  }

  removeAccount(id: number) {
    return this.prisma.account.delete({
      where: { id },
    });
  }

  async fetchDGroupLeaders(
    dto: FetchDGroupLeadersDto,
    skip?: number,
    take?: number,
  ) {
    const result = await this.prisma.account.findMany({
      where: {
        gender: dto.gender,
        id: {
          not: dto.exemptedAccountId,
        },
        ...(dto.type === 'Singles' && {
          spouseId: null,
        }),
        ...(dto.type === 'Couples' && {
          spouseId: { not: null },
        }),
      },
      skip,
      take: toOverfetchTake(take),
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        gender: true,
        spouse: {
          select: {
            id: true,
            firstName: true,
            middleName: true,
            lastName: true,
            gender: true,
          },
        },
      },
    });

    return result.map((acc) => {
      if (dto.type === 'Couples' && acc.spouse) {
        const isMale = acc.gender === 'Male';

        return {
          husbandId: isMale ? acc.id : acc.spouse.id,
          husbandFirstName: isMale ? acc.firstName : acc.spouse.firstName,
          husbandMiddleName: isMale ? acc.middleName : acc.spouse.middleName,
          husbandLastName: isMale ? acc.lastName : acc.spouse.lastName,

          wifeId: isMale ? acc.spouse.id : acc.id,
          wifeFirstName: isMale ? acc.spouse.firstName : acc.firstName,
          wifeMiddleName: isMale ? acc.spouse.middleName : acc.middleName,
          wifeLastName: isMale ? acc.spouse.lastName : acc.lastName,
        };
      }

      return acc;
    });
  }
}
