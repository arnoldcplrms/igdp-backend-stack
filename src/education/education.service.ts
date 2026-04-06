import { Injectable } from '@nestjs/common';
import { CreateEducationDto, UpdateEducationDto } from './education.dto';
import { EducationRespository } from './education.repository';
@Injectable()
export class EducationService {
  constructor(private educationRepo: EducationRespository) {}

  create(createEducationDto: CreateEducationDto) {
    return this.educationRepo.createEducation(createEducationDto);
  }

  findByAccountId(accountId: number, skip?: number, take?: number) {
    return this.educationRepo.findByAccountId(accountId, skip, take);
  }

  findOne(accountId: number) {
    return this.educationRepo.findOne(accountId);
  }

  update(id: number, updateEducationDto: UpdateEducationDto) {
    return this.educationRepo.updateEducation(id, updateEducationDto);
  }

  remove(id: number, accountId: number) {
    return this.educationRepo.removeEducation(id, accountId);
  }
}
