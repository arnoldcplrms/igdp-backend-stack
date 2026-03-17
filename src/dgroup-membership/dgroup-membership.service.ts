import { Injectable } from '@nestjs/common';
import { DGroupMembershipRepository } from './dgroup-membership.repository';
import type {
  DGroupMembershipItemDto,
  FilterDGroupMembershipDto,
} from './dgroup-membership.dto';

@Injectable()
export class DGroupMembershipService {
  constructor(
    private readonly dGroupMembershipRepository: DGroupMembershipRepository,
  ) {}

  createMany(memberships: DGroupMembershipItemDto[]) {
    return this.dGroupMembershipRepository.createMany(memberships);
  }

  findAll(filters: FilterDGroupMembershipDto) {
    return this.dGroupMembershipRepository.findAll(filters);
  }

  findById(id: number) {
    return this.dGroupMembershipRepository.findById(id);
  }

  remove(id: number) {
    return this.dGroupMembershipRepository.remove(id);
  }
}
