import { Injectable } from '@nestjs/common';

import type {
  CreateSchoolDto,
  FilterSchoolDto,
  SchoolDTO,
  SchoolListDTO,
  UpdateSchoolDto,
} from './school.dto';
import { SchoolRepository } from './school.repository';

@Injectable()
export class SchoolService {
  constructor(private schoolRepo: SchoolRepository) {}

  create(createSchoolDto: CreateSchoolDto): Promise<SchoolListDTO> {
    return this.schoolRepo.createSchool(createSchoolDto);
  }

  async findAll(filters: FilterSchoolDto): Promise<SchoolListDTO[]> {
    return await this.schoolRepo.findSchools(filters);
  }

  update(id: number, updateSchoolDto: UpdateSchoolDto) {
    return this.schoolRepo.updateSchool(id, updateSchoolDto);
  }

  remove(id: number) {
    return this.schoolRepo.removeSchool(id);
  }

  findById(id: number): Promise<SchoolDTO> {
    return this.schoolRepo.findSchoolById(id);
  }
}
