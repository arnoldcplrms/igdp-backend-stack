import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { toOverfetchTake } from 'src/common/utils/pagination.util';
import type {
  CreateDGroupDto,
  DGroupDTO,
  FilterDGroupDto,
  UpdateDGroupDto,
} from './dgroup.dto';

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

  findMany(filters: FilterDGroupDto): Promise<DGroupDTO[]> {
    const { search, skip, take } = filters;

    return this.prisma.dGroup.findMany({
      skip,
      take: toOverfetchTake(take),
      where: search
        ? {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          }
        : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      distinct: ['id'],
    });
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
