import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { CreateEducationDto, UpdateEducationDto } from './education.dto';

@Injectable()
export class EducationRespository {
  constructor(private prisma: PrismaService) {}

  createEducation(createEducationSchema: CreateEducationDto) {
    return this.prisma.education.create({
      data: createEducationSchema,
    });
  }

  findByAccountId(accountId: number) {
    return this.prisma.education.findMany({
      where: { accountId },
    });
  }

  removeEducation(id: number, accountId: number) {
    return this.prisma.education.deleteMany({
      where: { id, accountId },
    });
  }

  updateEducation(
    id: number,
    accountId: number,
    updateEducationDto: UpdateEducationDto,
  ) {
    return this.prisma.education.update({
      where: { id, accountId },
      data: updateEducationDto,
    });
  }
}
