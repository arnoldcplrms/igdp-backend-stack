import { Injectable } from '@nestjs/common';
import { CreateEmploymentDto, UpdateEmploymentDto } from './employment.dto';
import { EmploymentRepository } from './employment.repository';

@Injectable()
export class EmploymentService {
  constructor(private employmentRepository: EmploymentRepository) {}

  create(createEmploymentDto: CreateEmploymentDto) {
    return this.employmentRepository.createEmployment(createEmploymentDto);
  }

  findByAccountId(accountId: number, skip?: number, take?: number) {
    return this.employmentRepository.findByAccountId(accountId, skip, take);
  }

  findOne(id: number) {
    return this.employmentRepository.findOne(id);
  }

  update(id: number, updateEmploymentDto: UpdateEmploymentDto) {
    return this.employmentRepository.updateEmployment(id, updateEmploymentDto);
  }

  remove(id: number) {
    return this.employmentRepository.removeEmployment(id);
  }
}
