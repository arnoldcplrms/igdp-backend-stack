import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import {
  CreateAccountDto,
  FilterAccountDto,
  UpdateAccountDto,
} from './account.dto';
import { Gender } from '@prisma/client';

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

  fetchDGroupLeaders(exemptedAccountId: number, gender: string) {
    return this.accountRepo.fetchDGroupLeaders(
      exemptedAccountId,
      gender as Gender,
    );
  }
}
