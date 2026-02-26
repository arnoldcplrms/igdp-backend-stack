import { Injectable } from '@nestjs/common';
import { CreateEducationDto, UpdateEducationDto } from './education.dto';
import { EducationRespository } from './education.repository';
@Injectable()
export class EducationService {
  constructor(private educationRepo: EducationRespository) {}

  create(createEducationDto: CreateEducationDto) {
    return this.educationRepo.createEducation(createEducationDto);
  }

  findByAccountId(accountId: number) {
    return this.educationRepo.findByAccountId(accountId);
  }

  update(
    id: number,
    accountId: number,
    updateEducationDto: UpdateEducationDto,
  ) {
    return this.educationRepo.updateEducation(
      id,
      accountId,
      updateEducationDto,
    );
  }

  remove(id: number, accountId: number) {
    return this.educationRepo.removeEducation(id, accountId);
  }
}
