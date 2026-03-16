import { Injectable } from '@nestjs/common';
import { CreateMinistryDto, UpdateMinistryDto } from './ministry.dto';
import { MinistryRepository } from './ministry.repository';

@Injectable()
export class MinistryService {
  constructor(private ministryRepo: MinistryRepository) {}

  create(createMinistryDto: CreateMinistryDto) {
    return this.ministryRepo.createMinistry(createMinistryDto);
  }

  findByName(name?: string, skip?: number, take?: number) {
    return this.ministryRepo.findMinistryByName(name, skip, take);
  }

  findAll(skip?: number, take?: number) {
    return this.ministryRepo.findAllMinistries(skip, take);
  }

  findAllMain(skip?: number, take?: number) {
    return this.ministryRepo.findAllMainMinistries(skip, take);
  }

  update(id: number, updateMinistryDto: UpdateMinistryDto) {
    return this.ministryRepo.updateMinistry(id, updateMinistryDto);
  }

  remove(id: number) {
    return this.ministryRepo.removeMinistry(id);
  }

  findById(id: number) {
    return this.ministryRepo.findMinistryById(id);
  }
}
