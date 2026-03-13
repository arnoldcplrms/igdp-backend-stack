import { Injectable } from '@nestjs/common';
import {
  CreateAccountMinistryDto,
  FilterAccountMinistryDto,
  UpdateAccountMinistryDto,
} from './account-ministry.dto';
import { AccountMinistryRepository } from './account-ministry.repository';

@Injectable()
export class AccountMinistryService {
  constructor(
    private readonly accountMinistryRepository: AccountMinistryRepository,
  ) {}

  create(createAccountMinistryDto: CreateAccountMinistryDto) {
    return this.accountMinistryRepository.create(createAccountMinistryDto);
  }

  findAll(filters: FilterAccountMinistryDto) {
    return this.accountMinistryRepository.findAll(filters);
  }

  findByAccountId(accountId: number) {
    return this.accountMinistryRepository.findByAccountId(accountId);
  }

  findById(id: number) {
    return this.accountMinistryRepository.findById(id);
  }

  update(id: number, updateAccountMinistryDto: UpdateAccountMinistryDto) {
    return this.accountMinistryRepository.update(id, updateAccountMinistryDto);
  }

  remove(id: number) {
    return this.accountMinistryRepository.remove(id);
  }
}
