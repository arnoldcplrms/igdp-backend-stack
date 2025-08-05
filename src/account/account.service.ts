import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { CreateAccountDto, UpdateAccountDto } from './account.dto';

@Injectable()
export class AccountService {
  constructor(private accountRepo: AccountRepository) {}

  create(createAccountDto: CreateAccountDto) {
    return this.accountRepo.createAccount(createAccountDto);
  }

  findAll(
    page: number = 1,
    pageSize: number = 10,
    sort: 'asc' | 'desc' = 'asc',
  ) {
    return this.accountRepo.findManyAccounts(page, pageSize, sort);
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
}
