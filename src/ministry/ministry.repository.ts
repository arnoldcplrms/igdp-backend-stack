import { Injectable } from '@nestjs/common';
import { CreateMinistryDto, UpdateMinistryDto } from './ministry.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { toOverfetchTake } from 'src/common/utils/pagination.util';

@Injectable()
export class MinistryRepository {
  constructor(private prisma: PrismaService) {}

  private getNestedInclude() {
    return {
      parent: true,
      children: {
        include: {
          children: {
            include: {
              children: {
                include: {
                  children: {
                    include: {
                      children: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
  }

  createMinistry(createMinistryDto: CreateMinistryDto) {
    return this.prisma.ministry.create({
      data: {
        name: createMinistryDto.name,
        parentMinistry: createMinistryDto.parentMinistry,
        mission: createMinistryDto.mission,
        vision: createMinistryDto.vision,
        description: createMinistryDto.description,
      },
      include: this.getNestedInclude(),
    });
  }

  findMinistryByName(name?: string) {
    return this.prisma.ministry.findMany({
      where: {
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
      },
      include: this.getNestedInclude(),
      orderBy: {
        createdAt: 'desc',
      },
      take: toOverfetchTake(),
    });
  }

  updateMinistry(id: number, updateMinistryDto: UpdateMinistryDto) {
    return this.prisma.ministry.update({
      where: { id },
      data: updateMinistryDto,
      include: this.getNestedInclude(),
    });
  }

  removeMinistry(id: number) {
    return this.prisma.ministry.delete({
      where: { id },
    });
  }

  findMinistryById(id: number) {
    return this.prisma.ministry.findUnique({
      where: { id },
      include: this.getNestedInclude(),
    });
  }

  findAllMinistries() {
    return this.prisma.ministry.findMany({
      include: this.getNestedInclude(),
      orderBy: {
        createdAt: 'desc',
      },
      take: toOverfetchTake(),
    });
  }

  findAllMainMinistries() {
    // get all the ministries that do not have a parent ministry
    return this.prisma.ministry.findMany({
      where: {
        parentMinistry: null,
      },
      include: this.getNestedInclude(),
      orderBy: {
        createdAt: 'desc',
      },
      take: toOverfetchTake(),
    });
  }
}
