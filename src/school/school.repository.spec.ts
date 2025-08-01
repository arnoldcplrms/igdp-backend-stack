import { Test, TestingModule } from '@nestjs/testing';
import { SchoolRepository } from './school.repository';

describe('SchoolRepositoryService', () => {
  let service: SchoolRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolRepository],
    }).compile();

    service = module.get<SchoolRepository>(SchoolRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
