import { Test, TestingModule } from '@nestjs/testing';
import { CompanyRepository } from './company.repository';

describe('CompanyRepositoryService', () => {
  let service: CompanyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyRepository],
    }).compile();

    service = module.get<CompanyRepository>(CompanyRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
