import { Injectable } from '@nestjs/common';
import { CreateChurchDto, UpdateChurchDto } from './church.dto';
import { ChurchRepository } from './church.repository';

@Injectable()
export class ChurchService {
  constructor(private churchRepo: ChurchRepository) {}

  create(createChurchDto: CreateChurchDto) {
    return this.churchRepo.createChurch(createChurchDto);
  }

  findMany(search?: string, skip?: number, take?: number) {
    return this.churchRepo.findChurchMany(search, skip, take);
  }

  findById(id: number) {
    return this.churchRepo.findChurchById(id);
  }

  update(id: number, updateChurchDto: UpdateChurchDto) {
    return this.churchRepo.updateChurch(id, updateChurchDto);
  }

  remove(id: number) {
    return this.churchRepo.removeChurch(id);
  }
}
