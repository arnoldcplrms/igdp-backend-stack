import { Injectable } from '@nestjs/common';

import { CreateSchoolDto, SchoolDTO, UpdateSchoolDto } from './school.dto';
import { SchoolRepository } from './school.repository';

@Injectable()
export class SchoolService {
  constructor(private schoolRepo: SchoolRepository) {}

  create(createSchoolDto: CreateSchoolDto): Promise<SchoolDTO> {
    return this.schoolRepo.createSchool(createSchoolDto);
  }

  findByName(name?: string): Promise<SchoolDTO[]> {
    return this.schoolRepo.findSchoolByName(name);
  }

  update(id: number, updateSchoolDto: UpdateSchoolDto) {
    return this.schoolRepo.updateSchool(id, updateSchoolDto);
  }

  remove(id: number) {
    return this.schoolRepo.removeSchool(id);
  }

  findById(id: number): Promise<SchoolDTO | null> {
    return this.schoolRepo.findSchoolById(id);
  }
}
