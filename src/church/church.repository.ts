import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChurchDto, UpdateChurchDto } from './church.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { toOverfetchTake } from 'src/common/utils/pagination.util';
import { ChurchMapper } from './church.mapper';

@Injectable()
export class ChurchRepository {
  constructor(private prisma: PrismaService) {}

  createChurch(createChurchDto: CreateChurchDto) {
    return this.prisma.church.create({
      data: {
        name: createChurchDto.name,
        address: createChurchDto.address,
      },
    });
  }

  findChurchMany(search?: string, skip?: number, take?: number) {
    return this.prisma.church.findMany({
      skip,
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { address: { contains: search, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      take: toOverfetchTake(take),
    });
  }

  async findLatestChurch() {
    const church = await this.prisma.church.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!church) throw new NotFoundException(`No church record found`);

    return ChurchMapper.toDto(church);
  }

  findChurchById(id: number) {
    return this.prisma.church.findUnique({
      where: { id },
    });
  }

  updateChurch(id: number, updateChurchDto: UpdateChurchDto) {
    return this.prisma.church.update({
      where: { id },
      data: updateChurchDto,
    });
  }

  removeChurch(id: number) {
    return this.prisma.church.delete({
      where: { id },
    });
  }
}
