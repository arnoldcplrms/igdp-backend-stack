import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';
import {
  FilterMinistryRoleDto,
  MinistryRoleItemDto,
  UpdateMinistryRoleDto,
} from './ministry-role.dto';

@Injectable()
export class MinistryRoleRepository {
  constructor(private prisma: PrismaService) {}

  createMany(data: MinistryRoleItemDto[]) {
    return this.prisma.$transaction(
      data.map((item) =>
        this.prisma.ministryRole.create({
          data: {
            ministryId: item.ministryId,
            roleName: item.roleName,
          },
        }),
      ),
    );
  }

  findAll(filters: FilterMinistryRoleDto) {
    const {
      id,
      ministryId,
      roleName,
      roleNameContains,
      skip,
      take,
      orderBy,
      sortOrder,
      columns,
    } = filters;

    const where: Prisma.MinistryRoleWhereInput = {
      id,
      ministryId,
      roleName,
      ...(roleNameContains
        ? {
            roleName: {
              contains: roleNameContains,
              mode: 'insensitive',
            },
          }
        : {}),
    };

    const select =
      columns && columns.length > 0
        ? columns.reduce<Prisma.MinistryRoleSelect>((acc, column) => {
            acc[column] = true;
            return acc;
          }, {})
        : undefined;

    return this.prisma.ministryRole.findMany({
      where,
      skip,
      take,
      orderBy: {
        [orderBy ?? 'id']: sortOrder ?? 'desc',
      },
      select,
    });
  }

  findById(id: number) {
    return this.prisma.ministryRole.findUnique({
      where: { id },
    });
  }

  update(id: number, data: UpdateMinistryRoleDto) {
    return this.prisma.ministryRole.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.ministryRole.delete({
      where: { id },
    });
  }
}
