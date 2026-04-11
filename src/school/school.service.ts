import { Injectable } from '@nestjs/common';

import type {
  CreateSchoolDto,
  FilterSchoolDto,
  SchoolDTO,
  SchoolListDTO,
  UpdateSchoolDto,
} from './school.dto';
import { SchoolRepository } from './school.repository';
import { AccountDTO } from 'src/account/account.dto';

@Injectable()
export class SchoolService {
  constructor(private schoolRepo: SchoolRepository) {}

  create(createSchoolDto: CreateSchoolDto): Promise<SchoolDTO> {
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

  findStudentsInSchool(
    schoolId: number,
    filters: FilterSchoolDto,
  ): Promise<Partial<AccountDTO>[]> {
    return this.schoolRepo.findStudentBySchoolId(schoolId, filters);
  }

  findGraduatesInSchool(
    schoolId: number,
    filters: FilterSchoolDto,
  ): Promise<Partial<AccountDTO>[]> {
    return this.schoolRepo.findGraduateBySchoolId(schoolId, filters);
  }
}
