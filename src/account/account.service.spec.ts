import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { AccountRepository } from './account.repository';

describe('AccountService', () => {
  let service: AccountService;
  let accountRepository: {
    createAccount: jest.Mock;
    findAccountsSorted: jest.Mock;
    findAccountsByName: jest.Mock;
    findAccountById: jest.Mock;
    updateAccount: jest.Mock;
    removeAccount: jest.Mock;
    fetchDGroupLeaders: jest.Mock;
  };

  beforeEach(async () => {
    accountRepository = {
      createAccount: jest.fn(),
      findAccountsSorted: jest.fn(),
      findAccountsByName: jest.fn(),
      findAccountById: jest.fn(),
      updateAccount: jest.fn(),
      removeAccount: jest.fn(),
      fetchDGroupLeaders: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        { provide: AccountRepository, useValue: accountRepository },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should delegate to repository', () => {
    const createAccountDto = {
      basicInfo: {
        firstName: 'John',
        lastName: 'Doe',
      },
    } as any;
    const expected = Promise.resolve({ id: 1 });

    accountRepository.createAccount.mockReturnValue(expected);

    const result = service.create(createAccountDto);

    expect(accountRepository.createAccount).toHaveBeenCalledWith(
      createAccountDto,
    );
    expect(result).toBe(expected);
  });

  it('findSorted should delegate all arguments to repository', () => {
    const expected = Promise.resolve([]);
    accountRepository.findAccountsSorted.mockReturnValue(expected);

    const result = service.findSorted(2, 25, 'desc', 'firstName', 'john');

    expect(accountRepository.findAccountsSorted).toHaveBeenCalledWith(
      2,
      25,
      'desc',
      'firstName',
      'john',
    );
    expect(result).toBe(expected);
  });

  it('findByName should delegate to repository', () => {
    const expected = Promise.resolve([{ id: 1 }]);
    accountRepository.findAccountsByName.mockReturnValue(expected);

    const result = service.findByName('john');

    expect(accountRepository.findAccountsByName).toHaveBeenCalledWith('john');
    expect(result).toBe(expected);
  });

  it('findOne should delegate to repository', () => {
    const expected = Promise.resolve({ id: 1 });
    accountRepository.findAccountById.mockReturnValue(expected);

    const result = service.findOne(1);

    expect(accountRepository.findAccountById).toHaveBeenCalledWith(1);
    expect(result).toBe(expected);
  });

  it('update should delegate to repository', () => {
    const updateAccountDto = { firstName: 'Jane' } as any;
    const expected = Promise.resolve({ id: 1, firstName: 'Jane' });
    accountRepository.updateAccount.mockReturnValue(expected);

    const result = service.update(1, updateAccountDto);

    expect(accountRepository.updateAccount).toHaveBeenCalledWith(
      1,
      updateAccountDto,
    );
    expect(result).toBe(expected);
  });

  it('remove should delegate to repository', () => {
    const expected = Promise.resolve({ id: 1 });
    accountRepository.removeAccount.mockReturnValue(expected);

    const result = service.remove(1);

    expect(accountRepository.removeAccount).toHaveBeenCalledWith(1);
    expect(result).toBe(expected);
  });

  it('fetchDGroupLeaders should delegate to repository with casted gender', () => {
    const expected = Promise.resolve([{ id: 2 }]);
    accountRepository.fetchDGroupLeaders.mockReturnValue(expected);

    const result = service.fetchDGroupLeaders(10, 'MALE');

    expect(accountRepository.fetchDGroupLeaders).toHaveBeenCalledWith(
      10,
      'MALE',
    );
    expect(result).toBe(expected);
  });
});
