import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { CreateAccountDto, UpdateAccountDto } from './account.dto';
import { Gender } from '@prisma/client';
import { PAGE_SIZE_COUNT } from 'src/common/constants';

@Injectable()
export class AccountService {
  constructor(private accountRepo: AccountRepository) {}

  create(createAccountDto: CreateAccountDto) {
    return this.accountRepo.createAccount(createAccountDto);
  }

  findSorted(
    page: number = 1,
    pageSize: number = PAGE_SIZE_COUNT,
    sort: 'asc' | 'desc' = 'asc',
    sortBy: string = 'lastName',
    name?: string,
  ) {
    return this.accountRepo.findAccountsSorted(
      page,
      pageSize,
      sort,
      sortBy,
      name,
    );
  }

  findByName(name: string) {
    return this.accountRepo.findAccountsByName(name);
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
