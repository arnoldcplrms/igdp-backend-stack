import { Injectable } from '@nestjs/common';
import { CreateEmploymentDto } from './employment.dto';

@Injectable()
export class EmploymentService {
  create(createEmploymentDto: CreateEmploymentDto) {
    return 'This action adds a new employment';
  }

  findAll() {
    return `This action returns all employment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employment`;
  }

  update(id: number, updateEmploymentDto: any) {
    return `This action updates a #${id} employment`;
  }

  remove(id: number) {
    return `This action removes a #${id} employment`;
  }
}
