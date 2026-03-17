import { Injectable } from '@nestjs/common';
import type {
  CreateDGroupDto,
  DGroupDTO,
  FilterDGroupDto,
  UpdateDGroupDto,
} from './dgroup.dto';
import { DGroupRepository } from './dgroup.repository';

@Injectable()
export class DGroupService {
  constructor(private dGroupRepo: DGroupRepository) {}

  create(createDGroupDto: CreateDGroupDto): Promise<DGroupDTO> {
    return this.dGroupRepo.createDGroup(createDGroupDto);
  }

  findMany(filters: FilterDGroupDto): Promise<DGroupDTO[]> {
    return this.dGroupRepo.findMany(filters);
  }

  update(id: number, updateDGroupDto: UpdateDGroupDto): Promise<DGroupDTO> {
    return this.dGroupRepo.updateDGroup(id, updateDGroupDto);
  }

  remove(id: number): Promise<DGroupDTO> {
    return this.dGroupRepo.removeDGroup(id);
  }

  findById(id: number): Promise<DGroupDTO | null> {
    return this.dGroupRepo.findDGroupById(id);
  }
}
