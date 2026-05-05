import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import {
  CreateAccountDto,
  FetchDGroupLeadersDto,
  FilterAccountDto,
  UpdateAccountDto,
} from './account.dto';

@Injectable()
export class AccountService {
  constructor(private accountRepo: AccountRepository) {}

  create(createAccountDto: CreateAccountDto) {
    return this.accountRepo.createAccount(createAccountDto);
  }

  async findSorted(filters: FilterAccountDto) {
    return this.accountRepo.findAccountsSorted(filters);
  }

  findOne(id: number) {
    return this.accountRepo.findAccountById(id);
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.accountRepo.updateAccount(id, updateAccountDto);
  }

  remove(id: number) {
    return this.accountRepo.removeAccount(id);
  }

  fetchDGroupLeaders(dto: FetchDGroupLeadersDto, skip?: number, take?: number) {
    return this.accountRepo.fetchDGroupLeaders(dto, skip, take);
  }
}
