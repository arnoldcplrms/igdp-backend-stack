import { Injectable } from '@nestjs/common';
import {
  CreateMinistryRolesDto,
  FilterMinistryRoleDto,
  MinistryRoleItemDto,
  UpdateMinistryRoleDto,
} from './ministry-role.dto';
import { MinistryRoleRepository } from './ministry-role.repository';

@Injectable()
export class MinistryRoleService {
  constructor(
    private readonly ministryRoleRepository: MinistryRoleRepository,
  ) {}

  createMany(createMinistryRolesDto: CreateMinistryRolesDto) {
    const ministryRoles = createMinistryRolesDto.ministryRoles.map(
      (item) => new MinistryRoleItemDto(item),
    );
    return this.ministryRoleRepository.createMany(ministryRoles);
  }

  findAll(filters: FilterMinistryRoleDto) {
    return this.ministryRoleRepository.findAll(filters);
  }

  findById(id: number) {
    return this.ministryRoleRepository.findById(id);
  }

  update(id: number, data: UpdateMinistryRoleDto) {
    return this.ministryRoleRepository.update(id, data);
  }

  remove(id: number) {
    return this.ministryRoleRepository.remove(id);
  }
}
