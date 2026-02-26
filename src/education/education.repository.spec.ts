import { EducationRespository } from './education.repository';

describe('EducationRespository', () => {
  let repository: EducationRespository;

  beforeEach(() => {
    const prismaService = {
      /* mock PrismaService methods if needed */
    };
    repository = new EducationRespository(prismaService as any);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  // Add more tests for specific methods in EducationRespository if they exist
});
