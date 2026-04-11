import { Logger } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { AccountMapper } from './account.mapper';

describe('AccountRepository', () => {
  let repository: AccountRepository;
  let prisma: {
    $transaction: jest.Mock;
    account: {
      findMany: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(() => {
    prisma = {
      $transaction: jest.fn(),
      account: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    repository = new AccountRepository(prisma as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('createAccount', () => {
    it('should create account and related education and employment records', async () => {
      const createManyEducation = jest.fn();
      const createManyEmployment = jest.fn();
      const createdAccount = { id: 100, firstName: 'John' };
      const tx = {
        account: {
          create: jest.fn().mockResolvedValue(createdAccount),
        },
        education: {
          createMany: createManyEducation,
        },
        employment: {
          createMany: createManyEmployment,
        },
      };
      prisma.$transaction.mockImplementation(async (callback) => callback(tx));

      const dto = {
        basicInfo: {
          firstName: 'John',
          lastName: 'Doe',
        },
        education: [
          {
            schoolId: 1,
            startDate: new Date('2020-01-01T00:00:00.000Z'),
            educationLevel: 'College',
            course: 'BSCS',
          },
        ],
        employment: [
          {
            companyId: 2,
            position: 'Engineer',
            startDate: new Date('2024-01-01T00:00:00.000Z'),
          },
        ],
      } as any;

      const result = await repository.createAccount(dto);

      expect(prisma.$transaction).toHaveBeenCalledTimes(1);
      expect(tx.account.create).toHaveBeenCalledWith({
        data: dto.basicInfo,
      });
      expect(createManyEducation).toHaveBeenCalledWith({
        data: [
          {
            schoolId: 1,
            startDate: new Date('2020-01-01T00:00:00.000Z'),
            educationLevel: 'College',
            course: 'BSCS',
            accountId: 100,
          },
        ],
      });
      expect(createManyEmployment).toHaveBeenCalledWith({
        data: [
          {
            companyId: 2,
            position: 'Engineer',
            startDate: new Date('2024-01-01T00:00:00.000Z'),
            accountId: 100,
          },
        ],
      });
      expect(result).toEqual(createdAccount);
    });

    it('should throw and log when account create returns null', async () => {
      const loggerSpy = jest.spyOn(Logger, 'error').mockImplementation();
      const tx = {
        account: {
          create: jest.fn().mockResolvedValue(null),
        },
        education: {
          createMany: jest.fn(),
        },
        employment: {
          createMany: jest.fn(),
        },
      };
      prisma.$transaction.mockImplementation(async (callback) => callback(tx));

      const dto = {
        basicInfo: {
          firstName: 'John',
          lastName: 'Doe',
        },
      } as any;

      await expect(repository.createAccount(dto)).rejects.toThrow(
        'Account creation failed',
      );
      expect(loggerSpy).toHaveBeenCalledWith(
        'Error creating account:',
        expect.any(Error),
      );
    });
  });

  describe('findAccountsSorted', () => {
    it('should call findAccountsByName when name is provided', async () => {
      const expected = [{ id: 1 }];
      const byNameSpy = jest
        .spyOn(repository, 'findAccountsByName')
        .mockResolvedValue(expected as any);

      const result = await repository.findAccountsSorted(
        1,
        10,
        'asc',
        'lastName',
        'jo',
      );

      expect(byNameSpy).toHaveBeenCalledWith('jo', 0, 10);
      expect(result).toEqual(expected);
    });

    it('should query account.findMany and map results when name is not provided', async () => {
      const raw = [{ id: 1 }];
      const mapped = [{ id: 1, firstName: 'John' }];
      prisma.account.findMany.mockResolvedValue(raw);
      const mapperSpy = jest
        .spyOn(AccountMapper, 'toAccountDto')
        .mockReturnValue(mapped as any);

      const result = await repository.findAccountsSorted(
        2,
        25,
        'desc',
        'firstName',
      );

      expect(prisma.account.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 20,
          take: 21,
          orderBy: { firstName: 'desc' },
        }),
      );
      expect(mapperSpy).toHaveBeenCalledWith(raw);
      expect(result).toEqual(mapped);
    });
  });

  describe('findAccountById', () => {
    it('should query by id and map detail dto', async () => {
      const raw = { id: 10 };
      const mapped = { id: 10, firstName: 'John' };
      prisma.account.findUnique.mockResolvedValue(raw);
      const mapperSpy = jest
        .spyOn(AccountMapper, 'toAccountDetailDto')
        .mockReturnValue(mapped as any);

      const result = await repository.findAccountById(10);

      expect(prisma.account.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 10 } }),
      );
      expect(mapperSpy).toHaveBeenCalledWith(raw);
      expect(result).toEqual(mapped);
    });
  });

  describe('findAccountsByName', () => {
    it('should search by firstName or lastName and map results', async () => {
      const raw = [{ id: 1 }];
      const mapped = [{ id: 1, firstName: 'John' }];
      prisma.account.findMany.mockResolvedValue(raw);
      const mapperSpy = jest
        .spyOn(AccountMapper, 'toAccountDto')
        .mockReturnValue(mapped as any);

      const result = await repository.findAccountsByName('john');

      expect(prisma.account.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            OR: [
              { firstName: { contains: 'john', mode: 'insensitive' } },
              { lastName: { contains: 'john', mode: 'insensitive' } },
            ],
          },
        }),
      );
      expect(mapperSpy).toHaveBeenCalledWith(raw);
      expect(result).toEqual(mapped);
    });
  });

  describe('updateAccount', () => {
    it('should call prisma.account.update with id and data', async () => {
      const updated = { id: 10, firstName: 'Jane' };
      prisma.account.update.mockResolvedValue(updated);
      const dto = { firstName: 'Jane' } as any;

      const result = await repository.updateAccount(10, dto);

      expect(prisma.account.update).toHaveBeenCalledWith({
        where: { id: 10 },
        data: dto,
      });
      expect(result).toEqual(updated);
    });
  });

  describe('removeAccount', () => {
    it('should call prisma.account.delete with id', async () => {
      const deleted = { id: 10 };
      prisma.account.delete.mockResolvedValue(deleted);

      const result = await repository.removeAccount(10);

      expect(prisma.account.delete).toHaveBeenCalledWith({
        where: { id: 10 },
      });
      expect(result).toEqual(deleted);
    });
  });

  describe('fetchDGroupLeaders', () => {
    it('should query leaders by gender and exclude account id', async () => {
      const leaders = [{ id: 2, gender: 'MALE' }];
      prisma.account.findMany.mockResolvedValue(leaders);

      const result = await repository.fetchDGroupLeaders(10, 'MALE' as any);

      expect(prisma.account.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            gender: 'MALE',
            id: {
              not: 10,
            },
          },
        }),
      );
      expect(result).toEqual(leaders);
    });
  });
});
