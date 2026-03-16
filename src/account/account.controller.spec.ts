import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

describe('AccountController', () => {
  let controller: AccountController;
  let accountService: {
    create: jest.Mock;
    findSorted: jest.Mock;
    findByName: jest.Mock;
    fetchDGroupLeaders: jest.Mock;
    findOne: jest.Mock;
    update: jest.Mock;
    remove: jest.Mock;
  };

  beforeEach(async () => {
    accountService = {
      create: jest.fn(),
      findSorted: jest.fn(),
      findByName: jest.fn(),
      fetchDGroupLeaders: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [{ provide: AccountService, useValue: accountService }],
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create should call service with dto', () => {
    const createAccountDto = {
      basicInfo: {
        firstName: 'John',
        lastName: 'Doe',
      },
    } as any;
    const expected = { id: 1 };
    accountService.create.mockReturnValue(expected);

    const result = controller.create(createAccountDto);

    expect(accountService.create).toHaveBeenCalledWith(createAccountDto);
    expect(result).toBe(expected);
  });

  it('findSorted should parse query params and call service', () => {
    const expected = [{ id: 1 }];
    accountService.findSorted.mockReturnValue(expected);

    const result = controller.findSorted('2', '20', 'desc', 'firstName', 'jo');

    expect(accountService.findSorted).toHaveBeenCalledWith(
      2,
      20,
      'desc',
      'firstName',
      'jo',
    );
    expect(result).toBe(expected);
  });

  it('findSorted should use defaults when params are omitted', () => {
    accountService.findSorted.mockReturnValue([]);

    controller.findSorted();

    expect(accountService.findSorted).toHaveBeenCalledWith(
      1,
      20,
      'asc',
      'lastName',
      undefined,
    );
  });

  it('findByName should call service', () => {
    const expected = [{ id: 1 }];
    accountService.findByName.mockReturnValue(expected);

    const result = controller.findByName('john');

    expect(accountService.findByName).toHaveBeenCalledWith(
      'john',
      undefined,
      undefined,
    );
    expect(result).toBe(expected);
  });

  it('fetchDGroupLeaders should call service with dto values', () => {
    const fetchDGroupLeadersDto = {
      exemptedAccountId: 10,
      gender: 'MALE',
    } as any;
    const expected = [{ id: 2 }];
    accountService.fetchDGroupLeaders.mockReturnValue(expected);

    const result = controller.fetchDGroupLeaders(fetchDGroupLeadersDto);

    expect(accountService.fetchDGroupLeaders).toHaveBeenCalledWith(10, 'MALE');
    expect(result).toBe(expected);
  });

  it('findOne should convert id to number and call service', () => {
    const expected = { id: 1 };
    accountService.findOne.mockReturnValue(expected);

    const result = controller.findOne('1');

    expect(accountService.findOne).toHaveBeenCalledWith(1);
    expect(result).toBe(expected);
  });

  it('update should convert id to number and call service', () => {
    const updateAccountDto = { firstName: 'Jane' } as any;
    const expected = { id: 1, firstName: 'Jane' };
    accountService.update.mockReturnValue(expected);

    const result = controller.update('1', updateAccountDto);

    expect(accountService.update).toHaveBeenCalledWith(1, updateAccountDto);
    expect(result).toBe(expected);
  });

  it('remove should convert id to number and call service', () => {
    const expected = { id: 1 };
    accountService.remove.mockReturnValue(expected);

    const result = controller.remove('1');

    expect(accountService.remove).toHaveBeenCalledWith(1);
    expect(result).toBe(expected);
  });
});
